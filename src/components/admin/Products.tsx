"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { RotatingLines } from "react-loader-spinner";

function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await fetch(
        "https://digitalrdn.netlify.app/.netlify/functions/get-products",
      );
      const { data } = await res.json();
      setProducts(data);
      setLoading(false);
    }

    loadData();
  }, []);

  return (
    <div className="my-5">
      <div id="products">
        {loading ? (
          <div className="flex justify-center items-center h-50">
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          products.map((product) => {
            const cart: cartItemType[] = JSON.parse(
              localStorage.getItem("rdn-cart") || "[]",
            );
            const isAdded = cart.some((item) => item.id === product.id);
            return <ProductCard key={product.id} product={product} />;
          })
        )}
      </div>
    </div>
  );
}

export default Products;
