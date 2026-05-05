import ProductClient from "@/components/ProductClient";
import connectDb from "@/lib/db";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const db = await connectDb();

  const { data: product, error } = await db
    .from("products")
    .select("*")
    .eq("id", Number(id))
    .maybeSingle();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductClient initialProduct={product} />;
}
