"use client";

import { motion } from "framer-motion";
import { UserPlus, MessageCircle, BarChart3, Sparkles } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    description:
      "Sign up in seconds and complete a brief wellness assessment to personalize your AI companion experience.",
    color: "text-brand-400",
    bg: "bg-brand-500/10",
    border: "border-brand-500/20",
  },
  {
    step: "02",
    icon: MessageCircle,
    title: "Chat with Your AI",
    description:
      "Start a conversation with your AI mental wellness companion. Share how you're feeling and get immediate support.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    step: "03",
    icon: BarChart3,
    title: "Track Your Progress",
    description:
      "Log your daily mood and emotions. Watch your wellness journey unfold through beautiful analytics.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    step: "04",
    icon: Sparkles,
    title: "Get Personalized Insights",
    description:
      "Receive AI-generated wellness recommendations, breathing exercises, and mindfulness practices tailored to you.",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-dark-50 mb-4">
            How It <span className="gradient-text-blue">Works</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Getting started with your mental wellness journey takes less than 2
            minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-brand-500/20 via-purple-500/40 to-green-500/20" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="relative inline-block mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl ${step.bg} border ${step.border} flex items-center justify-center mx-auto`}
                >
                  <step.icon className={`w-7 h-7 ${step.color}`} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-dark-900 border border-dark-700 flex items-center justify-center">
                  <span className="text-xs font-bold text-dark-400">
                    {step.step}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-dark-100 mb-2">{step.title}</h3>
              <p className="text-sm text-dark-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
