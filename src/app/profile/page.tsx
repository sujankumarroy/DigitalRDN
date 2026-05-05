"use client";

import { useEffect, useState } from "react";
import UserInfo from "@/components/UserInfo";
import { useAuth } from "@/context/AuthContext";

function Profile() {
  const demoUser = {
    name: "unknown",
    email: "name@gmail.com",
  };

  const { signedIn, setSignedIn } = useAuth();
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
      <div>
        <div>
          <UserInfo user={signedIn ? user : demoUser} />
        </div>
      </div>
    </>
  );
}

export default Profile;
