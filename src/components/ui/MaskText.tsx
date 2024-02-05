"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

type MaskText = {
  phrases: string[];
  className?: string;
  delay?: number;
};

const MaskText: React.FC<MaskText> = ({ phrases, className, delay }) => {
  const animation = {
    initial: { y: "100%" },

    enter: (i: number) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: (delay ?? 0) + 0.075 * i,
      },
    }),
  };
  return (
    <>
      {phrases.map((phrase, index) => {
        return (
          <div key={phrase} className={cn("overflow-hidden", className)}>
            <motion.p
              custom={index}
              variants={animation}
              initial="initial"
              whileInView={"enter"}
              viewport={{ once: true }}
            >
              {phrase}
            </motion.p>
          </div>
        );
      })}
    </>
  );
};

export default MaskText;
