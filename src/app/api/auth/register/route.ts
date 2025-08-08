import { prisma } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("Registration attempt started");
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      console.log("Missing required fields:", { name: !!name, email: !!email, password: !!password });
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Checking for existing user:", email);
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log("User already exists:", email);
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    console.log("Hashing password for:", email);
    // Hash password
    const hashedPassword = await hash(password, 12);

    console.log("Creating user:", email);
    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    console.log("User created successfully:", user.id);
    return NextResponse.json(
      { message: "User created successfully", user: { id: user.id, name: user.name, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: process.env.NODE_ENV === 'development' ? error : undefined },
      { status: 500 }
    );
  }
}
