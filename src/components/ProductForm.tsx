import { useEffect, useState } from "react";

function ProductForm({
  productFormData,
  setProductFormData,
  setProductFormVisibility,
}: {
  productFormData?: ProductType;
  setProductFormData: (data: ProductType) => void;
  setProductFormVisibility: (visibility: "hidden" | "") => void;
}) {
  const [form, setForm] = useState<ProductType>({
    name: productFormData?.name || "",
    price: productFormData?.price || 0,
    unit: productFormData?.unit || "",
    type: productFormData?.type || "",
    stock_quantity: productFormData?.stock_quantity || 0,
    min_stock: productFormData?.min_stock || 0,
  });
  const inputStyle =
    "box-border w-full px-2 py-1.5 my-2 border border-[#ccc] rounded-lg text-[15px] transition-colors duration-200 focus:border-[#007bff] focus:outline-none";

  console.log(form);
  useEffect(() => {
    if (productFormData) {
      setForm(productFormData);
    }
  }, [productFormData]);

  return (
    <form
      className="relative bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        setProductFormData(form);
      }}
    >
      <button
        type="button"
        onClick={() => setProductFormVisibility("hidden")}
        className="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-black cursor-pointer transition-colors duration-200"
      >
        &times;
      </button>
      <h2 className="text-center mb-5 text-2xl font-bold text-[#333]">
        Enter Product
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
        value={form?.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className={inputStyle}
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
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
        onChange={(e) =>
          setForm({ ...form, stock_quantity: Number(e.target.value) })
        }
      />
      <input
        className={inputStyle}
        type="number"
        placeholder="Min Stock"
        value={form.min_stock}
        onChange={(e) =>
          setForm({ ...form, min_stock: Number(e.target.value) })
        }
      />
      <button
        type="submit"
        className="w-full p-2 bg-[#007bff] text-white text-[16px] font-semibold rounded-lg cursor-pointer transition-colors duration-200 ease-in-out hover:bg-[#0056b3] active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Save Product
      </button>
    </form>
  );
}

export default ProductForm;
