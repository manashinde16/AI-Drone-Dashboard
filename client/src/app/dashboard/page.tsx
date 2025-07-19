"use client";

import Sidebar from "@/components/Sidebar";
import KPISection from "@/components/KPISection";
import ChartSection from "@/components/ChartSection";
import dynamic from "next/dynamic";

// 👇 Dynamically import MapSection (client-side only)
const MapSection = dynamic(() => import("@/components/MapSection"), {
  ssr: false, // ⛔ disables server-side rendering for this component
});

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        <KPISection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ChartSection />
          <MapSection />
        </div>

        <div className="mt-6"></div>
      </main>
    </div>
  );
}
