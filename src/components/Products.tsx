import React from "react";
import Product from "./Product";

function Products() {
  const product = {
    name: "Amul",
    price: 43,
    unit: "kg",
    stock_quantity: 5,
    isAdded: true,
    file_name: "surf-excel.jpg",
  };
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
        <Product params={product} />
      </div>
    </div>
  );
}

export default Products;
