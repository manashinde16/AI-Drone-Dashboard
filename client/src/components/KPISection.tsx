"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

interface KPIData {
  totalViolations: number;
  uniqueDroneIds: number;
  violationTypes: number;
  uniqueLocations: number;
}

export default function KPISection() {
  const [kpi, setKpi] = useState<KPIData | null>(null);

  useEffect(() => {
    const fetchKPI = async () => {
      try {
        const res = await axiosInstance.get("/api/dashboard/kpi");
        setKpi(res.data);
      } catch (err) {
        console.error("Failed to load KPIs:", err);
      }
    };

    fetchKPI();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <KpiCard title="Total Violations" value={kpi?.totalViolations ?? "-"} />
      <KpiCard title="Unique Drone IDs" value={kpi?.uniqueDroneIds ?? "-"} />
      <KpiCard title="Violation Types" value={kpi?.violationTypes ?? "-"} />
      <KpiCard title="Unique Locations" value={kpi?.uniqueLocations ?? "-"} />
    </div>
  );
}

function KpiCard({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-lg p-6 text-center shadow-md">
      <p className="text-sm text-gray-400 mb-2">{title}</p>
      <p className="text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}
