import connectDb from "@/lib/db";
import getId from "@/utils/getId";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    const id = getId(name);

    if (!name || !email || !password || !id)
      return NextResponse.json(
        { error: { message: "name, email and password are required" } },
        { status: 401 },
      );

    if (password.length < 6) {
      return NextResponse.json(
        { error: { message: "password must be at least 6 characters!" } },
        { status: 400 },
      );
    }

    const db = await connectDb();

    const { data: existUser } = await db
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existUser) {
      return NextResponse.json(
        { error: { message: "user already exists" } },
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
      return NextResponse.json({ error }, { status: 501 });
    }

    const jwtSecret = process.env.JWT_SECRET as string;
    const jwtToken = jwt.sign({ user_id: user.id }, jwtSecret, {
      expiresIn: "30d",
    });

    const response = NextResponse.json({ user }, { status: 201 });
    response.cookies.set("token", jwtToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 15,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
