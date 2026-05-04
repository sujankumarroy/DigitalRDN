export default function ProductImage({ product }: { product: ProductType }) {
  const root_path =
    "https://kcksejyyjfgpcdmgtzrc.supabase.co/storage/v1/object/public/product_images/";

  return (
    <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6 border">
      <img
        src={root_path + product.file_name}
        alt={product.name}
        className="w-64 h-64 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}
