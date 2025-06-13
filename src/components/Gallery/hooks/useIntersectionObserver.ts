"use client";

import { useEffect, useRef, useState } from "react";
import { INTERSECTION_CONFIG } from "../constants";

interface UseIntersectionObserverProps {
  onEnterView: () => void;
  onLeaveView: () => void;
}

export function useIntersectionObserver({ onEnterView, onLeaveView }: UseIntersectionObserverProps) {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = elementRef.current;
    
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= INTERSECTION_CONFIG.intersectionRatio) {
            if (!isInView) {
              setIsInView(true);
              onEnterView();
            }
          } else if (!entry.isIntersecting && isInView) {
            setIsInView(false);
            onLeaveView();
          }
        });
      },
      {
        threshold: INTERSECTION_CONFIG.threshold,
        rootMargin: INTERSECTION_CONFIG.rootMargin,
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [isInView, onEnterView, onLeaveView]);

  return { isInView, elementRef };
}