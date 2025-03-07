import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { authOptions } from "../auth/[...nextauth]/route";

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

    const { title, description, image } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { message: "Título y descripción son requeridos" },
        { status: 400 }
      );
    }

    await connectDB();

    const blog = await Blog.create({
      title,
      description,
      image,
      author: session.user.id
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error al crear blog:", error);
    return NextResponse.json(
      { message: "Error al crear el blog" },
      { status: 500 }
    );
  }
} 