import React from "react";
import Product from "./Product";

function Products() {
  const product = {
    name: "Amul",
    price: 43,
    unit: "kg",
  };
  return (
    <div>
      <div>
        <h2>Products Details</h2>
        <h3>Issued Date: 11/06/2025</h3>
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
