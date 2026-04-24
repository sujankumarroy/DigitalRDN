"use client";
import React from "react";

export default function BuyList({ cart }: { cart: cartItemType[] }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-green-50 p-4 rounded-xl mt-5 shadow-md">
      <h2 className="text-xl font-bold mb-3">🛒 Your Buy List</h2>

      {cart.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li key={index}>
                {item.name}: ₹{item.price} × {item.quantity} = ₹
                {item.price * item.quantity}
              </li>
            ))}
          </ul>

          <p className="font-bold mt-3">Total: ₹{total}</p>
        </>
      )}
    </div>
  );
}
