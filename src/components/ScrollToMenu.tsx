"use client";

import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import { trackHomeHeroMenuClick } from "@/lib/gtag";
import { useScrollToElement } from "@/hooks/useScrollToElement";
import { useState, useEffect } from "react";

const ScrollToMenu = ({ children }: { children: React.ReactNode }) => {
  const scrollToElement = useScrollToElement();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if the menu element exists in the DOM
    const checkMenuElement = () => {
      const menuElement = document.getElementById("menu");
      if (menuElement) {
        setIsReady(true);
        return true;
      }
      return false;
    };

    // Initial check
    if (checkMenuElement()) return;

    // Set up observer to watch for menu element
    const observer = new MutationObserver(() => {
      if (checkMenuElement()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Fallback timeout for iOS browsers
    const timeout = setTimeout(() => {
      setIsReady(true);
      observer.disconnect();
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  const handleScrollToMenu = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // iOS-specific touch event handling
    if ('ontouchstart' in window && e.currentTarget) {
      // Force a reflow to ensure the event is processed
      e.currentTarget.style.transform = 'scale(0.98)';
      setTimeout(() => {
        if (e.currentTarget) {
          e.currentTarget.style.transform = '';
        }
      }, 100);
    }

    // Track the click event safely
    try {
      trackHomeHeroMenuClick();
    } catch (error) {
      // Silently ignore tracking errors
    }

    // Double-check menu element exists before scrolling
    const menuElement = document.getElementById("menu");
    if (!menuElement) {
      console.warn("Menu element not found");
      // Try again after a short delay
      setTimeout(() => {
        scrollToElement({
          elementId: "menu",
          mobileOffset: 10,
          desktopBehavior: "center",
        });
      }, 500);
      return;
    }

    scrollToElement({
      elementId: "menu",
      mobileOffset: 10,
      desktopBehavior: "center",
    });
  };

  return (
    <Button
      className="group flex items-center gap-2 bg-secondary transition-transform duration-300 hover:scale-105 hover:shadow-lg touch-manipulation"
      onClick={handleScrollToMenu}
      onTouchEnd={handleScrollToMenu}
      size="lg"
      type="button"
      aria-label="Scroll to menu section"
      disabled={!isReady}
      style={{
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        cursor: isReady ? 'pointer' : 'not-allowed',
      }}
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
