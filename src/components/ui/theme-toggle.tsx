"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { trackThemeToggle } from "@/lib/gtag";

/**
 * A sleek dark-/light-mode toggle using Framer Motion + Tailwind + lucide-react.
 *
 * Drop this component anywhere in your layout. It relies on `next-themes`
 * for theme management but works with any boolean `isDark` flag.
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  const handleClick = async () => {
    const currentTheme = isDark ? "dark" : "light";
    const newTheme = isDark ? "light" : "dark";
    
    // Track theme toggle
    trackThemeToggle(currentTheme, newTheme);
    
    // Check if browser supports View Transitions API
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    // Use View Transitions API for smooth transition
    await document.startViewTransition(() => {
      setTheme(newTheme);
    }).finished;
  };

  return (
    <motion.button
      onClick={handleClick}
      aria-label="Toggle theme"
      className="relative h-11 w-11 overflow-hidden rounded-full bg-transparent transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/30"
      whileTap={{ scale: 0.9, rotate: 15 }}
    >
      {/* Background ripple — scales up + fades */}
      <motion.span
        key={isDark ? "ripple-dark" : "ripple-light"}
        initial={{ scale: 0, opacity: 0.15 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 rounded-full bg-primary/40"
      />

      {/* Icon wrapper */}
      <AnimatePresence mode="popLayout" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex h-full w-full items-center justify-center"
          >
            <Sun className="size-6" strokeWidth={1.5} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex h-full w-full items-center justify-center"
          >
            <Moon className="size-6" strokeWidth={1.5} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
