export default function ProductInfo({ product }: { product: ProductType }) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

      <p className="text-2xl font-semibold text-blue-600">
        ₹{product.price}
        <span className="text-base text-gray-500 font-normal">
          {" "}
          / {product.unit}
        </span>
      </p>

      <div className="flex items-center gap-3">
        <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-600">
          {product.type}
        </span>

        <span
          className={`text-sm px-3 py-1 rounded-full ${
            product.is_active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.is_active ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
}
