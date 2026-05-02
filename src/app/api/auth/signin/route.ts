import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json(
        { error: "email and password are required" },
        { status: 401 },
      );

    const db = await connectDb();

    const { data, error } = await db
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password);

    if (error) return NextResponse.json(error, { status: 500 });

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    return NextResponse.json(data[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
