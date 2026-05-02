"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { RotatingLines } from "react-loader-spinner";

function Products({
  setProductFormVisibility,
  setProductFormData,
}: {
  setProductFormVisibility: (visibility: "hidden" | "") => void;
  setProductFormData: (data: ProductType) => void;
}) {
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
            return (
              <ProductCard
                key={product.id}
                product={product}
                setProductFormVisibility={setProductFormVisibility}
                setProductFormData={setProductFormData}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Products;
