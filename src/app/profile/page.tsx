"use client";

import { useEffect, useState } from "react";
import UserInfo from "@/components/UserInfo";

function Profile() {
  const demoUser = {
    name: "unknown",
    email: "name@gmail.com",
  };

  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState<userType>(demoUser);

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
      <div className="min-h-100 pt-20 p-5 max-w-200 m-auto">
        <div>
          <UserInfo user={signedIn ? user : demoUser} />
        </div>
      </div>
    </>
  );
}

export default Profile;
