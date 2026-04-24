"use client";

import { addToCart, removeFromCart, updateCart } from "@/utils/Cart";
import React, { useState } from "react";

interface props {
  setCart: SetCartType;
  params: ProductType;
  isAdded: boolean;
}

function Product({ setCart, params, isAdded }: props) {
  const root_path =
    "https://kcksejyyjfgpcdmgtzrc.supabase.co/storage/v1/object/public/product_images/";
  const { id, name, price, unit, stock_quantity, type, file_name } = params;

  const [qty, setQty] = useState(1);
  const [btnContent, setBtncontent] = useState("Add");
  const [btnColor, setBtnColor] = useState("bg-green-600");

  function updateQuantity(qy: number) {
    setQty(qy);
    const cart = updateCart({ id, name, price, quantity: qy });
    setCart(cart);
  }

  function toggleCart(e: React.MouseEvent<HTMLButtonElement>) {
    const { id, name, price, quantity } = e.currentTarget?.dataset;
    if (e.currentTarget.innerText === "Add") {
      const cart = addToCart({
        id: Number(id),
        name: name || "",
        price: Number(price) || 0,
        quantity: Number(quantity) || 1,
      });
      setCart(cart);
      setBtncontent("Remove");
      setBtnColor("bg-red-600");
    } else {
      const cart = removeFromCart(Number(id));
      setCart(cart);
      setBtncontent("Add");
      setBtnColor("bg-green-600");
    }
  }

  return (
    <div
      data-id={id}
      data-name={name}
      data-price={price}
      data-type={type}
      data-quantity={qty}
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
        <input
          name="quantity"
          type={type}
          min="1"
          value={qty}
          className="border rounded-sm mt-1.5 w-12.5 px-1"
          onChange={(e) => updateQuantity(Number(e.currentTarget.value))}
        />
      </div>
      <button
        className={`px-3 py-2 bg-[#1b4332] text-white border-0 rounded-[5px] cursor-pointer ${btnColor}`}
        data-id={id}
        data-name={name}
        data-price={price}
        data-type={type}
        data-quantity={qty}
        onClick={(e) => toggleCart(e)}
      >
        {btnContent}
      </button>
    </div>
  );
}

export default Product;
