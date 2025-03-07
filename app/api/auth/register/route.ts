import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    await connectDB();

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "El usuario ya existe" },
        { status: 400 }
      );
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "Usuario creado exitosamente",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en el registro:", error);
    return NextResponse.json(
      { message: "Error al crear el usuario" },
      { status: 500 }
    );
  }
} 