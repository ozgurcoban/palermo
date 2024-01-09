"use client";
import { AnimatePresence } from "framer-motion";
import React from "react";
import MotionDiv from "./MotionDiv";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence mode="wait">
      {children}
      <MotionDiv
        className="fixed z-50 top-0 left-0 w-full h-screen bg-accent origin-bottom"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      ></MotionDiv>
      <MotionDiv
        className="fixed z-50 top-0 left-0 w-full h-screen bg-accent origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      ></MotionDiv>
    </AnimatePresence>
  );
};

export default PageTransition;
