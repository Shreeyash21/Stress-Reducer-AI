"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/dashboard/TopBar";
import { Heart, Star, Phone, ExternalLink, Sparkles, Sun, Moon, Coffee } from "lucide-react";
import { getRandomQuote, motivationalQuotes } from "@/lib/utils";

const emergencyResources = [
  {
    name: "988 Suicide & Crisis Lifeline",
    description: "Call or text 988 for immediate mental health crisis support",
    contact: "988",
    type: "call",
    urgent: true,
  },
  {
    name: "Crisis Text Line",
    description: "Text HOME to 741741 for free crisis counseling",
    contact: "741741",
    type: "text",
    urgent: true,
  },
  {
    name: "SAMHSA Helpline",
    description: "Free, confidential treatment referral service",
    contact: "1-800-662-4357",
    type: "call",
    urgent: false,
  },
  {
    name: "NAMI Helpline",
    description: "National Alliance on Mental Illness support line",
    contact: "1-800-950-6264",
    type: "call",
    urgent: false,
  },
];

const dailyPractices = [
  {
    time: "Morning",
    icon: Sun,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    practices: [
      "5-minute gratitude journaling",
      "10 deep breaths before checking phone",
      "Set a positive intention for the day",
      "Drink a glass of water mindfully",
    ],
  },
  {
    time: "Afternoon",
    icon: Coffee,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    practices: [
      "2-minute breathing break",
      "Take a short walk outside",
      "Check in with your emotions",
      "Connect with a friend or colleague",
    ],
  },
  {
    time: "Evening",
    icon: Moon,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    practices: [
      "Reflect on 3 good things today",
      "Digital detox 1 hour before bed",
      "Progressive muscle relaxation",
      "Write tomorrow's priorities",
    ],
  },
];

const wellnessTips = [
  {
    category: "Sleep",
    tip: "Maintain a consistent sleep schedule. Your brain thrives on routine.",
    icon: "😴",
    color: "text-purple-400",
  },
  {
    category: "Movement",
    tip: "Even 10 minutes of walking can boost mood by 20% and reduce anxiety.",
    icon: "🚶",
    color: "text-green-400",
  },
  {
    category: "Nutrition",
    tip: "Omega-3 fatty acids found in fish and walnuts support brain health.",
    icon: "🥗",
    color: "text-cyan-400",
  },
  {
    category: "Connection",
    tip: "Strong social connections are the #1 predictor of long-term happiness.",
    icon: "🤝",
    color: "text-pink-400",
  },
  {
    category: "Mindfulness",
    tip: "Just 8 weeks of daily meditation can physically change brain structure.",
    icon: "🧘",
    color: "text-brand-400",
  },
  {
    category: "Gratitude",
    tip: "Writing 3 gratitudes daily rewires your brain toward positivity in 21 days.",
    icon: "🙏",
    color: "text-yellow-400",
  },
];

export default function WellnessPage() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  return (
    <div className="min-h-screen">
      <TopBar title="Wellness Hub" subtitle="Resources, tips & emergency support" />

      <div className="p-6 space-y-6">
        {/* Motivational Quote Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 bg-gradient-to-r from-brand-500/10 to-purple-500/5 text-center"
        >
          <Sparkles className="w-6 h-6 text-brand-400 mx-auto mb-3" />
          <motion.blockquote
            key={currentQuoteIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-medium text-dark-100 italic mb-3 max-w-2xl mx-auto"
          >
            &ldquo;{motivationalQuotes[currentQuoteIndex].quote}&rdquo;
          </motion.blockquote>
          <p className="text-dark-500 text-sm mb-4">— {motivationalQuotes[currentQuoteIndex].author}</p>
          <div className="flex justify-center gap-2">
            {motivationalQuotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQuoteIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentQuoteIndex ? "w-6 bg-brand-500" : "w-1.5 bg-dark-700"
                }`}
              />
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Emergency Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-100">Emergency Support</h3>
                <p className="text-xs text-dark-500">Available 24/7 — You are not alone</p>
              </div>
            </div>

            <div className="space-y-3">
              {emergencyResources.map((resource) => (
                <div
                  key={resource.name}
                  className={`p-3 rounded-xl border ${
                    resource.urgent
                      ? "border-red-500/20 bg-red-500/5"
                      : "border-dark-700/50 bg-dark-800/30"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-dark-100 text-sm">{resource.name}</p>
                        {resource.urgent && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-dark-500 mt-0.5">{resource.description}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-3">
                      <span className="text-sm font-bold text-dark-200">{resource.contact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Daily Wellness Practices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-100">Daily Wellness Routine</h3>
                <p className="text-xs text-dark-500">Build healthy habits for lasting wellness</p>
              </div>
            </div>

            <div className="space-y-4">
              {dailyPractices.map((period) => (
                <div key={period.time}>
                  <div className={`flex items-center gap-2 mb-2`}>
                    <period.icon className={`w-4 h-4 ${period.color}`} />
                    <span className="text-sm font-medium text-dark-200">{period.time}</span>
                  </div>
                  <div className="space-y-1 pl-6">
                    {period.practices.map((practice) => (
                      <div key={practice} className="flex items-center gap-2 text-xs text-dark-400">
                        <div className="w-1 h-1 rounded-full bg-dark-600" />
                        {practice}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Wellness Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-dark-100">Science-Backed Wellness Tips</h3>
              <p className="text-xs text-dark-500">Evidence-based practices for mental health</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wellnessTips.map((tip, i) => (
              <motion.div
                key={tip.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="p-4 rounded-xl bg-dark-800/30 border border-dark-700/50 hover:border-dark-600 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{tip.icon}</span>
                  <span className={`text-xs font-semibold ${tip.color}`}>{tip.category}</span>
                </div>
                <p className="text-xs text-dark-400 leading-relaxed">{tip.tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <div className="text-center text-xs text-dark-600 pb-4">
          <p>
            Stress Reducer AI is a wellness support tool and is not a substitute for professional mental health care.
            If you&apos;re in crisis, please contact emergency services or a mental health professional immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
