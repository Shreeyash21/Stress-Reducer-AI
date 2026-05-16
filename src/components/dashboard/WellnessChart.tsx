"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BarChart3 } from "lucide-react";
import { moodService } from "@/services/mood.service";
import { format, parseISO } from "date-fns";

interface ChartData {
  date: string;
  mood: number;
  stress: number;
}

const stressMap: Record<string, number> = {
  low: 2,
  moderate: 5,
  high: 7,
  critical: 10,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 text-xs">
        <p className="text-dark-300 mb-2 font-medium">{label}</p>
        {payload.map((p: { name: string; value: number; color: string }) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-dark-400 capitalize">{p.name}:</span>
            <span className="text-dark-100 font-medium">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function WellnessChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [period, setPeriod] = useState<"week" | "month">("week");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result =
        period === "week"
          ? await moodService.getWeeklyMoodData()
          : await moodService.getMonthlyMoodData();

      if (result.data) {
        const chartData = result.data.map((entry: { created_at: string; mood_score: number; stress_level: string }) => ({
          date: format(parseISO(entry.created_at), period === "week" ? "EEE" : "MMM d"),
          mood: entry.mood_score,
          stress: stressMap[entry.stress_level] || 5,
        }));
        setData(chartData);
      }
      setLoading(false);
    };
    loadData();
  }, [period]);

  // Demo data if no real data
  const displayData =
    data.length > 0
      ? data
      : [
          { date: "Mon", mood: 6, stress: 5 },
          { date: "Tue", mood: 7, stress: 4 },
          { date: "Wed", mood: 5, stress: 7 },
          { date: "Thu", mood: 8, stress: 3 },
          { date: "Fri", mood: 7, stress: 4 },
          { date: "Sat", mood: 9, stress: 2 },
          { date: "Sun", mood: 8, stress: 3 },
        ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-dark-50">Wellness Trends</h3>
            <p className="text-xs text-dark-500">Mood & stress over time</p>
          </div>
        </div>
        <div className="flex gap-1 p-1 rounded-lg bg-dark-800/50">
          {(["week", "month"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                period === p
                  ? "bg-brand-500 text-white"
                  : "text-dark-400 hover:text-dark-200"
              }`}
            >
              {p === "week" ? "7 Days" : "30 Days"}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="spinner" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={displayData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <defs>
              <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.05)" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 10]}
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: "12px", color: "#64748b" }}
            />
            <Area
              type="monotone"
              dataKey="mood"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#moodGradient)"
              dot={{ fill: "#6366f1", r: 3 }}
              activeDot={{ r: 5, fill: "#818cf8" }}
            />
            <Area
              type="monotone"
              dataKey="stress"
              stroke="#a855f7"
              strokeWidth={2}
              fill="url(#stressGradient)"
              dot={{ fill: "#a855f7", r: 3 }}
              activeDot={{ r: 5, fill: "#c084fc" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
}
