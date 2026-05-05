"use client";

import { addToCart, findFromCart, removeFromCart } from "@/utils/Cart";
import { useEffect, useState } from "react";

export default function AddToCart({ product }: { product: ProductType }) {
  const [cartBtnState, setCartBtnState] = useState<
    "Add To Cart" | "Remove From Cart" | "Notify Me" | "Notified"
  >("Add To Cart");
  const [quantity, setQuantity] = useState<number>(1);

  const { id, name, price } = product;
  const cartItem: cartItemType = { id: id!, name, price, quantity };

  useEffect(() => {
    if (findFromCart(cartItem) >= 0) setCartBtnState("Remove From Cart");
    if (product.stock_quantity! <= 0.5) setCartBtnState("Notify Me");
  }, []);

  return (
    <div className="space-y-4">
      <button
        onClick={() => {
          if (cartBtnState === "Add To Cart") {
            addToCart(cartItem);
            setCartBtnState("Remove From Cart");
          } else if (cartBtnState === "Remove From Cart") {
            removeFromCart(id!);
            setCartBtnState("Add To Cart");
          } else if (cartBtnState === "Notify Me") {
            if (
              prompt("Notify owner and get notification for product in stock")
            ) {
              setCartBtnState("Notified");
            }
          }
        }}
        className="h-10 w-full bg-amber-400 hover:bg-amber-600 rounded-lg"
      >
        {cartBtnState}
      </button>
    </div>
  );
}
