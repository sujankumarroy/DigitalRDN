import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: { message: "Email and password required" } },
        { status: 400 },
      );
    }

    const db = await connectDb();

    const { data: user, error } = await db
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: { message: "Invalid credentials" } },
        { status: 401 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    delete user.password;

    if (!isMatch) {
      return NextResponse.json(
        { error: { message: "Invalid credentials" } },
        { status: 401 },
      );
    }

    const jwtSecret = process.env.JWT_SECRET as string;
    const jwtToken = jwt.sign({ user_id: user.id }, jwtSecret, {
      expiresIn: "30d",
    });

    const response = NextResponse.json({ user }, { status: 200 });
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
