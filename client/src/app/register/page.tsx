/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/utils/axiosInstance";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await API.post("/auth/register", { username, email, password });
      router.push("/");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md shadow-2xl">
        {/* Left Panel */}
        <div
          className="w-full md:w-1/2 relative flex flex-col justify-between p-8 text-white"
          style={{
            backgroundImage: "url('/blob.jpg')", // Replace with your image name
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <h1 className="text-4xl font-extrabold tracking-widest">AIVD</h1>
            <p className="text-sm text-white/80 mt-1">AI Violation Dashboard</p>
          </div>

          <div className="mt-auto text-4xl md:text-5xl font-bold mb-8">
            Join Us Today!
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 px-8 py-10 text-white">
          <h2 className="text-3xl font-bold mb-2">Register</h2>
          <p className="text-gray-300 mb-6">
            Create your account to get started.
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-white/20 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-white/20 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full p-3 border border-white/20 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-md font-semibold transition"
          >
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-300 mt-4">
            Already have an account?{" "}
            <a
              href="/"
              className="text-violet-400 hover:underline font-semibold"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
