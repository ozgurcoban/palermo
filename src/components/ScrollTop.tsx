"use client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { useEffect, useState, useRef } from "react";

const ScrollTop = () => {
  const [showBtn, setShowBtn] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only show button if:
      // 1. We're past the threshold (132px)
      // 2. AND we're scrolling down (current > last)
      if (currentScrollY > 132 && currentScrollY > lastScrollY.current) {
        setShowBtn(true);
      } else if (currentScrollY < lastScrollY.current) {
        // Hide immediately when scrolling up
        setShowBtn(false);
      }
      
      // Update last scroll position
      lastScrollY.current = currentScrollY;
    };
    
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <a href="#navbar">
      <button
        title="Scroll Top"
        aria-label="Scroll Top"
        className={`fixed z-20 right-10 bottom-10 border border-border bg-card hover:bg-accent hover:text-accent-foreground rounded-full p-3 flex items-center justify-center transition-all duration-500 shadow-lg ${
          showBtn ? "opacity-100" : "opacity-0"
        }`}
      >
        <ArrowUpIcon width={28} height={28} />
      </button>
    </a>
  );
};

export default ScrollTop;
