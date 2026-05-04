import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const { is_active } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: { message: "missing query param (id)" } },
        { status: 402 },
      );
    }

    if (typeof is_active !== "boolean") {
      return Response.json(
        { error: { message: "is_active must be boolean" } },
        { status: 400 },
      );
    }

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: { message: "jwt not found" } },
        { status: 500 },
      );
    }
    const jwtSecret = process.env.JWT_SECRET as string;
    const payload = jwt.verify(token, jwtSecret);

    const db = await connectDb();
    const { error, data } = await db
      .from("products")
      .update({ is_active })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
