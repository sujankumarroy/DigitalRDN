"use client";

function ProductCard({
  setProductFormAction,
  product,
  setProductFormVisibility,
  setProductFormData,
}: {
  setProductFormAction: (action: "Add" | "Update") => void;
  product: ProductType;
  setProductFormVisibility: (visibility: "hidden" | "") => void;
  setProductFormData: (data: ProductType) => void;
}) {
  const root_path =
    "https://kcksejyyjfgpcdmgtzrc.supabase.co/storage/v1/object/public/product_images/";
  const { id, name, price, unit, stock_quantity, type, file_name } = product;

  return (
    <div
      data-product={JSON.stringify(product)}
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
      <div className="flex flex-col justify-center items-center">
        <button
          className={`px-3 py-2 my-2 w-20 text-white border-0 rounded-[5px] cursor-pointer bg-amber-400`}
          onClick={(e) => {
            const product = JSON.parse(
              e.currentTarget.parentElement?.parentElement?.dataset.product ||
                "{}",
            ) as ProductType;
            setProductFormAction("Update");
            setProductFormData(product);
            setProductFormVisibility("");
          }}
        >
          Update
        </button>
        <button
          className={`px-3 py-2 my-2 w-20 text-white border-0 rounded-[5px] cursor-pointer bg-red-400`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
