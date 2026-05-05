export default function ProductMeta({ product }: { product: ProductType }) {
  function formatDate(date: string) {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  }

  return (
    <div className="border-t pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
      <div className="bg-gray-50 p-4 rounded-lg border">
        <p className="text-gray-500">Stock</p>
        <p className="font-semibold text-gray-800">{product.stock_quantity}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border">
        <p className="text-gray-500">Min Stock</p>
        <p className="font-semibold text-gray-800">{product.min_stock}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border col-span-2">
        <p className="text-gray-500">Created</p>
        <p className="font-medium text-gray-800">
          {formatDate(product.created_at!)}
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border col-span-2">
        <p className="text-gray-500">Updated</p>
        <p className="font-medium text-gray-800">
          {formatDate(product.updated_at!)}
        </p>
      </div>
    </div>
  );
}
