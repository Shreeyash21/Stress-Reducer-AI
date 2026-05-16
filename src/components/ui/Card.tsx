"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
  animate?: boolean;
  delay?: number;
}

export function Card({
  children,
  className,
  hover = false,
  glow = false,
  onClick,
  animate = true,
  delay = 0,
}: CardProps) {
  const Component = animate ? motion.div : "div";

  const animateProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay },
        whileHover: hover ? { y: -4, scale: 1.01 } : undefined,
      }
    : {};

  return (
    <Component
      className={cn(
        "glass-card p-6",
        hover && "cursor-pointer card-hover",
        glow && "pulse-glow",
        className
      )}
      onClick={onClick}
      {...animateProps}
    >
      {children}
    </Component>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function CardHeader({
  title,
  subtitle,
  icon,
  action,
  className,
}: CardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between mb-4", className)}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-dark-50">{title}</h3>
          {subtitle && (
            <p className="text-sm text-dark-400 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  color?: string;
  className?: string;
  delay?: number;
}

export function StatCard({
  label,
  value,
  change,
  icon,
  color = "brand",
  className,
  delay = 0,
}: StatCardProps) {
  const colorMap: Record<string, string> = {
    brand: "from-brand-500/20 to-brand-600/10 border-brand-500/20",
    purple: "from-purple-500/20 to-purple-600/10 border-purple-500/20",
    cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/20",
    green: "from-green-500/20 to-green-600/10 border-green-500/20",
    orange: "from-orange-500/20 to-orange-600/10 border-orange-500/20",
    red: "from-red-500/20 to-red-600/10 border-red-500/20",
  };

  const iconColorMap: Record<string, string> = {
    brand: "text-brand-400",
    purple: "text-purple-400",
    cyan: "text-cyan-400",
    green: "text-green-400",
    orange: "text-orange-400",
    red: "text-red-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className={cn(
        "glass-card p-5 bg-gradient-to-br",
        colorMap[color] || colorMap.brand,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-dark-400 mb-1">{label}</p>
          <p className="text-2xl font-bold text-dark-50">{value}</p>
          {change !== undefined && (
            <p
              className={cn(
                "text-xs mt-1 font-medium",
                change >= 0 ? "text-green-400" : "text-red-400"
              )}
            >
              {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% vs last week
            </p>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              iconColorMap[color] || iconColorMap.brand
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}
