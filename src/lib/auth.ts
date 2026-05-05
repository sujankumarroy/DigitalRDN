import jwt, { JwtPayload } from "jsonwebtoken";
import connectDb from "./db";

function verifyJwt(token: string | undefined | null) {
  if (!token) return null;
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error("jwt not found");
  try {
    return jwt.verify(token, jwtSecret) as JwtPayload & {
      user_id: string;
    };
  } catch {
    return null;
  }
}

async function verifyUser(token: string | undefined | null) {
  const payload = verifyJwt(token);
  if (!payload) return null;
  const db = await connectDb();
  const { data, error } = await db
    .from("users")
    .select("is_active")
    .eq("id", payload.user_id)
    .maybeSingle();
  if (error) return null;
  if (!data) return null;
  if (!data.is_active) return null;
  return payload;
}

async function verifyAdmin(token: string | undefined | null) {
  const payload = verifyJwt(token);
  if (!payload) return null;
  const db = await connectDb();
  const { data, error } = await db
    .from("users")
    .select("role")
    .eq("id", payload.user_id)
    .maybeSingle();
  if (error) return null;
  if (!data) return null;
  if (data.role !== "admin") return null;
  return payload;
}

export { verifyJwt, verifyUser, verifyAdmin };
