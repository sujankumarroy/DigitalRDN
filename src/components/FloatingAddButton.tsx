function FloatingAddButton() {
  return (
    <button
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full 
      bg-gradient-to-r from-green-500 to-emerald-600 
      text-white shadow-xl 
      flex items-center justify-center 
      transition-all duration-300 
      hover:scale-110 hover:shadow-2xl 
      active:scale-95"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 transition-transform duration-300 group-hover:rotate-90"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeWidth="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );
}
export default FloatingAddButton;
