"use client";

import BuyList from "@/components/BuyList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Products from "@/components/Products";
import Search from "@/components/Search";
import React, { useEffect, useState } from "react";

function Home() {
  const [cart, setCart] = useState<cartItemType[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("rdn-cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (error) {
        console.error("Invalid localStorage data");
      }
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-100 pt-20 p-5 max-w-200 m-auto">
        <Search />
        <BuyList cart={cart} />
        <Products setCart={setCart} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
