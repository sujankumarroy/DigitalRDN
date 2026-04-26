"use client";

import { useRouter } from "next/navigation";
import React from "react";

function SignIn() {
  const router = useRouter();
  return (
    <div className="min-h-100 pt-20 p-5 max-w-200 m-auto h-screen flex justify-center items-center text-center">
      <form className="w-100 border rounded-3xl p-3 px-10 bg-green-200">
        <div className="flex flex-col p-1">
          <label className="text-lg text-left">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="border rounded-sm p-0.5 m-0.5"
          />
        </div>
        <div className="flex flex-col p-1">
          <label className="text-lg text-left">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="border rounded-sm p-0.5 m-0.5"
          />
        </div>
        <p onClick={() => router.push("/signup")}>
          don't have an account?
          <span className="text-blue-400 hover:underline">signup</span>
        </p>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault;
            console.log(e);
          }}
          className="bg-green-400 hover:bg-green-600 rounded-lg w-full mt-5 p-2 "
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
