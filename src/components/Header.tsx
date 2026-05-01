"use client";

import React, { useState } from "react";
import logo from "../../public/icons/android-chrome-512x512.png";
import demoAvatar from "../../public/images/demo-avater.jpg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

function Header({
  signedIn,
  setSignedIn,
  picture,
}: {
  signedIn: boolean;
  setSignedIn: (signedIn: boolean) => void;
  picture: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header>
      <div className="fixed w-screen bg-green-900 flex items-center justify-between gap-5 p-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-[50%]">
          <p
            className={`text-4xl text-white p-0 m-0 relative right-0 ${pathname === "/" ? "hidden" : ""}`}
            onClick={() => router.back()}
          >
            ←
          </p>
        </div>
        <div className="flex items-center justify-center gap-5 p-2">
          <Image src={logo} alt="rdn logo" width={50} height={50} />
          <p className="text-3xl text-white">Rongpur Daily Needs</p>
        </div>
        {signedIn && pathname !== "/profile" ? (
          <Image
            width={60}
            height={60}
            alt="profile"
            src={demoAvatar}
            className="rounded-[50%]"
            onClick={() => {
              if (pathname !== "/profile") router.push("/profile");
            }}
          />
        ) : (
          <button
            className={`border rounded-sm ${signedIn ? "bg-red-400" : "bg-blue-400"} p-2`}
            onClick={() => {
              if (signedIn) {
                localStorage.removeItem("rdn-user");
                setSignedIn(false);
              } else {
                router.push("/signin");
              }
            }}
          >
            {signedIn ? "Sign Out" : "Sign In"}
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
