"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { moodService } from "@/services/mood.service";
import type { MoodEntry } from "@/types";
import { getMoodEmoji, getMoodLabel, getEmotionEmoji, formatRelativeTime } from "@/lib/utils";

export function RecentActivity() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { entries } = await moodService.getMoodEntries(5);
      setEntries(entries);
      setLoading(false);
    };
    load();
  }, []);

  // Demo data
  const demoEntries: Partial<MoodEntry>[] = [
    { id: "1", mood_score: 7, emotion: "calm", stress_level: "low", created_at: new Date(Date.now() - 3600000).toISOString(), notes: "Had a productive morning" },
    { id: "2", mood_score: 5, emotion: "anxious", stress_level: "moderate", created_at: new Date(Date.now() - 86400000).toISOString(), notes: "Work deadline stress" },
    { id: "3", mood_score: 8, emotion: "happy", stress_level: "low", created_at: new Date(Date.now() - 172800000).toISOString(), notes: "Great workout session" },
  ];

  const displayEntries = entries.length > 0 ? entries : demoEntries as MoodEntry[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
          <Activity className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <h3 className="font-semibold text-dark-50">Recent Activity</h3>
          <p className="text-xs text-dark-500">Your latest mood check-ins</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 rounded-xl bg-dark-800/50 shimmer" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {displayEntries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-xl bg-dark-800/30 hover:bg-dark-800/50 transition-colors"
            >
              <div className="text-2xl">{getMoodEmoji(entry.mood_score as 1)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-dark-200">
                    {getMoodLabel(entry.mood_score as 1)}
                  </span>
                  <span className="text-xs text-dark-500">
                    {getEmotionEmoji(entry.emotion!)} {entry.emotion}
                  </span>
                </div>
                {entry.notes && (
                  <p className="text-xs text-dark-500 truncate mt-0.5">{entry.notes}</p>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  entry.stress_level === "low" ? "bg-green-500/10 text-green-400" :
                  entry.stress_level === "moderate" ? "bg-yellow-500/10 text-yellow-400" :
                  entry.stress_level === "high" ? "bg-orange-500/10 text-orange-400" :
                  "bg-red-500/10 text-red-400"
                }`}>
                  {entry.stress_level}
                </div>
                <p className="text-xs text-dark-600 mt-1">
                  {formatRelativeTime(entry.created_at)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
