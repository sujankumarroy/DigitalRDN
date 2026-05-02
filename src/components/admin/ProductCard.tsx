"use client";

interface props {
  params: ProductType;
}

function ProductCard({ params }: props) {
  const root_path =
    "https://kcksejyyjfgpcdmgtzrc.supabase.co/storage/v1/object/public/product_images/";
  const { id, name, price, unit, stock_quantity, type, file_name } = params;

  return (
    <div
      data-id={id}
      data-name={name}
      data-price={price}
      data-type={type}
      className="border border-[#ccc] p-4 my-4 bg-white rounded-lg flex items-center gap-5"
    >
      <img
        className="w-22 aspect-3/4 object-contain rounded-[5px]"
        src={root_path + file_name}
        alt={name}
      />
      <div className="grow">
        <p className="text-2xl font-bold">{name}</p>
        <p>
          Price: ₹{price}/{unit}
        </p>
        <p>
          {stock_quantity} {unit}s are available.
        </p>
      </div>
      <button
        className={`px-3 py-2 text-white border-0 rounded-[5px] cursor-pointer bg-amber-400`}
      >
        Update
      </button>
      <button
        className={`px-3 py-2 text-white border-0 rounded-[5px] cursor-pointer bg-red-400`}
      >
        Delete
      </button>
    </div>
  );
}

export default ProductCard;
