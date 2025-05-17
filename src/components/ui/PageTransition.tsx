"use client";
import { AnimatePresence } from "framer-motion";
import React from "react";
import MotionDiv from "./MotionDiv";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence mode="wait">
      {React.Children.map(children, (child, index) => {
        return React.isValidElement(child)
          ? React.cloneElement(child, { key: `page-${index}` })
          : child;
      })}
      <MotionDiv
        key="transition-bottom"
        className="fixed left-0 top-0 z-50 h-screen w-full origin-bottom overflow-hidden bg-accent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      <MotionDiv
        key="transition-top"
        className="fixed left-0 top-0 z-50 h-screen w-full origin-top overflow-hidden bg-accent"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </AnimatePresence>
  );
};

export default PageTransition;
