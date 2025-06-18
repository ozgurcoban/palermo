"use client";

import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import { trackHomeHeroMenuClick } from "@/lib/gtag";
import { useScrollToElement } from "@/hooks/useScrollToElement";

const ScrollToMenu = ({ children }: { children: React.ReactNode }) => {
  const scrollToElement = useScrollToElement();

  const handleScrollToMenu = () => {
    trackHomeHeroMenuClick();
    scrollToElement({
      elementId: "menu",
      mobileOffset: 10,
      desktopBehavior: "center",
    });
  };

  return (
    <Button
      className="group flex items-center gap-2 bg-secondary transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      onClick={handleScrollToMenu}
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
