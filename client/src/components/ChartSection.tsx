"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axiosInstance from "@/utils/axiosInstance";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function ChartSection() {
  const [typeData, setTypeData] = useState([]);
  const [timeData, setTimeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/api/dashboard/chart");
        setTypeData(res.data.violationTypeData || []);
        setTimeData(res.data.violationTimeData || []);
      } catch (err) {
        console.error("Chart fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Pie Chart */}
      <div className="bg-white/10 p-4 rounded-lg shadow-md backdrop-blur">
        <h2 className="text-white text-lg mb-4">Violation Type Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={typeData}
              dataKey="count"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {typeData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="bg-white/10 p-4 rounded-lg shadow-md backdrop-blur">
        <h2 className="text-white text-lg mb-4">Violations Over Time</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={timeData}>
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#00C49F"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
