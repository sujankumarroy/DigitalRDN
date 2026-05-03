"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";

function SignUp() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function signUp() {
    try {
      if (!name || !email || !password) {
        alert("Failed to signup!\nEnter Name, Email and Password properly.");
        return;
      }
      setProcessing(true);
      let res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) console.log(`Failed to Fetch. error: ${res.status}`);
      const { user, error } = await res.json();
      setProcessing(false);
      if (error) {
        console.log(error);
        setError(error.message);
        return;
      }
      if (!user) {
        setError("server error");
        return;
      }
      localStorage.setItem("rdn-user", JSON.stringify(user));
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-100 pt-20 p-5 max-w-200 m-auto h-screen flex justify-center items-center text-center">
      <form className="w-100 border rounded-3xl p-3 px-10 bg-green-200">
        <div className="flex flex-col p-1">
          <label className="text-lg text-left">Name</label>
          <input
            type="text"
            autoComplete="name"
            placeholder="Name"
            className="border rounded-sm p-0.5 m-0.5"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-1">
          <label className="text-lg text-left">Email</label>
          <input
            type="email"
            autoComplete="email"
            placeholder="Email"
            className="border rounded-sm p-0.5 m-0.5"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-1">
          <label className="text-lg text-left">Password</label>
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Password"
            className="border rounded-sm p-0.5 m-0.5"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-1">
          <label className="text-lg text-left">Confirm Password</label>
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Confirm Password"
            className="border rounded-sm p-0.5 m-0.5"
            onChange={(e) => {
              const value = e.target.value;
              if (password !== value) setError("Password not matched");
              else setError("");
            }}
          />
        </div>
        <p onClick={() => router.push("/signin")}>
          have an account?
          <span className="text-blue-400 hover:underline">signin</span>
        </p>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (password.length >= 6) signUp();
            else setError("password must be least 6 char");
          }}
          className="bg-green-400 hover:bg-green-600 rounded-lg w-full mt-5 p-2 "
          disabled={processing ? true : false}
        >
          {processing ? (
            <div className="flex justify-center items-center">
              <Bars
                height={25}
                color="blue"
                ariaLabel="bars-loading"
                visible={true}
              />
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
        <p className={`text-red-500 `}>{error}</p>
      </form>
    </div>
  );
}

export default SignUp;
