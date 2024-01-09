import React from "react";
import MotionDiv from "./MotionDiv";
import { MotionProps } from "framer-motion";

interface FadeUp extends MotionProps {
  children?: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

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

const FadeUp: React.FC<FadeUp> = ({
  children,
  className,
  delay,
  duration,
  ...props
}) => {
  return (
    <MotionDiv
      variants={variants}
      initial={"initial"}
      className={className}
      whileInView={"animate"}
      viewport={{ once: true }}
      transition={{ delay, duration, ease: "easeIn" }}
      {...props}
    >
      {children}
    </MotionDiv>
  );
};

export default FadeUp;
