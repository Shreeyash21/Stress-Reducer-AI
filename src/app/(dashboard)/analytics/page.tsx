"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/dashboard/TopBar";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BarChart3, TrendingUp, Calendar, Brain } from "lucide-react";
import { moodService } from "@/services/mood.service";
import { getEmotionColor } from "@/lib/utils";

const EMOTION_COLORS = {
  happy: "#22c55e",
  calm: "#06b6d4",
  anxious: "#f97316",
  sad: "#6366f1",
  angry: "#ef4444",
  neutral: "#94a3b8",
  excited: "#eab308",
  tired: "#8b5cf6",
};

// Demo data
const weeklyData = [
  { day: "Mon", mood: 6, stress: 5, energy: 7 },
  { day: "Tue", mood: 7, stress: 4, energy: 8 },
  { day: "Wed", mood: 5, stress: 7, energy: 5 },
  { day: "Thu", mood: 8, stress: 3, energy: 9 },
  { day: "Fri", mood: 7, stress: 4, energy: 7 },
  { day: "Sat", mood: 9, stress: 2, energy: 9 },
  { day: "Sun", mood: 8, stress: 3, energy: 8 },
];

const monthlyData = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  mood: Math.floor(Math.random() * 4) + 5,
  stress: Math.floor(Math.random() * 5) + 2,
}));

const emotionData = [
  { name: "Calm", value: 35, color: EMOTION_COLORS.calm },
  { name: "Happy", value: 28, color: EMOTION_COLORS.happy },
  { name: "Anxious", value: 18, color: EMOTION_COLORS.anxious },
  { name: "Neutral", value: 12, color: EMOTION_COLORS.neutral },
  { name: "Tired", value: 7, color: EMOTION_COLORS.tired },
];

const radarData = [
  { subject: "Sleep", A: 7, fullMark: 10 },
  { subject: "Exercise", A: 6, fullMark: 10 },
  { subject: "Nutrition", A: 8, fullMark: 10 },
  { subject: "Social", A: 7, fullMark: 10 },
  { subject: "Mindfulness", A: 5, fullMark: 10 },
  { subject: "Work-Life", A: 6, fullMark: 10 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 text-xs border border-dark-700">
        <p className="text-dark-300 mb-2 font-medium">{label}</p>
        {payload.map((p: { name: string; value: number; color: string }) => (
          <div key={p.name} className="flex items-center gap-2 mb-1">
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

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<"week" | "month">("week");
  const [stats, setStats] = useState<{
    average_mood: number;
    average_stress: number;
    total_sessions: number;
    streak_days: number;
    improvement_percentage: number;
  } | null>(null);

  useEffect(() => {
    moodService.getWellnessStats().then(setStats);
  }, []);

  const displayData = period === "week" ? weeklyData : monthlyData;

  return (
    <div className="min-h-screen">
      <TopBar title="Analytics" subtitle="Your wellness insights & trends" />

      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="text-xl font-bold text-dark-50">Wellness Analytics</h2>
            <p className="text-dark-400 text-sm">Track your emotional patterns and progress</p>
          </div>
          <div className="flex gap-1 p-1 rounded-lg bg-dark-800/50">
            {(["week", "month"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  period === p ? "bg-brand-500 text-white" : "text-dark-400 hover:text-dark-200"
                }`}
              >
                {p === "week" ? "This Week" : "This Month"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Avg Mood", value: stats?.average_mood?.toFixed(1) || "7.2", suffix: "/10", color: "text-brand-400", icon: "😊" },
            { label: "Streak", value: stats?.streak_days || 12, suffix: " days", color: "text-orange-400", icon: "🔥" },
            { label: "Sessions", value: stats?.total_sessions || 47, suffix: "", color: "text-purple-400", icon: "📊" },
            { label: "Improvement", value: stats?.improvement_percentage || 23, suffix: "%", color: "text-green-400", icon: "📈" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{stat.icon}</span>
                <span className="text-xs text-dark-500">{stat.label}</span>
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}{stat.suffix}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mood & Stress Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-brand-400" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-100 text-sm">Mood & Stress Trend</h3>
                <p className="text-xs text-dark-500">Daily wellness scores</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={displayData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <defs>
                  <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.05)" />
                <XAxis dataKey={period === "week" ? "day" : "date"} tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "11px", color: "#64748b" }} />
                <Area type="monotone" dataKey="mood" stroke="#6366f1" strokeWidth={2} fill="url(#moodGrad)" dot={false} />
                <Area type="monotone" dataKey="stress" stroke="#f97316" strokeWidth={2} fill="url(#stressGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Emotion Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Brain className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-100 text-sm">Emotion Distribution</h3>
                <p className="text-xs text-dark-500">How you&apos;ve been feeling</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="50%" height={180}>
                <PieChart>
                  <Pie
                    data={emotionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {emotionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Frequency"]}
                    contentStyle={{
                      background: "rgba(15,23,42,0.95)",
                      border: "1px solid rgba(99,102,241,0.3)",
                      borderRadius: "0.75rem",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {emotionData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                    <span className="text-xs text-dark-400 flex-1">{item.name}</span>
                    <span className="text-xs font-medium text-dark-200">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Weekly Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-100 text-sm">Daily Mood Scores</h3>
                <p className="text-xs text-dark-500">Mood vs energy levels</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.05)" />
                <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "11px", color: "#64748b" }} />
                <Bar dataKey="mood" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="energy" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Wellness Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-100 text-sm">Wellness Dimensions</h3>
                <p className="text-xs text-dark-500">Holistic health overview</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(148,163,184,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 10 }} />
                <Radar
                  name="Wellness"
                  dataKey="A"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15,23,42,0.95)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    borderRadius: "0.75rem",
                    fontSize: "12px",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6 bg-gradient-to-r from-brand-500/5 to-purple-500/5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
              <Brain className="w-4 h-4 text-brand-400" />
            </div>
            <h3 className="font-semibold text-dark-100">AI-Generated Insights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Peak Performance Time",
                insight: "Your mood scores are consistently highest on Thursday and Saturday. Consider scheduling important tasks during these peak periods.",
                color: "text-green-400",
                bg: "bg-green-500/10",
              },
              {
                title: "Stress Pattern",
                insight: "Wednesday shows elevated stress levels. This may correlate with mid-week work pressure. A Wednesday meditation session could help.",
                color: "text-orange-400",
                bg: "bg-orange-500/10",
              },
              {
                title: "Wellness Trend",
                insight: "Your overall wellness score has improved by 23% this month. The breathing exercises and journaling are making a positive impact.",
                color: "text-brand-400",
                bg: "bg-brand-500/10",
              },
            ].map((item) => (
              <div key={item.title} className={`p-4 rounded-xl ${item.bg}`}>
                <p className={`text-xs font-semibold mb-2 ${item.color}`}>{item.title}</p>
                <p className="text-xs text-dark-300 leading-relaxed">{item.insight}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
