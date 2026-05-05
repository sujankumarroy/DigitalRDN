import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyAdmin } from "@/lib/auth";

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
    const admin = await verifyAdmin(token);

    if (!admin) {
      return NextResponse.json(
        { error: { message: "not authorized" } },
        { status: 403 },
      );
    }

    const db = await connectDb();

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
    const admin = await verifyAdmin(token);

    if (!admin) {
      return NextResponse.json(
        { error: { message: "not authorized" } },
        { status: 403 },
      );
    }

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
