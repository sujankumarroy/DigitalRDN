"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bars } from "react-loader-spinner";

function SignIn() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function singIn() {
    try {
      if (!email || !password) {
        alert("Failed to login!\nEnter Email and Password properly.");
        return;
      }
      setProcessing(true);
      let res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
        setError("No credential found with your email and password");
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
            autoComplete="current-password"
            placeholder="Password"
            className="border rounded-sm p-0.5 m-0.5"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p onClick={() => router.push("/signup")}>
          don't have an account?
          <span className="text-blue-400 hover:underline">signup</span>
        </p>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            singIn();
          }}
          className="bg-green-400 hover:bg-green-600 rounded-lg w-full h-10 mt-5 p-2 "
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
            "Sign In"
          )}
        </button>
        <p className={`text-red-500 ${error ? "" : "invisibled"}`}>{error}</p>
      </form>
    </div>
  );
}

export default SignIn;
