"use client";

import { motion } from "framer-motion";
import {
  Brain,
  BarChart3,
  MessageCircle,
  Wind,
  BookOpen,
  Shield,
  Zap,
  Heart,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Mental Companion",
    description:
      "Intelligent AI that understands your emotional state and provides personalized mental wellness support 24/7.",
    color: "from-brand-500/20 to-brand-600/10",
    iconColor: "text-brand-400",
    borderColor: "border-brand-500/20",
  },
  {
    icon: BarChart3,
    title: "Wellness Analytics",
    description:
      "Track mood patterns, stress levels, and emotional trends with beautiful interactive charts and insights.",
    color: "from-purple-500/20 to-purple-600/10",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/20",
  },
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    description:
      "Engage in meaningful conversations with your AI companion for immediate emotional support and guidance.",
    color: "from-cyan-500/20 to-cyan-600/10",
    iconColor: "text-cyan-400",
    borderColor: "border-cyan-500/20",
  },
  {
    icon: Wind,
    title: "Breathing Exercises",
    description:
      "Guided breathing techniques and mindfulness exercises to instantly reduce stress and anxiety.",
    color: "from-green-500/20 to-green-600/10",
    iconColor: "text-green-400",
    borderColor: "border-green-500/20",
  },
  {
    icon: BookOpen,
    title: "Wellness Journal",
    description:
      "AI-powered journaling with emotion analysis, personalized insights, and progress tracking.",
    color: "from-orange-500/20 to-orange-600/10",
    iconColor: "text-orange-400",
    borderColor: "border-orange-500/20",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "End-to-end encrypted conversations and data. Your mental health journey stays completely private.",
    color: "from-pink-500/20 to-pink-600/10",
    iconColor: "text-pink-400",
    borderColor: "border-pink-500/20",
  },
  {
    icon: Zap,
    title: "Instant Insights",
    description:
      "Real-time AI emotion detection and immediate wellness recommendations tailored to your needs.",
    color: "from-yellow-500/20 to-yellow-600/10",
    iconColor: "text-yellow-400",
    borderColor: "border-yellow-500/20",
  },
  {
    icon: Heart,
    title: "Personalized Care",
    description:
      "Adaptive AI that learns your patterns and delivers increasingly personalized wellness coaching.",
    color: "from-red-500/20 to-red-600/10",
    iconColor: "text-red-400",
    borderColor: "border-red-500/20",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-4">
            Everything You Need
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-dark-50 mb-4">
            Comprehensive{" "}
            <span className="gradient-text">Wellness Features</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            A complete mental wellness ecosystem powered by advanced AI to
            support every aspect of your emotional health journey.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`glass-card p-6 bg-gradient-to-br ${feature.color} ${feature.borderColor} cursor-default`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-dark-900/50 flex items-center justify-center mb-4 ${feature.iconColor}`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-dark-50 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-dark-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
