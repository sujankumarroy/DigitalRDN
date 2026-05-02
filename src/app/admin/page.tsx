"use client";

import Products from "@/components/admin/Products";
import FloatingAddButton from "@/components/FloatingAddButton";
import Header from "@/components/Header";
import React, { useState } from "react";

function Admin() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <div>
      <Header signedIn={signedIn} setSignedIn={setSignedIn} picture="" />
      <div className="min-h-100 pt-20 p-5 max-w-200 m-auto">
        <Products />
      </div>
      <FloatingAddButton />
    </div>
  );
}

export default Admin;
