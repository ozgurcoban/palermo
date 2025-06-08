"use client";

import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import { trackHomeHeroMenuClick } from "@/lib/gtag";

const ScrollToMenu = ({ children }: { children: React.ReactNode }) => {

  const scrollToMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Track the click event safely
    try {
      trackHomeHeroMenuClick();
    } catch (error) {
      // Silently ignore tracking errors
    }

    // Small delay to ensure element is rendered
    const delay = 100;

    setTimeout(() => {
      const menu = document.getElementById("menu");
      if (menu) {
        const navbarHeight = 132; // Height of navbar
        const menuPosition = menu.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = menuPosition - navbarHeight + 110; // Changed from -20 to +30 for 50px lower

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, delay);
  };

  return (
    <Button
      className="relative flex items-center gap-1 bg-secondary transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      onClick={scrollToMenu}
      type="button"
      aria-label="Scroll to menu section"
    >
      <div className="pointer-events-none animate-bounce-subtle">
        <ArrowDown className="size-4" />
      </div>
      <span className="pointer-events-none">{children}</span>
    </Button>
  );
};

export default ScrollToMenu;

// <button className="rounded-md bg-[hsl(24,30%,70%)] px-6 py-2 text-black transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//   Visa meny
// </button>;
