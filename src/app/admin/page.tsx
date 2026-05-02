"use client";

import FloatingAddButton from "@/components/FloatingAddButton";
import Header from "@/components/Header";
import React, { useState } from "react";

function Admin() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <div>
      <Header signedIn={signedIn} setSignedIn={setSignedIn} picture="" />
      <FloatingAddButton />
    </div>
  );
}

export default Admin;
