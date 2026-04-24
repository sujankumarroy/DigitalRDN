import React from "react";
import demoAvatar from "../../public/images/demo-avater.jpg";
import Image from "next/image";

function UserInfo() {
  return (
    <section className="bg-green-200 p-5 m-2.5 rounded-2xl hover:bg-green-300 flex items-center justify-around">
      <Image
        width={150}
        height={150}
        className="rounded-[50%]"
        src={demoAvatar}
        alt="avater"
      />
      <div>
        <p className="p-1 text-3xl">Unknown</p>
        <p className="p-1 text-xl" id="user-email">
          name@example.com
        </p>
        <p className="p-1 text-xl" id="user-phone">
          +91 0000000000
        </p>
      </div>
    </section>
  );
}

export default UserInfo;
