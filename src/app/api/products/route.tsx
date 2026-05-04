import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: NextRequest) {
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
      .single();

    if (err) return NextResponse.json({ error: err }, { status: 500 });
    if (Object.keys(user).length === 0) return NextResponse.json({});
    if (user.role !== "admin")
      return NextResponse.json({
        error: { message: "not allowed to update product" },
      });

    const {
      id,
      key,
      name,
      price,
      type,
      unit,
      stock_quantity,
      min_stock,
      is_active,
    } = await req.json();

    if (key !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: { message: "Wrong Key" } },
        { status: 401 },
      );
    }

    if ((is_active === true || is_active === false) && id) {
      const { error, data } = await db
        .from("products")
        .update({ is_active })
        .eq("id", id);

      if (error) return NextResponse.json({ error }, { status: 500 });
      return NextResponse.json({}, { status: 200 });
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
      return NextResponse.json({ error }, { status: 502 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
