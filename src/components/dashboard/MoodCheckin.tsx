"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { moodService } from "@/services/mood.service";
import { useAppStore } from "@/store/useAppStore";
import type { MoodLevel, StressLevel, EmotionType } from "@/types";
import { getMoodEmoji, getMoodLabel, cn } from "@/lib/utils";
import toast from "react-hot-toast";

const emotions: { value: EmotionType; emoji: string; label: string }[] = [
  { value: "happy", emoji: "😊", label: "Happy" },
  { value: "calm", emoji: "😌", label: "Calm" },
  { value: "anxious", emoji: "😰", label: "Anxious" },
  { value: "sad", emoji: "😢", label: "Sad" },
  { value: "angry", emoji: "😠", label: "Angry" },
  { value: "neutral", emoji: "😐", label: "Neutral" },
  { value: "excited", emoji: "🤩", label: "Excited" },
  { value: "tired", emoji: "😴", label: "Tired" },
];

const stressLevels: { value: StressLevel; label: string; color: string }[] = [
  { value: "low", label: "Low", color: "text-green-400 border-green-500/30 bg-green-500/10" },
  { value: "moderate", label: "Moderate", color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10" },
  { value: "high", label: "High", color: "text-orange-400 border-orange-500/30 bg-orange-500/10" },
  { value: "critical", label: "Critical", color: "text-red-400 border-red-500/30 bg-red-500/10" },
];

export function MoodCheckin() {
  const { addMoodEntry } = useAppStore();
  const [step, setStep] = useState(0);
  const [moodScore, setMoodScore] = useState<MoodLevel>(5);
  const [emotion, setEmotion] = useState<EmotionType>("neutral");
  const [stressLevel, setStressLevel] = useState<StressLevel>("moderate");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { entry, error } = await moodService.createMoodEntry({
        mood_score: moodScore,
        stress_level: stressLevel,
        emotion,
        notes: notes || undefined,
        ai_insights: generateInsight(moodScore, stressLevel, emotion),
      });

      if (error) {
        toast.error("Failed to save mood entry");
      } else if (entry) {
        addMoodEntry(entry);
        setCompleted(true);
        toast.success("Mood logged successfully! 🎉");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const generateInsight = (mood: MoodLevel, stress: StressLevel, em: EmotionType): string => {
    if (mood >= 7 && stress === "low") return "You're in a great mental space today! Keep nurturing these positive feelings.";
    if (mood <= 4 && stress === "high") return "It seems like you're going through a tough time. Consider a breathing exercise or short meditation.";
    if (em === "anxious") return "Anxiety is normal. Try the 4-7-8 breathing technique to calm your nervous system.";
    if (em === "tired") return "Rest is essential for mental wellness. Consider a short power nap or gentle stretching.";
    return "Thank you for checking in. Consistent tracking helps identify patterns in your wellness journey.";
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-6 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="font-semibold text-dark-100 mb-2">Mood Logged!</h3>
        <p className="text-dark-400 text-sm mb-4">
          {getMoodEmoji(moodScore)} You&apos;re feeling {getMoodLabel(moodScore).toLowerCase()} today.
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => { setCompleted(false); setStep(0); setNotes(""); }}
        >
          Log Again
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
          <Heart className="w-5 h-5 text-brand-400" />
        </div>
        <div>
          <h3 className="font-semibold text-dark-50">Daily Mood Check-in</h3>
          <p className="text-xs text-dark-500">Step {step + 1} of 3</p>
        </div>
        {/* Progress */}
        <div className="ml-auto flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i <= step ? "bg-brand-500 w-6" : "bg-dark-700 w-3"
              )}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <p className="text-dark-300 mb-4 text-sm">How would you rate your mood right now?</p>
            <div className="flex items-center justify-between mb-3">
              {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as MoodLevel[]).map((score) => (
                <button
                  key={score}
                  onClick={() => setMoodScore(score)}
                  className={cn(
                    "w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200",
                    moodScore === score
                      ? "bg-brand-500 text-white scale-110 shadow-neon-purple"
                      : "bg-dark-800 text-dark-400 hover:bg-dark-700"
                  )}
                >
                  {score}
                </button>
              ))}
            </div>
            <div className="text-center mb-6">
              <span className="text-3xl">{getMoodEmoji(moodScore)}</span>
              <p className="text-sm text-dark-400 mt-1">{getMoodLabel(moodScore)}</p>
            </div>
            <Button onClick={() => setStep(1)} className="w-full">
              Next
            </Button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <p className="text-dark-300 mb-4 text-sm">What emotion best describes how you feel?</p>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {emotions.map((em) => (
                <button
                  key={em.value}
                  onClick={() => setEmotion(em.value)}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200",
                    emotion === em.value
                      ? "bg-brand-500/20 border border-brand-500/40"
                      : "bg-dark-800/50 border border-transparent hover:bg-dark-700/50"
                  )}
                >
                  <span className="text-xl">{em.emoji}</span>
                  <span className="text-xs text-dark-400">{em.label}</span>
                </button>
              ))}
            </div>
            <p className="text-dark-300 mb-3 text-sm">Stress level:</p>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {stressLevels.map((sl) => (
                <button
                  key={sl.value}
                  onClick={() => setStressLevel(sl.value)}
                  className={cn(
                    "py-2 px-3 rounded-xl text-xs font-medium border transition-all",
                    stressLevel === sl.value ? sl.color : "border-dark-700 text-dark-500 bg-dark-800/50"
                  )}
                >
                  {sl.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setStep(0)} className="flex-1">Back</Button>
              <Button onClick={() => setStep(2)} className="flex-1">Next</Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <p className="text-dark-300 mb-3 text-sm">Any notes? (optional)</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What's on your mind today?"
              className="input-dark resize-none h-24 mb-4"
            />
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setStep(1)} className="flex-1">Back</Button>
              <Button onClick={handleSubmit} loading={loading} className="flex-1">
                Save Check-in
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
