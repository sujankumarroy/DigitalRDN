"use client";

import React, { useState } from "react";

interface product {
  name: string;
  price: number;
  unit: string;
  stock_quantity?: number;
  type?: string;
  isAdded?: boolean;
  file_name?: string;
}

function Product({ params }: { params: product }) {
  const [qty, setQty] = useState(1);

  const { name, price, unit, stock_quantity, type, isAdded, file_name } =
    params;
  return (
    <div>
      <img src={"root_path" + file_name} alt={name} />
      <div className="product-details">
        <h3>{name}</h3>
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
          className="quantity-input"
          onChange={(e) => setQty(Number(e.target.value))}
        />
      </div>
      <button
        className={`book-buton ${isAdded ? "added" : ""}`}
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
