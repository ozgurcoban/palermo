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

  const scrollToMenu = () => {
    trackMenuCTAClick();
    const menu = document.getElementById("menu");
    if (menu) {
      menu.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button
      className="flex items-center gap-1 bg-secondary transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      onClick={scrollToMenu}
    >
      <motion.div style={{ translateY }}>
        <ArrowDown className="size-4" />
      </motion.div>
      <span className="">{children}</span>
    </Button>
  );
};

export default ScrollToMenu;

// <button className="rounded-md bg-[hsl(24,30%,70%)] px-6 py-2 text-black transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//   Visa meny
// </button>;
