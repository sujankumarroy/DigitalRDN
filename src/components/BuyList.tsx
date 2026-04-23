"use client";
import React, { useEffect, useState } from "react";

interface Item {
  name: string;
  price: number;
  quantity: number;
}

export default function BuyList() {
  const [list, setList] = useState<Item[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("buyList");
    if (saved) {
      try {
        setList(JSON.parse(saved));
      } catch (error) {
        console.error("Invalid localStorage data");
      }
    }
  }, []);

  const total = list.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-green-50 p-4 rounded-xl mt-5 shadow-md">
      <h2 className="text-xl font-bold mb-3">🛒 Your Buy List</h2>

      {list.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {list.map((item, index) => (
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
