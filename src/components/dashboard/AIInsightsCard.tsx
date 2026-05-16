"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, RefreshCw } from "lucide-react";
import { getRandomQuote } from "@/lib/utils";

const insights = [
  {
    title: "Breathing Reminder",
    content: "You've been active for a while. Take 5 deep breaths to reset your nervous system.",
    type: "breathing",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Mood Pattern",
    content: "Your mood tends to dip on Wednesday afternoons. Consider scheduling a mindfulness break.",
    type: "pattern",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    title: "Wellness Tip",
    content: "Consistent sleep schedules can reduce anxiety by up to 40%. Try going to bed at the same time tonight.",
    type: "tip",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    title: "Gratitude Practice",
    content: "Write down 3 things you're grateful for today. This simple practice rewires your brain for positivity.",
    type: "gratitude",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    title: "Movement Break",
    content: "A 10-minute walk can boost your mood by 20%. Step outside and get some fresh air.",
    type: "movement",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

export function AIInsightsCard() {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [quote, setQuote] = useState(getRandomQuote());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const insight = insights[currentInsight];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-brand-400" />
          </div>
          <span className="font-semibold text-dark-100 text-sm">AI Insights</span>
        </div>
        <button
          onClick={() => {
            setCurrentInsight((prev) => (prev + 1) % insights.length);
            setQuote(getRandomQuote());
          }}
          className="text-dark-500 hover:text-dark-300 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <motion.div
        key={currentInsight}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-3 rounded-xl ${insight.bg} mb-4`}
      >
        <p className={`text-xs font-semibold mb-1 ${insight.color}`}>
          {insight.title}
        </p>
        <p className="text-xs text-dark-300 leading-relaxed">{insight.content}</p>
      </motion.div>

      {/* Quote */}
      <div className="border-t border-dark-800/50 pt-3">
        <p className="text-xs text-dark-500 italic leading-relaxed">
          &ldquo;{quote.quote}&rdquo;
        </p>
        <p className="text-xs text-dark-600 mt-1">— {quote.author}</p>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1 mt-3">
        {insights.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentInsight(i)}
            className={`h-1 rounded-full transition-all ${
              i === currentInsight ? "w-4 bg-brand-500" : "w-1.5 bg-dark-700"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
