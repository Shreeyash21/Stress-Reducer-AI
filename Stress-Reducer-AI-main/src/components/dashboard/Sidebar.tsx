"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  LayoutDashboard,
  MessageCircle,
  BarChart3,
  BookOpen,
  Wind,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppStore } from "@/store/useAppStore";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "AI Chat", href: "/chat", icon: MessageCircle, badge: "AI" },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Journal", href: "/journal", icon: BookOpen },
  { label: "Breathing", href: "/breathing", icon: Wind },
  { label: "Wellness", href: "/wellness", icon: Heart },
];

const bottomItems = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, sidebarOpen, setSidebarOpen } = useAppStore();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await authService.signOut();
    toast.success("Signed out successfully");
    router.push("/");
    setSigningOut(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 72 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed left-0 top-0 h-full z-30 flex flex-col",
          "glass border-r border-dark-800/50",
          "lg:relative lg:z-auto"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 border-b border-dark-800/50 h-16">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-neon-purple flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-bold text-dark-50 whitespace-nowrap overflow-hidden"
              >
                Stress Reducer <span className="gradient-text">AI</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-dark-400 hover:text-dark-200 transition-colors z-10"
        >
          {sidebarOpen ? (
            <ChevronLeft className="w-3 h-3" />
          ) : (
            <ChevronRight className="w-3 h-3" />
          )}
        </button>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "sidebar-item",
                  isActive && "active",
                  !sidebarOpen && "justify-center px-2"
                )}
                title={!sidebarOpen ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap overflow-hidden flex-1"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.badge && sidebarOpen && (
                  <span className="text-xs px-1.5 py-0.5 rounded-md bg-brand-500/20 text-brand-300 font-medium">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* AI Status */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-3 mb-3 p-3 rounded-xl bg-gradient-to-r from-brand-500/10 to-purple-500/10 border border-brand-500/20"
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span className="text-xs font-medium text-brand-300">AI Active</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse ml-auto" />
            </div>
            <p className="text-xs text-dark-500">Your companion is ready</p>
          </motion.div>
        )}

        {/* Bottom items */}
        <div className="p-3 border-t border-dark-800/50 space-y-1">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "sidebar-item",
                  isActive && "active",
                  !sidebarOpen && "justify-center px-2"
                )}
                title={!sidebarOpen ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}

          {/* User info */}
          {sidebarOpen && user && (
            <div className="flex items-center gap-2 px-3 py-2 mt-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-neon-purple flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-dark-200 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className={cn(
              "sidebar-item w-full text-red-400/70 hover:text-red-400 hover:bg-red-500/10",
              !sidebarOpen && "justify-center px-2"
            )}
            title={!sidebarOpen ? "Sign Out" : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  {signingOut ? "Signing out..." : "Sign Out"}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>
    </>
  );
}
