import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";

type ProductFormState = {
  name: string;
  price: string;
  unit: string;
  type: string;
  stock_quantity: string;
  min_stock: string;
};

function ProductForm({
  productFormAction,
  productFormData,
  productFormVisibility,
  setProductFormVisibility,
}: {
  productFormAction: "Add" | "Update";
  productFormData?: ProductType;
  productFormVisibility: string;
  setProductFormVisibility: (visibility: "hidden" | "") => void;
}) {
  const emptyForm: ProductFormState = {
    name: "",
    price: "",
    unit: "",
    type: "",
    stock_quantity: "",
    min_stock: "",
  };

  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<ProductFormState>(emptyForm);

  const inputStyle =
    "box-border w-full px-2 py-1.5 my-2 border border-[#ccc] rounded-lg text-[15px] transition-colors duration-200 focus:border-[#007bff] focus:outline-none";

  useEffect(() => {
    if (productFormAction === "Update" && productFormData) {
      setForm({
        name: productFormData.name || "",
        price: productFormData.price?.toString() || "",
        unit: productFormData.unit || "",
        type: productFormData.type || "",
        stock_quantity: productFormData.stock_quantity?.toString() || "",
        min_stock: productFormData.min_stock?.toString() || "",
      });
    }

    if (productFormAction === "Add" || productFormVisibility === "hidden") {
      setForm(emptyForm);
      setError("");
    }
  }, [productFormAction, productFormData, productFormVisibility]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const payload: ProductType = {
      name: form.name,
      price: Number(form.price),
      unit: form.unit,
      type: form.type,
      stock_quantity: Number(form.stock_quantity),
      min_stock: Number(form.min_stock),
    };

    setProcessing(true);
    let res;
    if (productFormAction === "Add") {
      res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      res = await fetch(`/api/products/${productFormData?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setProcessing(false);

    const { data: product, error: fetchError } = await res.json();

    if (fetchError) {
      console.log(fetchError);
      setError(fetchError.message);
      return;
    }
    console.log("responsed data", product);
    setProductFormVisibility("hidden");
  };

  return (
    <form
      className="relative bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md"
      onSubmit={handleSubmit}
    >
      <button
        type="button"
        onClick={() => setProductFormVisibility("hidden")}
        className="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-black cursor-pointer"
      >
        &times;
      </button>

      <h2 className="text-center mb-5 text-2xl font-bold text-[#333]">
        {productFormAction === "Add" ? "Enter" : "Update"} Product
      </h2>

      <div className="w-full flex justify-center items-center">
        <img
          className="w-25 h-25 border-2 border-solid border-[#eee] rounded-[50%] mb-4"
          src="https://kcksejyyjfgpcdmgtzrc.supabase.co/storage/v1/object/public/product_images/demo.jpg"
        />
      </div>

      <input
        className={inputStyle}
        type="text"
        placeholder="Product name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className={inputStyle}
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        className={inputStyle}
        type="text"
        placeholder="Unit"
        value={form.unit}
        onChange={(e) => setForm({ ...form, unit: e.target.value })}
      />

      <input
        className={inputStyle}
        type="text"
        placeholder="Type"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      />

      <input
        className={inputStyle}
        type="number"
        placeholder="Stock Quantity"
        value={form.stock_quantity}
        onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })}
      />

      <input
        className={inputStyle}
        type="number"
        placeholder="Min Stock"
        value={form.min_stock}
        onChange={(e) => setForm({ ...form, min_stock: e.target.value })}
      />

      <button
        type="submit"
        className="w-full p-2 bg-[#007bff] text-white text-[16px] font-semibold rounded-lg hover:bg-[#0056b3]"
      >
        {processing ? (
          <div className="flex justify-center items-center">
            <Bars
              height={25}
              color="white"
              ariaLabel="bars-loading"
              visible={true}
            />
          </div>
        ) : (
          productFormAction
        )}
      </button>
      <p className={`text-center text-red-500 ${error ? "" : "invisibled"}`}>
        {error}
      </p>
    </form>
  );
}

export default ProductForm;
