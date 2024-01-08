import React from "react";
import MotionDiv from "./MotionDiv";

type FadeUp = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

const variants = {
  initial: {
    y: 30,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

const FadeUp: React.FC<FadeUp> = ({ children, className, delay, duration }) => {
  return (
    <MotionDiv
      variants={variants}
      initial={"initial"}
      animate="animate"
      className={className}
      transition={{ delay, duration, ease: "easeIn" }}
    >
      {children}
    </MotionDiv>
  );
};

export default FadeUp;
