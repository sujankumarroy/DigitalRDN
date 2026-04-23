"use client";

import React, { useState } from "react";

function Product({ params }: { params: product }) {
  const [qty, setQty] = useState(1);
  const root_path =
    "https://kcksejyyjfgpcdmgtzrc.supabase.co/storage/v1/object/public/product_images/";
  const { name, price, unit, stock_quantity, type, isAdded, file_name } =
    params;
  return (
    <div className="border border-[#ccc] p-4 my-4 bg-white rounded-lg flex items-center gap-5">
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
        <input
          name="quantity"
          type={type}
          min="1"
          value={qty}
          className="border rounded-sm mt-1.5 w-12.5 px-1"
          onChange={(e) => setQty(Number(e.target.value))}
        />
      </div>
      <button
        className={`px-3 py-2 bg-[#1b4332] text-white border-0 rounded-[5px] cursor-pointer ${isAdded ? "bg-red-600" : "bg-green-600"}`}
        data-name={name}
        data-price={price}
        data-type={type}
      >
        {isAdded ? "Remove" : "Add"}
      </button>
    </div>
  );
}

export default Product;
