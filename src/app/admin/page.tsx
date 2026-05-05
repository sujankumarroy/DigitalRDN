"use client";

import Products from "@/components/admin/Products";
import FloatingAddButton from "@/components/FloatingAddButton";
import ProductForm from "@/components/ProductForm";
import { useState } from "react";

function Admin() {
  const [productFormAction, setProductFormAction] = useState<"Add" | "Update">(
    "Add",
  );
  const [productFormVisibility, setProductFormVisibility] = useState<
    "hidden" | ""
  >("hidden");
  const [productFormData, setProductFormData] = useState<ProductType>();

  return (
    <div>
      <div>
        <Products
          setProductFormAction={setProductFormAction}
          setProductFormVisibility={setProductFormVisibility}
          setProductFormData={setProductFormData}
        />
      </div>
      <div
        className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 ${productFormVisibility}`}
      >
        <ProductForm
          productFormVisibility={productFormVisibility}
          productFormAction={productFormAction}
          setProductFormVisibility={setProductFormVisibility}
          productFormData={productFormData}
        />
      </div>
      <FloatingAddButton
        setProductFormAction={setProductFormAction}
        setProductFormVisibility={setProductFormVisibility}
      />
    </div>
  );
}

export default Admin;
