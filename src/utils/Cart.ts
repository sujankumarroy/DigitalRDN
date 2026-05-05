"use client";

function getCart(): cartItemType[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("rdn-cart") || "[]");
}

function findFromCart(item: cartItemType) {
  const cart = getCart();
  const index = cart.findIndex((i) => i.id === item.id);
  return index;
}

function addToCart(item: cartItemType) {
  const cart = getCart();
  cart.push(item);
  localStorage.setItem("rdn-cart", JSON.stringify(cart));
  return cart;
}

function removeFromCart(id: number) {
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === id);
  cart.splice(index, 1);
  localStorage.setItem("rdn-cart", JSON.stringify(cart));
  return cart;
}

function updateCart(item: cartItemType) {
  const cart = getCart();
  const index = cart.findIndex((i) => i.id === item.id);
  cart[index] = item;
  localStorage.setItem("rdn-cart", JSON.stringify(cart));
  return cart;
}

export { getCart, findFromCart, addToCart, removeFromCart, updateCart };
