"use client";
import React, { useEffect, useRef, useState } from "react";

interface MotionDivProps {
  children?: React.ReactNode;
  className?: string;
  animationClass?: string;
  onInView?: boolean;
  delay?: number;
}

const MotionDiv: React.FC<MotionDivProps> = ({ 
  children, 
  className = "", 
  animationClass = "",
  onInView = false,
  delay = 0,
  ...props 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!onInView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsInView(true);
          }, delay * 1000);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [onInView, delay]);

  const combinedClass = `${className} ${onInView && isInView ? animationClass : ''}`;

  return <div ref={ref} className={combinedClass} {...props}>{children}</div>;
};

export default MotionDiv;
