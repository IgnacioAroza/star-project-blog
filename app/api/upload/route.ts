import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/auth.config';
import cloudinary from '@/lib/cloudinary';

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
}

export async function POST(req: Request) {
  try {
    // Verificar si el usuario está autenticado
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: 'No autorizado' },
        { status: 401 }
      );
    }

    // Obtener los datos del formulario
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { message: 'No se ha proporcionado ningún archivo' },
        { status: 400 }
      );
    }

    // Convertir el archivo a base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

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

    // Devolver la URL segura de la imagen
    return NextResponse.json({ 
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    return NextResponse.json(
      { message: 'Error al subir la imagen' },
      { status: 500 }
    );
  }
} 