"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  signedIn: boolean;
  setSignedIn: (v: boolean) => void;
  picture: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);
  const [picture, setPicture] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("rdn-user");
    if (user) {
      setSignedIn(true);
      setPicture(JSON.parse(user)?.picture || "");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, setSignedIn, picture }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
