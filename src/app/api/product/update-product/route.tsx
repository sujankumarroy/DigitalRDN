import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const db = await connectDb();
    const { id, key, name, price, type, unit, stock_quantity, min_stock } =
      await req.json();

    if (key !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: "Wrong Key" }, { status: 401 });
    }

    if (!name || !price || !unit || !type)
      return NextResponse.json({
        error: { message: "missing name, price, type or unit." },
      });

    let product: ProductType = {
      name,
      price,
      type,
      unit,
      stock_quantity,
      min_stock,
    };

    let error;
    if (id) {
      ({ error } = await db.from("products").update(product).eq("id", id));
    } else {
      const { data, error: insertError } = await db
        .from("products")
        .insert(product)
        .select()
        .single();
      product = data;
      error = insertError;
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
