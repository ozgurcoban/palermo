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
        const isMobile = window.innerWidth < 1024;

        if (isMobile) {
          // Get actual heights of fixed elements
          const navbar = (document.querySelector('header nav') || 
                        document.querySelector('[role="navigation"]:not([aria-label="Mobile navigation"])')) as HTMLElement;
          const bottomBar = document.querySelector('[aria-label="Mobile navigation"]') as HTMLElement;
          
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          const bottomBarHeight = bottomBar ? bottomBar.offsetHeight + 16 : 120; // +16 for bottom-4 spacing
          
          // Get menu position
          const menuRect = menu.getBoundingClientRect();
          const menuTop = menuRect.top + window.scrollY;
          
          // Calculate available viewport space
          const viewportHeight = window.innerHeight;
          const availableHeight = viewportHeight - navbarHeight - bottomBarHeight;
          
          // Scroll so menu top is right after navbar
          const scrollTarget = menuTop - navbarHeight - 10; // 10px gap
          
          console.log("Dynamic scroll calculation:", {
            navbarHeight,
            bottomBarHeight,
            viewportHeight,
            availableHeight,
            menuTop,
            scrollTarget,
            menuHeight: menuRect.height
          });

          window.scrollTo({
            top: scrollTarget,
            behavior: "smooth",
          });
        } else {
          // Desktop: original behavior
          menu.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });

          setTimeout(() => {
            window.scrollBy({ top: -100, behavior: "smooth" });
          }, 500);
        }
      }
    }, delay);
  };

  return (
    <Button
      className="group flex items-center gap-2 bg-secondary transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      onClick={scrollToMenu}
      size="lg"
      type="button"
      aria-label="Scroll to menu section"
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
