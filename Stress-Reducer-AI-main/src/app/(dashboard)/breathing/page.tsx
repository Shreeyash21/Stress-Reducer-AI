"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopBar } from "@/components/dashboard/TopBar";
import { Button } from "@/components/ui/Button";
import { Wind, Play, Pause, RotateCcw, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type ExerciseType = "4-7-8" | "box" | "coherent" | "2-1-4-1";

interface Exercise {
  id: ExerciseType;
  name: string;
  description: string;
  phases: { name: string; duration: number; color: string }[];
  benefits: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  color: string;
}

const exercises: Exercise[] = [
  {
    id: "4-7-8",
    name: "4-7-8 Breathing",
    description: "A powerful relaxation technique that activates the parasympathetic nervous system.",
    phases: [
      { name: "Inhale", duration: 4, color: "#6366f1" },
      { name: "Hold", duration: 7, color: "#a855f7" },
      { name: "Exhale", duration: 8, color: "#06b6d4" },
    ],
    benefits: ["Reduces anxiety", "Improves sleep", "Lowers heart rate", "Calms the mind"],
    difficulty: "Beginner",
    color: "from-brand-500/20 to-purple-500/10",
  },
  {
    id: "box",
    name: "Box Breathing",
    description: "Used by Navy SEALs to stay calm under pressure. Equal phases create balance.",
    phases: [
      { name: "Inhale", duration: 4, color: "#6366f1" },
      { name: "Hold", duration: 4, color: "#a855f7" },
      { name: "Exhale", duration: 4, color: "#06b6d4" },
      { name: "Hold", duration: 4, color: "#22c55e" },
    ],
    benefits: ["Reduces stress", "Improves focus", "Regulates emotions", "Enhances performance"],
    difficulty: "Beginner",
    color: "from-cyan-500/20 to-blue-500/10",
  },
  {
    id: "coherent",
    name: "Coherent Breathing",
    description: "5 breaths per minute to achieve heart rate variability coherence.",
    phases: [
      { name: "Inhale", duration: 6, color: "#6366f1" },
      { name: "Exhale", duration: 6, color: "#06b6d4" },
    ],
    benefits: ["Heart coherence", "Reduces blood pressure", "Emotional balance", "Deep relaxation"],
    difficulty: "Intermediate",
    color: "from-green-500/20 to-teal-500/10",
  },
  {
    id: "2-1-4-1",
    name: "2-1-4-1 Breathing",
    description: "A quick stress relief technique perfect for moments of acute anxiety.",
    phases: [
      { name: "Inhale", duration: 2, color: "#6366f1" },
      { name: "Hold", duration: 1, color: "#a855f7" },
      { name: "Exhale", duration: 4, color: "#06b6d4" },
      { name: "Hold", duration: 1, color: "#22c55e" },
    ],
    benefits: ["Quick stress relief", "Easy to remember", "Works anywhere", "Instant calm"],
    difficulty: "Beginner",
    color: "from-orange-500/20 to-yellow-500/10",
  },
];

export default function BreathingPage() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise>(exercises[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercises[0].phases[0].duration);
  const [cycles, setCycles] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [targetCycles] = useState(4);

  const currentPhase = selectedExercise.phases[currentPhaseIndex];

  const reset = useCallback(() => {
    setIsActive(false);
    setCurrentPhaseIndex(0);
    setTimeLeft(selectedExercise.phases[0].duration);
    setCycles(0);
    setCompleted(false);
  }, [selectedExercise]);

  useEffect(() => {
    reset();
  }, [selectedExercise, reset]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const nextIndex = (currentPhaseIndex + 1) % selectedExercise.phases.length;
          setCurrentPhaseIndex(nextIndex);

          if (nextIndex === 0) {
            const newCycles = cycles + 1;
            setCycles(newCycles);
            if (newCycles >= targetCycles) {
              setIsActive(false);
              setCompleted(true);
              return selectedExercise.phases[0].duration;
            }
          }

          return selectedExercise.phases[nextIndex].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, currentPhaseIndex, cycles, selectedExercise, targetCycles]);

  const progress = 1 - timeLeft / currentPhase.duration;
  const totalDuration = selectedExercise.phases.reduce((sum, p) => sum + p.duration, 0);
  const cycleProgress = (cycles / targetCycles) * 100;

  const getCircleScale = () => {
    if (currentPhase.name === "Inhale") return 1 + progress * 0.5;
    if (currentPhase.name === "Exhale") return 1.5 - progress * 0.5;
    return currentPhase.name === "Hold" && currentPhaseIndex === 1 ? 1.5 : 1;
  };

  return (
    <div className="min-h-screen">
      <TopBar title="Breathing Exercises" subtitle="Calm your mind, restore balance" />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Exercise selector */}
          <div className="space-y-3">
            <h3 className="font-semibold text-dark-200 text-sm mb-3">Choose Exercise</h3>
            {exercises.map((ex) => (
              <motion.button
                key={ex.id}
                onClick={() => setSelectedExercise(ex)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all",
                  selectedExercise.id === ex.id
                    ? "border-brand-500/40 bg-brand-500/10"
                    : "border-dark-700/50 bg-dark-800/30 hover:border-dark-600"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-dark-100 text-sm">{ex.name}</span>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    ex.difficulty === "Beginner" ? "bg-green-500/10 text-green-400" :
                    ex.difficulty === "Intermediate" ? "bg-yellow-500/10 text-yellow-400" :
                    "bg-red-500/10 text-red-400"
                  )}>
                    {ex.difficulty}
                  </span>
                </div>
                <p className="text-xs text-dark-500 line-clamp-2">{ex.description}</p>
                <p className="text-xs text-dark-600 mt-1">
                  {ex.phases.map((p) => `${p.duration}s`).join(" - ")} • {totalDuration}s/cycle
                </p>
              </motion.button>
            ))}
          </div>

          {/* Main breathing interface */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 text-center">
              {completed ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-8"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark-50 mb-2">
                    Session Complete! 🎉
                  </h3>
                  <p className="text-dark-400 mb-2">
                    You completed {cycles} cycles of {selectedExercise.name}
                  </p>
                  <p className="text-dark-500 text-sm mb-6">
                    Total time: {Math.round((cycles * totalDuration) / 60)} minutes
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button onClick={reset} variant="secondary">
                      <RotateCcw className="w-4 h-4" />
                      Try Again
                    </Button>
                    <Button onClick={() => { reset(); setSelectedExercise(exercises[(exercises.indexOf(selectedExercise) + 1) % exercises.length]); }}>
                      Next Exercise
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-dark-100 mb-1">{selectedExercise.name}</h2>
                  <p className="text-dark-500 text-sm mb-8">{selectedExercise.description}</p>

                  {/* Breathing circle */}
                  <div className="relative w-48 h-48 mx-auto mb-8">
                    {/* Outer ring */}
                    <div
                      className="absolute inset-0 rounded-full border-2 opacity-20"
                      style={{ borderColor: currentPhase.color }}
                    />

                    {/* Progress ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50" cy="50" r="48"
                        fill="none"
                        stroke={currentPhase.color}
                        strokeWidth="2"
                        strokeOpacity="0.3"
                        strokeDasharray={`${2 * Math.PI * 48}`}
                        strokeDashoffset={`${2 * Math.PI * 48 * (1 - progress)}`}
                        className="transition-all duration-1000"
                      />
                    </svg>

                    {/* Animated circle */}
                    <motion.div
                      animate={{ scale: isActive ? getCircleScale() : 1 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-4 rounded-full flex items-center justify-center"
                      style={{
                        background: `radial-gradient(circle, ${currentPhase.color}30 0%, ${currentPhase.color}10 70%)`,
                        border: `1px solid ${currentPhase.color}40`,
                      }}
                    >
                      <div className="text-center">
                        <span className="text-4xl font-bold text-dark-100">{timeLeft}</span>
                        <p className="text-xs mt-1" style={{ color: currentPhase.color }}>
                          {isActive ? currentPhase.name : "Ready"}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Phase indicators */}
                  <div className="flex justify-center gap-3 mb-6">
                    {selectedExercise.phases.map((phase, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all",
                          isActive && i === currentPhaseIndex
                            ? "bg-dark-800 border border-dark-600"
                            : "opacity-40"
                        )}
                      >
                        <div className="w-2 h-2 rounded-full" style={{ background: phase.color }} />
                        <span className="text-xs text-dark-400">{phase.name}</span>
                        <span className="text-xs font-medium text-dark-300">{phase.duration}s</span>
                      </div>
                    ))}
                  </div>

                  {/* Cycle progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-dark-500 mb-1">
                      <span>Progress</span>
                      <span>{cycles}/{targetCycles} cycles</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div
                        className="progress-fill"
                        animate={{ width: `${cycleProgress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex justify-center gap-3">
                    <Button
                      onClick={() => setIsActive(!isActive)}
                      size="lg"
                    >
                      {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      {isActive ? "Pause" : "Start"}
                    </Button>
                    {(isActive || cycles > 0) && (
                      <Button variant="secondary" size="lg" onClick={reset}>
                        <RotateCcw className="w-5 h-5" />
                        Reset
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-5 mt-4"
            >
              <h4 className="font-semibold text-dark-200 text-sm mb-3 flex items-center gap-2">
                <Wind className="w-4 h-4 text-cyan-400" />
                Benefits of {selectedExercise.name}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedExercise.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 text-xs text-dark-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
