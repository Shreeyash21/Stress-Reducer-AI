"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ParticleField } from "./ParticleField";
import { Button } from "@/components/ui/Button";
import { Brain, Sparkles, ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient" />

      {/* Radial glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-3xl" />

      {/* Particle field */}
      <ParticleField />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-500/30 text-sm text-brand-300 mb-8"
        >
          <Sparkles className="w-4 h-4 text-neon-blue" />
          <span>AI-Powered Mental Wellness Platform</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6"
        >
          <span className="text-dark-50">Your AI Companion</span>
          <br />
          <span className="gradient-text">for Mental Wellness</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Reduce stress, track your emotional wellness, and get personalized
          AI-powered guidance. Your journey to mental clarity starts here.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/auth/signup">
            <Button size="xl" className="group">
              <Brain className="w-5 h-5" />
              Start Your Wellness Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="#demo">
            <Button variant="secondary" size="xl">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: "50K+", label: "Active Users" },
            { value: "94%", label: "Stress Reduction" },
            { value: "4.9★", label: "User Rating" },
            { value: "24/7", label: "AI Support" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="glass rounded-2xl p-4 text-center"
            >
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-dark-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating AI orb */}
      <motion.div
        className="absolute right-10 top-1/3 hidden xl:block"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-500/30 to-neon-purple/30 border border-brand-500/20 backdrop-blur-xl flex items-center justify-center pulse-glow">
          <Brain className="w-14 h-14 text-brand-300" />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-dark-600 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-brand-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
