"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

const stats = [
  {
    value: 50000,
    suffix: "+",
    label: "Active Users",
    description: "People improving their mental wellness daily",
    color: "text-brand-400",
  },
  {
    value: 94,
    suffix: "%",
    label: "Stress Reduction",
    description: "Users report significant stress reduction",
    color: "text-green-400",
  },
  {
    value: 2500000,
    suffix: "+",
    label: "AI Conversations",
    description: "Supportive conversations completed",
    color: "text-purple-400",
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    description: "Users would recommend to a friend",
    color: "text-cyan-400",
  },
];

export function WellnessStatsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/30 via-transparent to-purple-950/30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-dark-50 mb-4">
            Real <span className="gradient-text">Impact</span>, Real Results
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Our platform delivers measurable improvements in mental wellness
            backed by data.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className={`text-4xl sm:text-5xl font-bold mb-2 ${stat.color}`}>
                <CountUp end={stat.value} />
                {stat.suffix}
              </div>
              <div className="font-semibold text-dark-100 mb-1">{stat.label}</div>
              <div className="text-xs text-dark-500">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
