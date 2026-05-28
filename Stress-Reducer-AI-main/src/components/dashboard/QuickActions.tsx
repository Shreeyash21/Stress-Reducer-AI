"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, BookOpen, BarChart3, Wind } from "lucide-react";

const actions = [
  {
    label: "Chat with AI",
    href: "/chat",
    icon: MessageCircle,
    color: "text-brand-400",
    bg: "bg-brand-500/10 hover:bg-brand-500/20 border-brand-500/20",
  },
  {
    label: "Write Journal",
    href: "/journal",
    icon: BookOpen,
    color: "text-purple-400",
    bg: "bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20",
  },
  {
    label: "View Analytics",
    href: "/analytics",
    icon: BarChart3,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/20",
  },
  {
    label: "Breathing",
    href: "/breathing",
    icon: Wind,
    color: "text-green-400",
    bg: "bg-green-500/10 hover:bg-green-500/20 border-green-500/20",
  },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-5"
    >
      <h3 className="font-semibold text-dark-100 text-sm mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${action.bg}`}
          >
            <action.icon className={`w-5 h-5 ${action.color}`} />
            <span className="text-xs text-dark-300 text-center">{action.label}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
