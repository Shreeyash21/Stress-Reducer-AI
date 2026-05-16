"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/dashboard/TopBar";
import { StatCard } from "@/components/ui/Card";
import { MoodCheckin } from "@/components/dashboard/MoodCheckin";
import { WellnessChart } from "@/components/dashboard/WellnessChart";
import { AIInsightsCard } from "@/components/dashboard/AIInsightsCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { BreathingWidget } from "@/components/dashboard/BreathingWidget";
import { moodService } from "@/services/mood.service";
import { useAppStore } from "@/store/useAppStore";
import {
  Brain,
  TrendingUp,
  Flame,
  Heart,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAppStore();
  const [stats, setStats] = useState<{
    average_mood: number;
    average_stress: number;
    total_sessions: number;
    streak_days: number;
    improvement_percentage: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const data = await moodService.getWellnessStats();
      setStats(data);
      setLoading(false);
    };
    loadStats();
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const firstName = user?.email?.split("@")[0] || "there";

  return (
    <div className="min-h-screen">
      <TopBar
        title="Dashboard"
        subtitle="Your wellness overview"
      />

      <div className="p-6 space-y-6">
        {/* Welcome header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 bg-gradient-to-r from-brand-500/10 via-purple-500/5 to-transparent"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-dark-50">
                {greeting()}, {firstName} 👋
              </h2>
              <p className="text-dark-400 mt-1">
                How are you feeling today? Let&apos;s check in on your wellness.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-green-400 font-medium">AI Active</span>
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Mood Score"
            value={loading ? "—" : `${stats?.average_mood?.toFixed(1) || "—"}/10`}
            change={stats?.improvement_percentage}
            icon={<Heart className="w-5 h-5" />}
            color="brand"
            delay={0}
          />
          <StatCard
            label="Wellness Streak"
            value={loading ? "—" : `${stats?.streak_days || 0} days`}
            icon={<Flame className="w-5 h-5" />}
            color="orange"
            delay={0.1}
          />
          <StatCard
            label="Total Sessions"
            value={loading ? "—" : stats?.total_sessions || 0}
            icon={<Brain className="w-5 h-5" />}
            color="purple"
            delay={0.2}
          />
          <StatCard
            label="Improvement"
            value={loading ? "—" : `${stats?.improvement_percentage || 0}%`}
            icon={<TrendingUp className="w-5 h-5" />}
            color="green"
            delay={0.3}
          />
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <MoodCheckin />
            <WellnessChart />
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <AIInsightsCard />
            <BreathingWidget />
            <QuickActions />
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </div>
  );
}
