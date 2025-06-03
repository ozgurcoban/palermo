"use client";

import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import { motion, useTransform, useMotionValue, animate } from "framer-motion";
import { useEffect } from "react";
import { trackMenuCTAClick } from "@/lib/gtag";

const ScrollToMenu = ({ children }: { children: React.ReactNode }) => {
  const y = useMotionValue(0);
  const translateY = useTransform(y, [-10, 10], [-5, 5]);

  useEffect(() => {
    const animation = animate(
      y,
      [0, -10, 0, 10, 0], // Move up and down
      {
        duration: 0.9, // Duration of the animation
        repeat: 2, // Repeat the animation indefinitely
        repeatType: "reverse", // Loop the animation
        ease: "easeInOut", // Use an ease-in-out curve
        delay: 3.2, // Delay the animation start
      },
    );

    return animation.stop; // Stop the animation when the component unmounts
  }, [y]);

  const scrollToMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Track the click event safely
    try {
      trackMenuCTAClick();
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
        const offsetPosition = menuPosition - navbarHeight + 30; // Changed from -20 to +30 for 50px lower
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
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
      <motion.div style={{ translateY }} className="pointer-events-none">
        <ArrowDown className="size-4" />
      </motion.div>
      <span className="pointer-events-none">{children}</span>
    </Button>
  );
};

export default ScrollToMenu;

// <button className="rounded-md bg-[hsl(24,30%,70%)] px-6 py-2 text-black transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//   Visa meny
// </button>;
