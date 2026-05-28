"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Play, Pause, RotateCcw } from "lucide-react";

type Phase = "inhale" | "hold" | "exhale" | "rest";

const phases: { phase: Phase; duration: number; label: string; color: string }[] = [
  { phase: "inhale", duration: 4, label: "Breathe In", color: "#6366f1" },
  { phase: "hold", duration: 7, label: "Hold", color: "#a855f7" },
  { phase: "exhale", duration: 8, label: "Breathe Out", color: "#06b6d4" },
  { phase: "rest", duration: 1, label: "Rest", color: "#22c55e" },
];

export function BreathingWidget() {
  const [isActive, setIsActive] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(phases[0].duration);
  const [cycles, setCycles] = useState(0);

  const currentPhase = phases[currentPhaseIndex];

  const reset = useCallback(() => {
    setIsActive(false);
    setCurrentPhaseIndex(0);
    setTimeLeft(phases[0].duration);
    setCycles(0);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const nextIndex = (currentPhaseIndex + 1) % phases.length;
          setCurrentPhaseIndex(nextIndex);
          if (nextIndex === 0) setCycles((c) => c + 1);
          return phases[nextIndex].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, currentPhaseIndex]);

  const progress = 1 - timeLeft / currentPhase.duration;
  const scale = currentPhase.phase === "inhale" ? 1 + progress * 0.4 : currentPhase.phase === "exhale" ? 1.4 - progress * 0.4 : 1.4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <Wind className="w-4 h-4 text-cyan-400" />
        </div>
        <span className="font-semibold text-dark-100 text-sm">4-7-8 Breathing</span>
        {cycles > 0 && (
          <span className="ml-auto text-xs text-dark-500">{cycles} cycle{cycles > 1 ? "s" : ""}</span>
        )}
      </div>

      <div className="flex flex-col items-center py-4">
        {/* Breathing circle */}
        <div className="relative w-24 h-24 mb-4">
          <motion.div
            animate={{ scale: isActive ? scale : 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${currentPhase.color}30 0%, ${currentPhase.color}10 70%)`,
              border: `2px solid ${currentPhase.color}40`,
            }}
          />
          <motion.div
            animate={{ scale: isActive ? scale * 0.7 : 0.7 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${currentPhase.color}50 0%, transparent 70%)`,
            }}
          >
            <span className="text-2xl font-bold text-dark-100">{timeLeft}</span>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={currentPhase.phase}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-sm font-medium mb-4"
            style={{ color: currentPhase.color }}
          >
            {isActive ? currentPhase.label : "Ready to breathe?"}
          </motion.p>
        </AnimatePresence>

        <div className="flex gap-2">
          <button
            onClick={() => setIsActive(!isActive)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500/20 border border-brand-500/30 text-brand-300 hover:bg-brand-500/30 transition-all text-sm font-medium"
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isActive ? "Pause" : "Start"}
          </button>
          {(isActive || cycles > 0) && (
            <button
              onClick={reset}
              className="p-2 rounded-xl bg-dark-800/50 border border-dark-700 text-dark-400 hover:text-dark-200 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
