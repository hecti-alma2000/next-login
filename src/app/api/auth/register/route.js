import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/libs/db";

export async function POST(request) {
  try {
    const data = await request.json();

    // Validaciones
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === data.email) {
        return NextResponse.json(
          { message: "El email ya existe" },
          { status: 400 }
        );
      } else if (existingUser.username === data.username) {
        return NextResponse.json(
          { message: "El usuario ya existe" },
          { status: 400 }
        );
      }
    }

    // Crear nuevo usuario
    const hashedPasswod = (data.password = await bcrypt.hash(
      data.password,
      10
    ));
    const newUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPasswod,
      },
    });
    const { password: _, ...user } = newUser; // haciendo que user tenga todos los campos menos el password
    return NextResponse.json(user); //devolver los campo execto el password
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
