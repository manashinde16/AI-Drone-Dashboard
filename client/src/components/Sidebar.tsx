"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="w-64 min-h-screen bg-[#0f0f0f] border-r border-gray-800 p-6 fixed">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white">AIVD</h1>
        <p className="text-sm text-gray-400">AI Violation Dashboard</p>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-4">
        <Link
          href="/dashboard"
          className="text-white hover:bg-gray-800 px-3 py-2 rounded"
        >
          📊 Dashboard
        </Link>
        <Link
          href="/upload"
          className="text-white hover:bg-gray-800 px-3 py-2 rounded"
        >
          ⬆️ Upload JSON
        </Link>
        <button
          onClick={handleLogout}
          className="text-white hover:bg-red-600 px-3 py-2 rounded mt-10 text-left"
        >
          🔒 Logout
        </button>
      </nav>
    </div>
  );
}
