import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, verifyJwt } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const db = await connectDb();
    let query = db.from("products").select("*");

    const token = req.cookies.get("token")?.value;
    const payload = verifyJwt(token);
    if (!payload) {
      query = query.eq("is_active", true);
    }

    const { data: products, error: err } = await query;

    if (err) return NextResponse.json({ error: err }, { status: 500 });
    if (products.length === 0) {
      return NextResponse.json(
        { error: { message: "products are not available" } },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, price, type, unit, stock_quantity, min_stock } =
      await req.json();

    if (!name || !price || !unit || !type) {
      return NextResponse.json(
        { error: { message: "missing name, price, type or unit." } },
        { status: 400 },
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

    let product: ProductType = {
      name,
      price,
      type,
      unit,
      stock_quantity,
      min_stock,
    };

    const db = await connectDb();
    const { data, error } = await db
      .from("products")
      .insert(product)
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
