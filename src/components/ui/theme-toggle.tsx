"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { trackThemeToggle } from "@/lib/gtag";

/**
 * A sleek dark-/light-mode toggle using CSS animations + Tailwind + lucide-react.
 *
 * Drop this component anywhere in your layout. It relies on `next-themes`
 * for theme management but works with any boolean `isDark` flag.
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  const handleClick = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const currentTheme = isDark ? "dark" : "light";
    const newTheme = isDark ? "light" : "dark";
    
    // Track theme toggle
    trackThemeToggle(currentTheme, newTheme);
    
    // Check if browser supports View Transitions API
    if (!document.startViewTransition) {
      setTheme(newTheme);
      setTimeout(() => setIsAnimating(false), 300);
      return;
    }

    // Use View Transitions API for smooth transition
    await document.startViewTransition(() => {
      setTheme(newTheme);
    }).finished;
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle theme"
      className="theme-toggle relative h-11 w-11 overflow-hidden rounded-full bg-transparent transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/30"
    >
      {/* Background ripple */}
      <span 
        className={`theme-toggle-ripple absolute inset-0 rounded-full bg-primary/40 ${isAnimating ? 'animate-ripple' : ''}`}
      />

      {/* Icon wrapper */}
      <div className="relative h-full w-full">
        <div className={`theme-icon-wrapper absolute inset-0 flex items-center justify-center transition-all duration-300 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
          <Sun className="size-6" strokeWidth={1.5} />
        </div>
        <div className={`theme-icon-wrapper absolute inset-0 flex items-center justify-center transition-all duration-300 ${!isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
          <Moon className="size-6" strokeWidth={1.5} />
        </div>
      </div>
    </button>
  );
}
