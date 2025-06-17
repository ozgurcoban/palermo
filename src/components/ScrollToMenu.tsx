"use client";

import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import { trackHomeHeroMenuClick } from "@/lib/gtag";
import { useScrollToElement } from "@/hooks/useScrollToElement";
import { useState, useEffect } from "react";

const ScrollToMenu = ({ children }: { children: React.ReactNode }) => {
  const scrollToElement = useScrollToElement();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Track the click event safely
    try {
      trackHomeHeroMenuClick();
    } catch (error) {
      // Silently ignore tracking errors
    }

    scrollToElement({
      elementId: "menu",
      mobileOffset: 10,
      desktopBehavior: "offset",
      desktopOffset: 100,
    });
  };

  return (
    <Button
      className="group flex items-center gap-2 bg-secondary transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      onClick={scrollToMenu}
      size="lg"
      type="button"
      aria-label="Scroll to menu section"
      disabled={!mounted}
    >
      <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
      <span>{children}</span>
    </Button>
  );
};

export default ScrollToMenu;

// <button className="rounded-md bg-[hsl(24,30%,70%)] px-6 py-2 text-black transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//   Visa meny
// </button>;
