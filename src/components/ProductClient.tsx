"use client";

import ProductImage from "./product/ProductImage";
import ProductInfo from "./product/ProductInfo";
import ProductMeta from "./product/ProductMeta";

export default function ProductClient({
  initialProduct,
}: {
  initialProduct: ProductType;
}) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <ProductImage product={initialProduct} />
          <ProductInfo product={initialProduct} />
        </div>

        <ProductMeta product={initialProduct} />
      </div>
    </div>
  );
}
