"use client";

import React from "react";
import MotionDiv from "./MotionDiv";

interface FadeUp {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeUp: React.FC<FadeUp> = ({
  children,
  className = "",
  delay = 0,
}) => {
  return (
    <MotionDiv
      className={`${className} opacity-0 translate-y-8`}
      animationClass="animate-fadeUp"
      onInView={true}
      delay={delay}
    >
      {children}
    </MotionDiv>
  );
};

export default FadeUp;
