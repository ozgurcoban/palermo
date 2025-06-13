"use client";

import { useEffect, useRef, useState } from "react";
import { AUTOPLAY_CONFIG_INTERSECTION } from "../constants";

interface UseAutoplayObserverProps {
  onEnterView: () => void;
  onLeaveView: () => void;
  elementRef?: React.RefObject<HTMLDivElement>;
}

export function useAutoplayObserver({ onEnterView, onLeaveView, elementRef }: UseAutoplayObserverProps) {
  const [isInView, setIsInView] = useState(false);
  const internalRef = useRef<HTMLDivElement>(null);
  const refToUse = elementRef || internalRef;

  useEffect(() => {
    const currentRef = refToUse.current;
    
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

  return { isInView, elementRef: refToUse };
}