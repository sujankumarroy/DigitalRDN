"use client";

import React, { useEffect, useState } from "react";
import UserInfo from "../../components/UserInfo";
import Header from "@/components/Header";

function Profile() {
  const demoUser = {
    name: "unknown",
    email: "name@gmail.com",
  };

  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(demoUser);

  useEffect(() => {
    const savedUser = localStorage.getItem("rdn-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setSignedIn(true);
      } catch (error) {
        console.error("Invalid localUser data");
      }
    }
  }, []);

  return (
    <>
      <Header signedIn={signedIn} setSignedIn={setSignedIn} />
      <div className="min-h-100 pt-20 p-5 max-w-200 m-auto">
        <div>
          <UserInfo user={signedIn ? user : demoUser} />
        </div>
      </div>
    </>
  );
}

export default Profile;
