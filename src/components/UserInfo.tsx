"use client";

import React, { use, useEffect, useState } from "react";
import Image from "next/image";

function UserInfo() {
  const [name, setName] = useState("Unknown");
  const [email, setEmail] = useState("name@example.com");
  const [avater, setAvatar] = useState("/images/demo-avater.jpg");

  return (
    <section className="bg-green-200 p-5 m-2.5 rounded-2xl hover:bg-green-300 flex items-center justify-around">
      <Image
        width={150}
        height={150}
        className="rounded-[50%]"
        src={avater}
        alt="avater"
      />
      <div>
        <p className="p-1 text-3xl">{name}</p>
        <p className="p-1 text-xl" id="user-email">
          {email}
        </p>
      </div>
    </section>
  );
}

export default UserInfo;
