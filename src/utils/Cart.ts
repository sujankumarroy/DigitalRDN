"use client";

interface Item {
  name: string;
  price: number;
  quantity: number;
}

function addToCart(item: Item) {
  localStorage.setItem("rdn-cart", JSON.stringify(item));
  console.log(item);
}

export { addToCart };
