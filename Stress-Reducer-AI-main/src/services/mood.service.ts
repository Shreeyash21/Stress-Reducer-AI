import { createClient } from "@/lib/supabase/client";
import type { MoodEntry, MoodLevel, StressLevel, EmotionType } from "@/types";

const supabase = createClient();

export const moodService = {
  async createMoodEntry(data: {
    mood_score: MoodLevel;
    stress_level: StressLevel;
    emotion: EmotionType;
    notes?: string;
    activities?: string[];
    ai_insights?: string;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data: entry, error } = await supabase
      .from("mood_entries")
      .insert({
        user_id: user.id,
        ...data,
      })
      .select()
      .single();

    return { entry, error };
  },

  async getMoodEntries(limit = 30): Promise<{ entries: MoodEntry[]; error: unknown }> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { entries: [], error: "Not authenticated" };

    const { data, error } = await supabase
      .from("mood_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit);

    return { entries: (data as MoodEntry[]) || [], error };
  },

  async getWeeklyMoodData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: [], error: "Not authenticated" };

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data, error } = await supabase
      .from("mood_entries")
      .select("mood_score, stress_level, emotion, created_at")
      .eq("user_id", user.id)
      .gte("created_at", sevenDaysAgo.toISOString())
      .order("created_at", { ascending: true });

    return { data: data || [], error };
  },

  async getMonthlyMoodData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: [], error: "Not authenticated" };

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data, error } = await supabase
      .from("mood_entries")
      .select("mood_score, stress_level, emotion, created_at")
      .eq("user_id", user.id)
      .gte("created_at", thirtyDaysAgo.toISOString())
      .order("created_at", { ascending: true });

    return { data: data || [], error };
  },

  async getWellnessStats() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from("mood_entries")
      .select("mood_score, stress_level, emotion, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(100);

    if (!data || data.length === 0) return null;

    const avgMood = data.reduce((sum, e) => sum + e.mood_score, 0) / data.length;
    const stressMap: Record<string, number> = { low: 1, moderate: 2, high: 3, critical: 4 };
    const avgStress = data.reduce((sum, e) => sum + stressMap[e.stress_level], 0) / data.length;

    const emotionCounts: Record<string, number> = {};
    data.forEach((e) => {
      emotionCounts[e.emotion] = (emotionCounts[e.emotion] || 0) + 1;
    });

    const topEmotions = Object.entries(emotionCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([emotion, count]) => ({ emotion: emotion as EmotionType, count }));

    return {
      average_mood: Math.round(avgMood * 10) / 10,
      average_stress: Math.round(avgStress * 10) / 10,
      total_sessions: data.length,
      streak_days: calculateStreak(data),
      improvement_percentage: calculateImprovement(data),
      top_emotions: topEmotions,
    };
  },
};

function calculateStreak(entries: { created_at: string }[]): number {
  if (entries.length === 0) return 0;
  let streak = 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < entries.length - 1; i++) {
    const current = new Date(entries[i].created_at);
    const next = new Date(entries[i + 1].created_at);
    current.setHours(0, 0, 0, 0);
    next.setHours(0, 0, 0, 0);

    const diffDays = (current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

function calculateImprovement(entries: { mood_score: number }[]): number {
  if (entries.length < 2) return 0;
  const recent = entries.slice(0, Math.floor(entries.length / 2));
  const older = entries.slice(Math.floor(entries.length / 2));

  const recentAvg = recent.reduce((sum, e) => sum + e.mood_score, 0) / recent.length;
  const olderAvg = older.reduce((sum, e) => sum + e.mood_score, 0) / older.length;

  return Math.round(((recentAvg - olderAvg) / olderAvg) * 100);
}
