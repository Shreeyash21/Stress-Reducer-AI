import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import type { EmotionType, MoodLevel, StressLevel } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date utilities
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "MMM d, yyyy");
}

export function formatTime(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "h:mm a");
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "MMM d, yyyy 'at' h:mm a");
}

// Mood utilities
export function getMoodLabel(score: MoodLevel): string {
  const labels: Record<MoodLevel, string> = {
    1: "Terrible",
    2: "Very Bad",
    3: "Bad",
    4: "Poor",
    5: "Neutral",
    6: "Okay",
    7: "Good",
    8: "Great",
    9: "Excellent",
    10: "Amazing",
  };
  return labels[score];
}

export function getMoodColor(score: number): string {
  if (score <= 3) return "#ef4444";
  if (score <= 5) return "#f97316";
  if (score <= 7) return "#eab308";
  if (score <= 9) return "#22c55e";
  return "#06b6d4";
}

export function getMoodEmoji(score: MoodLevel): string {
  const emojis: Record<MoodLevel, string> = {
    1: "😭",
    2: "😢",
    3: "😞",
    4: "😕",
    5: "😐",
    6: "🙂",
    7: "😊",
    8: "😄",
    9: "😁",
    10: "🤩",
  };
  return emojis[score];
}

// Stress utilities
export function getStressColor(level: StressLevel): string {
  const colors: Record<StressLevel, string> = {
    low: "#22c55e",
    moderate: "#eab308",
    high: "#f97316",
    critical: "#ef4444",
  };
  return colors[level];
}

export function getStressLabel(level: StressLevel): string {
  const labels: Record<StressLevel, string> = {
    low: "Low Stress",
    moderate: "Moderate Stress",
    high: "High Stress",
    critical: "Critical Stress",
  };
  return labels[level];
}

// Emotion utilities
export function getEmotionEmoji(emotion: EmotionType): string {
  const emojis: Record<EmotionType, string> = {
    happy: "😊",
    calm: "😌",
    anxious: "😰",
    sad: "😢",
    angry: "😠",
    neutral: "😐",
    excited: "🤩",
    tired: "😴",
  };
  return emojis[emotion];
}

export function getEmotionColor(emotion: EmotionType): string {
  const colors: Record<EmotionType, string> = {
    happy: "#22c55e",
    calm: "#06b6d4",
    anxious: "#f97316",
    sad: "#6366f1",
    angry: "#ef4444",
    neutral: "#94a3b8",
    excited: "#eab308",
    tired: "#8b5cf6",
  };
  return colors[emotion];
}

// Number utilities
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// String utilities
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Wellness utilities
export function calculateWellnessScore(
  moodScore: number,
  stressLevel: StressLevel
): number {
  const stressMultiplier: Record<StressLevel, number> = {
    low: 1.0,
    moderate: 0.8,
    high: 0.6,
    critical: 0.4,
  };
  return Math.round(moodScore * 10 * stressMultiplier[stressLevel]);
}

export function getWellnessTip(score: number): string {
  if (score >= 80) return "You're doing great! Keep up the positive momentum.";
  if (score >= 60) return "Good progress! Try a 5-minute breathing exercise.";
  if (score >= 40) return "Take a moment for yourself. Meditation can help.";
  return "Please reach out for support. You're not alone in this journey.";
}

// Motivational quotes
export const motivationalQuotes = [
  {
    quote: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman",
  },
  {
    quote: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
    author: "Noam Shpancer",
  },
  {
    quote: "Self-care is not self-indulgence, it is self-preservation.",
    author: "Audre Lorde",
  },
  {
    quote: "You are allowed to be both a masterpiece and a work in progress simultaneously.",
    author: "Sophia Bush",
  },
  {
    quote: "Healing is not linear. Be patient with yourself.",
    author: "Unknown",
  },
  {
    quote: "Your present circumstances don't determine where you can go; they merely determine where you start.",
    author: "Nido Qubein",
  },
  {
    quote: "The greatest weapon against stress is our ability to choose one thought over another.",
    author: "William James",
  },
  {
    quote: "Almost everything will work again if you unplug it for a few minutes, including you.",
    author: "Anne Lamott",
  },
];

export function getRandomQuote() {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}
