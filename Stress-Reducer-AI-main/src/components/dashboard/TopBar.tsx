"use client";

import { motion } from "framer-motion";
import { Bell, Menu, Search, Sparkles } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { getRandomQuote } from "@/lib/utils";
import { useMemo } from "react";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const { setSidebarOpen, sidebarOpen, user } = useAppStore();
  const quote = useMemo(() => getRandomQuote(), []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-16 flex items-center justify-between px-6 border-b border-dark-800/50 glass sticky top-0 z-10"
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden text-dark-400 hover:text-dark-200"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-semibold text-dark-100">{title}</h1>
          {subtitle && (
            <p className="text-xs text-dark-500">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Center - Quote */}
      <div className="hidden lg:flex items-center gap-2 text-xs text-dark-500 max-w-sm">
        <Sparkles className="w-3 h-3 text-brand-400 flex-shrink-0" />
        <span className="truncate italic">&ldquo;{quote.quote}&rdquo;</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-xl glass flex items-center justify-center text-dark-400 hover:text-dark-200 transition-colors">
          <Search className="w-4 h-4" />
        </button>
        <button className="w-9 h-9 rounded-xl glass flex items-center justify-center text-dark-400 hover:text-dark-200 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500" />
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-neon-purple flex items-center justify-center text-white text-sm font-bold cursor-pointer">
          {user?.email?.charAt(0).toUpperCase() || "U"}
        </div>
      </div>
    </motion.header>
  );
}
