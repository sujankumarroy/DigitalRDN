import React from "react";
import logo from "../../public/icons/android-chrome-512x512.png";
import Image from "next/image";

function Header() {
  return (
    <header>
      <div className="fixed w-screen bg-green-900 flex items-center justify-center gap-5 p-2">
        <Image src={logo} alt="rdn logo" width={50} height={50} />
        <p className="text-3xl text-white">Rongpur Daily Needs</p>
      </div>
    </header>
  );
}

export default Header;
