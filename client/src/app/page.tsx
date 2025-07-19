"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/utils/axiosInstance";
import { saveToken } from "@/utils/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { username, password });
      saveToken(res.data.token);
      router.push("/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {/* Glass Card */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md shadow-2xl">
        {/* Left Side with Image + Overlay */}
        <div
          className="w-full md:w-1/2 relative flex flex-col justify-between p-8 text-white"
          style={{
            backgroundImage: "url('/blob.jpg')", // Replace with your gradient blob image
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <h1 className="text-4xl font-extrabold tracking-widest">AIVD</h1>
            <p className="text-sm text-white/80 mt-1">AI Violation Dashboard</p>
          </div>

          <div className="mt-auto text-5xl font-bold mb-8">Welcome Back!</div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 px-8 py-10 text-white">
          <h2 className="text-3xl font-bold mb-2">Login</h2>
          <p className="text-gray-300 mb-6">
            Welcome back! Please login to your account.
          </p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-white/20 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-white/20 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-md font-semibold transition"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-300 mt-4">
            New User?{" "}
            <a
              href="/register"
              className="text-violet-400 hover:underline font-semibold"
            >
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
