"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "neon";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-gradient-to-r from-brand-500 to-neon-purple text-white hover:from-brand-600 hover:to-purple-700 shadow-lg hover:shadow-neon-purple",
      secondary:
        "bg-brand-500/10 text-brand-300 border border-brand-500/30 hover:bg-brand-500/20 hover:border-brand-500/50",
      ghost:
        "text-dark-300 hover:text-dark-100 hover:bg-dark-800/50",
      danger:
        "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20",
      neon:
        "bg-transparent text-neon-blue border border-neon-blue/50 hover:bg-neon-blue/10 hover:border-neon-blue shadow-neon-blue",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
      md: "px-4 py-2.5 text-sm rounded-xl gap-2",
      lg: "px-6 py-3 text-base rounded-xl gap-2",
      xl: "px-8 py-4 text-lg rounded-2xl gap-3",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {loading ? (
          <>
            <span className="spinner w-4 h-4" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && icon}
            {children}
            {icon && iconPosition === "right" && icon}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
