"use client";

import React, { useEffect, useState } from "react";
import Product from "./Product";

function Products({ setCart }: { setCart: SetCartType }) {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    async function loadData() {
      const res = await fetch(
        "https://digitalrdn.netlify.app/.netlify/functions/get-products",
      );
      const { data } = await res.json();
      setProducts(data);
    }

    loadData();
  }, []);

  return (
    <div className="my-5">
      <div>
        <p className="text-3xl">Products</p>
        <p className="text-2xl">Issued Date: 11/06/2025</p>
      </div>
      <div id="products">
        <div id="loader">
          <div className="loader"></div>
        </div>
        {products.map((product) => {
          const cart: cartItemType[] = JSON.parse(
            localStorage.getItem("rdn-cart") || "[]",
          );
          const isAdded = cart.some((item) => item.id === product.id);
          return (
            <Product
              setCart={setCart}
              key={product.id}
              params={product}
              isAdded={isAdded}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Products;
