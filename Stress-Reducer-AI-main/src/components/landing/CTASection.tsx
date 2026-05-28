"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Brain, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/50 via-purple-950/30 to-brand-950/50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-12 border border-brand-500/20"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-brand-500 to-neon-purple flex items-center justify-center mb-6 pulse-glow">
            <Brain className="w-8 h-8 text-white" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-4">
              <Sparkles className="w-3 h-3" />
              Start Free Today
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-dark-50 mb-4">
              Begin Your{" "}
              <span className="gradient-text">Wellness Journey</span>
            </h2>
            <p className="text-dark-400 text-lg mb-8 max-w-xl mx-auto">
              Join 50,000+ people who have transformed their mental wellness
              with AI-powered support. No credit card required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup">
                <Button size="xl" className="group">
                  Get Started for Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="secondary" size="xl">
                  Sign In to Your Account
                </Button>
              </Link>
            </div>

            <p className="text-dark-500 text-sm mt-6">
              Free forever plan available • No credit card required • Cancel anytime
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
