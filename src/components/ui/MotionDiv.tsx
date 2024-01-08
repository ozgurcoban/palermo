"use client";
import React from "react";
import { MotionProps, motion } from "framer-motion";

interface MotionDivProps extends MotionProps {
  children?: React.ReactNode;
  className?: string;
}

const MotionDiv: React.FC<MotionDivProps> = ({ children, ...props }) => {
  return <motion.div {...props}>{children}</motion.div>;
};

export default MotionDiv;
