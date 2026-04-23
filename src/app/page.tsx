import BuyList from "@/components/BuyList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Search from "@/components/Search";
import React from "react";

function Home() {
  return (
    <div>
      <Header />
      <div className="h-screen pt-20 max-w-200 m-auto">
        <Search />
        <BuyList />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
