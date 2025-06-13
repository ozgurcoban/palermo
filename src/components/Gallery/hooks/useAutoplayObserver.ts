"use client";

import { useEffect, useRef, useState } from "react";
import { AUTOPLAY_CONFIG_INTERSECTION } from "../constants";

interface UseAutoplayObserverProps {
  onEnterView: () => void;
  onLeaveView: () => void;
}

export function useAutoplayObserver({ onEnterView, onLeaveView }: UseAutoplayObserverProps) {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = elementRef.current;
    
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= AUTOPLAY_CONFIG_INTERSECTION.intersectionRatio) {
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
        threshold: AUTOPLAY_CONFIG_INTERSECTION.threshold,
        rootMargin: AUTOPLAY_CONFIG_INTERSECTION.rootMargin,
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [isInView, onEnterView, onLeaveView]);

  return { isInView, elementRef };
}