import { NextResponse } from "next/server";
import { signIn } from "next-auth/react";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return NextResponse.json(
        { message: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: "Inicio de sesión exitoso" }, { status: 200 });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return NextResponse.json(
      { message: "Error en el inicio de sesión" },
      { status: 500 }
    );
  }
}

