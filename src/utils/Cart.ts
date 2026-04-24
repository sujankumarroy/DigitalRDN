"use client";

function addToCart(item: cartItemType) {
  const cart: cartItemType[] = JSON.parse(
    localStorage.getItem("rdn-cart") || "[]",
  );
  cart.push(item);
  localStorage.setItem("rdn-cart", JSON.stringify(cart));
  return cart;
}

function removeFromCart(id: number) {
  const cart: cartItemType[] = JSON.parse(
    localStorage.getItem("rdn-cart") || "[]",
  );
  const index = cart.findIndex((item) => item.id === id);
  cart.splice(index, 1);
  localStorage.setItem("rdn-cart", JSON.stringify(cart));
  return cart;
}

export { addToCart, removeFromCart };
