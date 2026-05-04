import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: { message: "missing path param (id)" } },
        { status: 400 },
      );
    }

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: { message: "jwt not found" } },
        { status: 401 },
      );
    }
    const jwtSecret = process.env.JWT_SECRET as string;
    const payload = jwt.verify(token, jwtSecret);

    const db = await connectDb();
    const { error, data: product } = await db
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    if (!product) {
      return NextResponse.json(
        { error: { message: "product not found" } },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token)
      return NextResponse.json(
        { error: { message: "jwt not found" } },
        { status: 500 },
      );

    const jwtSecret = process.env.JWT_SECRET as string;
    const payload = jwt.verify(token, jwtSecret) as JwtPayload & {
      user_id: string;
    };

    const db = await connectDb();
    const { data: user, error: err } = await db
      .from("users")
      .select("*")
      .eq("id", payload.user_id)
      .maybeSingle();

    if (err) return NextResponse.json({ error: err }, { status: 500 });
    if (!user) {
      return NextResponse.json(
        { error: { message: "unauthorized user" } },
        { status: 400 },
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { error: { message: "not allowed to update product" } },
        { status: 403 },
      );
    }

    const { id } = await context.params;
    const { name, price, type, unit, stock_quantity, min_stock } =
      await req.json();

    if (!name || !price || !unit || !type) {
      return NextResponse.json(
        { error: { message: "missing name, price, type or unit." } },
        { status: 400 },
      );
    }

    let product: ProductType = {
      name,
      price,
      type,
      unit,
      stock_quantity,
      min_stock,
    };

    const { data, error } = await db
      .from("products")
      .update(product)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error }, { status: 502 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const { is_active } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: { message: "missing path param (id)" } },
        { status: 400 },
      );
    }

    if (typeof is_active !== "boolean") {
      return Response.json(
        { error: { message: "is_active must be boolean" } },
        { status: 401 },
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
