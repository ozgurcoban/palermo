"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

type MaskText = {
  phrases: string[];
  className?: string;
  delay?: number;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
};

const MaskText: React.FC<MaskText> = ({
  phrases,
  className,
  delay = 0,
  as = "p",
}) => {
  const Tag = as;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef}>
      {phrases.map((phrase, index) => {
        const animationDelay = delay + 0.075 * index;
        return (
          <div key={phrase} className={cn("overflow-hidden", className)}>
            <Tag
              className={`mask-text-item ${isInView ? 'animate-maskReveal' : 'translate-y-full'}`}
              style={{
                animationDelay: isInView ? `${animationDelay}s` : undefined,
              }}
            >
              {phrase}
            </Tag>
          </div>
        );
      })}
    </div>
  );
};

export default MaskText;
