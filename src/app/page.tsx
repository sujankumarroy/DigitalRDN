"use client";

import Header from "@/components/Header";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import Products from "@/components/Products";
import Search from "@/components/Search";
import React, { useEffect, useState } from "react";

function Home() {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState<cartItemType[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("rdn-cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (error) {
        console.error("Invalid localCart data");
      }
    }
    const savedUser = localStorage.getItem("rdn-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setSignedIn(true);
      } catch (error) {
        console.error("Invalid localUser data");
      }
    }
  }, []);

  return (
    <div>
      <Header signedIn={signedIn} setSignedIn={setSignedIn} />
      <div className="min-h-100 pt-20 p-5 max-w-200 m-auto">
        <Search />
        <Cart cart={cart} />
        <Products setCart={setCart} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
