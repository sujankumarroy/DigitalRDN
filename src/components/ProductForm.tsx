interface ProductFormProps {
  product?: ProductType;
  onSubmit?: (data: ProductType) => void;
  setProductFormVisibility: (visibility: "hidden" | "") => void;
}

function ProductForm({
  product,
  onSubmit,
  setProductFormVisibility,
}: ProductFormProps) {
  const inputStyle =
    "box-border w-full px-2 py-1.5 my-2 border border-[#ccc] rounded-lg text-[15px] transition-colors duration-200 focus:border-[#007bff] focus:outline-none";
  return (
    <div className="relative bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
      <span
        onClick={() => setProductFormVisibility("hidden")}
        className="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-black cursor-pointer transition-colors duration-200"
      >
        &times;
      </span>
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
        id="pname"
        type="text"
        placeholder="Product name"
      />
      <input
        className={inputStyle}
        id="pprice"
        type="number"
        placeholder="Price"
      />
      <input className={inputStyle} id="punit" type="text" placeholder="Unit" />
      <input className={inputStyle} id="ptype" type="text" placeholder="Type" />
      <input
        className={inputStyle}
        id="pstock"
        type="number"
        placeholder="Stock Quantity"
      />
      <input
        className={inputStyle}
        id="pminstock"
        type="number"
        placeholder="Min Stock"
      />
      <button className="w-full p-2 bg-[#007bff] text-white text-[16px] font-semibold rounded-lg cursor-pointer transition-colors duration-200 ease-in-out hover:bg-[#0056b3] active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300">
        Save Product
      </button>
    </div>
  );
}

export default ProductForm;
