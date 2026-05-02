"use client";

import Products from "@/components/admin/Products";
import FloatingAddButton from "@/components/FloatingAddButton";
import Header from "@/components/Header";
import ProductForm from "@/components/ProductForm";
import React, { useState } from "react";

function Admin() {
  const [signedIn, setSignedIn] = useState(false);
  const [productFormVisibility, setProductFormVisibility] = useState("hidden");
  const [productFormData, setProductFormData] = useState<ProductType>();

  return (
    <div>
      <Header signedIn={signedIn} setSignedIn={setSignedIn} picture="" />
      <div className="min-h-100 pt-20 p-5 max-w-200 m-auto">
        <Products
          setProductFormVisibility={setProductFormVisibility}
          setProductFormData={setProductFormData}
        />
      </div>
      <div
        className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 ${productFormVisibility}`}
      >
        <ProductForm
          setProductFormVisibility={setProductFormVisibility}
          productFormData={productFormData}
          setProductFormData={setProductFormData}
        />
      </div>
      <FloatingAddButton setProductFormVisibility={setProductFormVisibility} />
    </div>
  );
}

export default Admin;
