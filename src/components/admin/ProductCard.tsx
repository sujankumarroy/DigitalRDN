"use client";

import { useEffect, useState } from "react";

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

  const [activeStatus, setActiveStatus] = useState<
    "Delete" | "Deleting.." | "Deleted" | "Restore" | "Restoring.." | "Restored"
  >("Delete");

  async function updateActiveState(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    const dataset = e.currentTarget.parentElement?.parentElement?.dataset;
    if (!dataset) {
      console.log("dataset not found");
      return;
    }
    const product = JSON.parse(dataset?.product || "{}") as ProductType;
    const { id, is_active } = product;
    setActiveStatus(is_active ? "Deleting.." : "Restoring..");
    const res = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !is_active }),
    });
    const { error } = await res.json();
    if (error) {
      console.error(error);
      alert(error.message);
      setActiveStatus(is_active ? "Delete" : "Restore");
    }
    dataset.product = JSON.stringify({ ...product, is_active: !is_active });
    setActiveStatus(is_active ? "Deleted" : "Restored");
    console.log("deleted");
  }

  useEffect(() => {
    setActiveStatus(product.is_active ? "Delete" : "Restore");
  }, []);

  useEffect(() => {
    if (activeStatus === "Deleted")
      setTimeout(() => setActiveStatus("Restore"), 5000);
    if (activeStatus === "Restored")
      setTimeout(() => setActiveStatus("Delete"), 5000);
  }, [activeStatus]);

  return (
    <div
      data-product={JSON.stringify(product)}
      className={`${activeStatus === "Deleted" || activeStatus === "Restoring.." || activeStatus === "Restore" ? "opacity-50" : ""} border border-[#ccc] p-4 my-4 bg-white rounded-lg flex items-center gap-5`}
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
          className={`px-3 py-2 my-2 w-20 text-white border-0 rounded-[5px] cursor-pointer bg-amber-400 hover:bg-amber-600`}
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
          onClick={updateActiveState}
          className={`px-3 py-2 my-2 w-20 text-white border-0 rounded-[5px] cursor-pointer bg-red-400 hover:bg-red-500`}
        >
          {activeStatus}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
