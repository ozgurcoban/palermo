/*
This DynamicMotion component serves as a flexible wrapper for Framer Motion, allowing you to easily 
animate various HTML elements as they enter the viewport. It simplifies the animation process by:

- Automatically applying a default "slide-up" animation (initially shifted down with reduced opacity, animating to its original position with full opacity).
- Allowing customization of the animation delay, duration, and transition properties via props.
- Supporting dynamic selection of HTML element types (e.g., div, section, span) to animate, making it highly reusable.
- Optionally enabling a hover effect to shift the element slightly upward when hovered over.
  
Overall, DynamicMotion helps you add smooth, ready-to-use animations to your UI components without extra
boilerplate code, improving both development speed and visual consistency.
*/

"use client";

import { motion, MotionProps } from "framer-motion";
import React from "react";

interface CustomMotionProps<Tag extends keyof JSX.IntrinsicElements>
  extends MotionProps {
  type?: Tag;
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  transition?: MotionProps["transition"];
  enableHover?: boolean;
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

export const DynamicMotion = <Tag extends keyof JSX.IntrinsicElements>({
  type,
  children,
  className,
  delay = 0.7,
  duration,
  transition,
  enableHover,
  ...props
}: CustomMotionProps<Tag>) => {
  const Component = type ? (motion as any)[type] : motion.div;

  return (
    <Component
      variants={variants}
      initial={"initial"}
      className={className}
      whileInView={"animate"}
      viewport={{ once: true }}
      transition={{ delay, duration, ease: "easeIn", ...transition }}
      whileHover={enableHover ? { y: -5 } : undefined}
      {...props}
    >
      {children}
    </Component>
  );
};
