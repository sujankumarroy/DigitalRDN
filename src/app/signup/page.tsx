"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const router = useRouter();
  return (
    <div className="min-h-100 pt-20 p-5 max-w-200 m-auto h-screen flex justify-center items-center text-center">
      <form className="w-100 border rounded-3xl p-3 px-10 bg-green-200">
        <div className="flex flex-col p-1">
          <label className="text-lg text-left">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="border rounded-sm p-0.5 m-0.5"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-1">
          <label className="text-lg text-left">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="border rounded-sm p-0.5 m-0.5"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-1">
          <label className="text-lg text-left">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="border rounded-sm p-0.5 m-0.5"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-1">
          <label className="text-lg text-left">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="border rounded-sm p-0.5 m-0.5"
            onChange={(e) => setPasswordR(e.target.value)}
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
            console.log({ name, email, password, passwordR });
          }}
          className="bg-green-400 hover:bg-green-600 rounded-lg w-full mt-5 p-2 "
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
