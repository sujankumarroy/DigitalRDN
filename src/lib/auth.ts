import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import connectDb from "./db";

function verifyJwt(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
      user_id: string;
      role?: string;
    };
  } catch {
    return null;
  }
}

async function verifyUser(req: NextRequest) {
  const user = verifyJwt(req);
  if (!user) return null;
  const db = await connectDb();
  const { data, error } = await db
    .from("users")
    .select("id")
    .eq("id", user.user_id)
    .maybeSingle();
  if (error) return null;
  if (!data) return null;
  return user;
}

async function verifyAdmin(req: NextRequest) {
  const user = verifyJwt(req);
  if (!user) return null;
  const db = await connectDb();
  const { data, error } = await db
    .from("users")
    .select("role")
    .eq("id", user.user_id)
    .maybeSingle();
  if (error) return null;
  if (!data) return null;
  if (data.role !== "admin") return null;
  return user;
}

export { verifyJwt, verifyUser, verifyAdmin };
