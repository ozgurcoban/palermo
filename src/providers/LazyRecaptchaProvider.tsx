"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import the RecaptchaProvider
const RecaptchaProvider = dynamic(
  () => import("./RecaptchaProvider").then((mod) => mod.RecaptchaProvider),
  { 
    ssr: false,
    loading: () => null // Don't show loading state
  }
);

interface LazyRecaptchaProviderProps {
  children: React.ReactNode;
  loadOnInteraction?: boolean; // Load on focus/click
  loadOnVisible?: boolean; // Load when visible in viewport
}

export function LazyRecaptchaProvider({ 
  children, 
  loadOnInteraction = true,
  loadOnVisible = false 
}: LazyRecaptchaProviderProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadOnVisible || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [loadOnVisible, shouldLoad]);

  const handleInteraction = () => {
    if (!shouldLoad && loadOnInteraction) {
      setShouldLoad(true);
    }
  };

  return (
    <div 
      ref={containerRef}
      onFocus={handleInteraction}
      onMouseEnter={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {shouldLoad ? (
        <RecaptchaProvider>{children}</RecaptchaProvider>
      ) : (
        children
      )}
    </div>
  );
}