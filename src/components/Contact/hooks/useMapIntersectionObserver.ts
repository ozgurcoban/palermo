"use client";

import { useEffect, useRef, useState } from "react";

// Map intersection configuration
const MAP_INTERSECTION_CONFIG = {
  threshold: [0, 0.05, 0.1, 0.2] as number[],
  rootMargin: "0px 0px 1200px 0px", // Start loading when map is 600px from viewport
  intersectionRatio: 0.05, // Trigger at 5% visibility for earlier loading
} as const;

export function useMapIntersectionObserver() {
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = elementRef.current;

    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= MAP_INTERSECTION_CONFIG.intersectionRatio
          ) {
            setShouldLoadMap(true);
            // Once we start loading, we don't need to observe anymore
            observer.unobserve(currentRef);
          }
        });
      },
      {
        threshold: MAP_INTERSECTION_CONFIG.threshold,
        rootMargin: MAP_INTERSECTION_CONFIG.rootMargin,
      },
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, []);

  return { shouldLoadMap, elementRef };
}
