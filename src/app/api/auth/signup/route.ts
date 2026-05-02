import connectDb from "@/lib/db";
import getId from "@/utils/getId";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    const id = getId(name);

    if (!name || !email || !password || !id)
      return NextResponse.json(
        { error: "name, email and password are required" },
        { status: 401 },
      );

    const db = await connectDb();

    const { data: existUser } = await db
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existUser) {
      return NextResponse.json(
        { message: "user already exists" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "password must be at least 6 characters!" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: user, error } = await db
      .from("users")
      .insert({
        id,
        name,
        email,
        password: hashedPassword,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 501 });
    }

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `register error ${error}` },
      { status: 500 },
    );
  }
}
