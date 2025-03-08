import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { authOptions } from "../auth/auth.config";
import cloudinary from '@/lib/cloudinary';

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
}

interface BlogData {
  title: string;
  description: string;
  image?: string;
  author: string;
}

// GET - Obtener todos los blogs
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().populate('author', 'name email').sort({ createdAt: -1 });
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error al obtener blogs:", error);
    return NextResponse.json(
      { message: "Error al obtener los blogs" },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo blog
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }

    // Ahora procesamos los datos del formulario
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;

    if (!title || !description) {
      return NextResponse.json(
        { message: "Título y descripción son requeridos" },
        { status: 400 }
      );
    }

    await connectDB();

    // Inicializamos blogData con campos obligatorios
    const blogData: BlogData = {
      title,
      description,
      author: session.user.id,
    };

    // Si hay un archivo de imagen, lo subimos a Cloudinary
    if (imageFile) {
      try {
        // Convertir el archivo a base64
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64String = `data:${imageFile.type};base64,${buffer.toString('base64')}`;

        // Subir a Cloudinary
        const result = await new Promise<CloudinaryResponse>((resolve, reject) => {
          cloudinary.uploader.upload(
            base64String,
            {
              folder: 'star-project-blog',
              resource_type: 'auto',
            },
            (error, result) => {
              if (error) {
                console.error("Error al subir a Cloudinary:", error);
                reject(error);
              } else {
                resolve(result as CloudinaryResponse);
              }
            }
          );
        });

        // Agregar la URL de la imagen al objeto del blog
        blogData.image = result.secure_url;
      } catch (error) {
        console.error("Error al procesar imagen:", error);
        return NextResponse.json(
          { message: "Error al procesar la imagen" },
          { status: 500 }
        );
      }
    }

    // Crear el blog con o sin imagen
    const blog = await Blog.create(blogData);

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error al crear blog:", error);
    return NextResponse.json(
      { message: "Error al crear el blog" },
      { status: 500 }
    );
  }
} 