import BuyList from "@/components/BuyList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Products from "@/components/Products";
import Search from "@/components/Search";
import React from "react";

function Home() {
  return (
    <div>
      <Header />
      <div className="min-h-100 pt-20 max-w-200 m-auto">
        <Search />
        <BuyList />
        <Products />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
