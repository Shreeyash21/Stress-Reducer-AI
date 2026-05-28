// User & Auth Types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  stress_baseline: number;
  wellness_goals: string[];
  notification_preferences: NotificationPreferences;
  created_at: string;
  updated_at: string;
}

export interface NotificationPreferences {
  daily_checkin: boolean;
  meditation_reminders: boolean;
  weekly_report: boolean;
  emergency_alerts: boolean;
}

// Mood & Wellness Types
export type MoodLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type StressLevel = "low" | "moderate" | "high" | "critical";
export type EmotionType =
  | "happy"
  | "calm"
  | "anxious"
  | "sad"
  | "angry"
  | "neutral"
  | "excited"
  | "tired";

export interface MoodEntry {
  id: string;
  user_id: string;
  mood_score: MoodLevel;
  stress_level: StressLevel;
  emotion: EmotionType;
  notes?: string;
  activities: string[];
  ai_insights?: string;
  created_at: string;
}

export interface WellnessStats {
  average_mood: number;
  average_stress: number;
  total_sessions: number;
  streak_days: number;
  improvement_percentage: number;
  top_emotions: { emotion: EmotionType; count: number }[];
  weekly_trend: { date: string; mood: number; stress: number }[];
  monthly_trend: { date: string; mood: number; stress: number }[];
}

// Chat Types
export interface ChatMessage {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  emotion_detected?: EmotionType;
  created_at: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  summary?: string;
  message_count: number;
  last_message?: string;
  created_at: string;
  updated_at: string;
}

// Journal Types
export interface JournalEntry {
  id: string;
  user_id: string;
  title: string;
  content: string;
  mood_score?: MoodLevel;
  tags: string[];
  ai_analysis?: string;
  created_at: string;
  updated_at: string;
}

// Wellness Activity Types
export interface WellnessActivity {
  id: string;
  type: "breathing" | "meditation" | "journaling" | "exercise" | "gratitude";
  title: string;
  description: string;
  duration_minutes: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  benefits: string[];
  instructions: string[];
}

// Analytics Types
export interface AnalyticsData {
  period: "week" | "month" | "year";
  mood_data: { date: string; value: number }[];
  stress_data: { date: string; value: number }[];
  emotion_distribution: { name: string; value: number; color: string }[];
  activity_completion: { activity: string; completed: number; total: number }[];
  insights: string[];
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ChatApiRequest {
  message: string;
  conversation_id?: string;
  context?: ChatMessage[];
}

export interface ChatApiResponse {
  message: string;
  conversation_id: string;
  emotion_detected?: EmotionType;
  suggestions?: string[];
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: number;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  emotion_improvement: number;
}

// Feature Types
export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}
