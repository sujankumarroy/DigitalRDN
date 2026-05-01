"use client";

import Image from "next/image";

function UserInfo({ user }: { user: userType }) {
  return (
    <section className="bg-green-200 p-5 m-2.5 rounded-2xl hover:bg-green-300 flex items-center justify-around">
      <Image
        width={150}
        height={150}
        className="rounded-[50%]"
        src={
          /*"https://kcksejyyjfgpcdmgtzrc.supabase.co/storage/v1/object/public/product_images/" +
            user.picture || */ "/images/demo-avater.jpg"
        }
        alt="avater"
      />
      <div>
        <p className="p-1 text-3xl">{user.name}</p>
        <p className="p-1 text-xl" id="user-email">
          {user.email}
        </p>
      </div>
    </section>
  );
}

export default UserInfo;
