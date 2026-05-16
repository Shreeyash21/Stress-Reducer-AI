"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    avatar: "SC",
    content:
      "Stress Reducer AI has completely transformed how I manage work anxiety. The AI companion feels genuinely empathetic and the mood tracking helped me identify my stress triggers.",
    rating: 5,
    improvement: 78,
    color: "from-brand-500/20 to-brand-600/10",
  },
  {
    name: "Marcus Johnson",
    role: "Healthcare Professional",
    avatar: "MJ",
    content:
      "As someone who works in high-stress environments, this app has been a lifesaver. The breathing exercises and real-time AI support are incredibly effective.",
    rating: 5,
    improvement: 85,
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    name: "Priya Patel",
    role: "Graduate Student",
    avatar: "PP",
    content:
      "The wellness analytics showed me patterns I never noticed before. My anxiety has decreased significantly since I started using the daily check-ins and journaling features.",
    rating: 5,
    improvement: 92,
    color: "from-cyan-500/20 to-cyan-600/10",
  },
  {
    name: "David Kim",
    role: "Entrepreneur",
    avatar: "DK",
    content:
      "Running a startup is incredibly stressful. This AI companion provides the emotional support I need at 3am when I can't sleep. It's like having a therapist in my pocket.",
    rating: 5,
    improvement: 71,
    color: "from-green-500/20 to-green-600/10",
  },
  {
    name: "Emma Rodriguez",
    role: "Teacher",
    avatar: "ER",
    content:
      "The personalized wellness recommendations are spot-on. After 3 months, my stress levels are at an all-time low and I feel more emotionally resilient than ever.",
    rating: 5,
    improvement: 88,
    color: "from-orange-500/20 to-orange-600/10",
  },
  {
    name: "Alex Thompson",
    role: "Creative Director",
    avatar: "AT",
    content:
      "Beautiful design, powerful AI, and genuinely helpful. The mood comparison charts helped me understand my emotional cycles and plan my work accordingly.",
    rating: 5,
    improvement: 76,
    color: "from-pink-500/20 to-pink-600/10",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
            Real Stories
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-dark-50 mb-4">
            Lives{" "}
            <span className="gradient-text-purple">Transformed</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Join thousands of people who have found peace, clarity, and
            emotional balance with Stress Reducer AI.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`glass-card p-6 bg-gradient-to-br ${t.color} relative`}
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-dark-700" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-dark-300 text-sm leading-relaxed mb-6">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Improvement badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-neon-purple flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-dark-100 text-sm">
                      {t.name}
                    </p>
                    <p className="text-dark-500 text-xs">{t.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold text-sm">
                    +{t.improvement}%
                  </p>
                  <p className="text-dark-500 text-xs">wellness</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
