import React from "react";

function Search() {
  return (
    <div className="text-center mt-4">
      <input
        className="w-[60%] max-w-100 px-2.5 py-3 border-s-gray-800 rounded-4xl "
        type="text"
        id="searchInput"
        placeholder="Search for products..."
      ></input>
    </div>
  );
}

export default Search;
