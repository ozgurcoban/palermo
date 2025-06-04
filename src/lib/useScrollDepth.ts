"use client";

import { useEffect, useRef } from 'react';
import { trackScrollDepth } from './gtag';

export function useScrollDepth(pageName: string) {
  const milestones = useRef({
    25: false,
    50: false,
    75: false,
    100: false
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = Math.round((scrollTop / (docHeight - winHeight)) * 100);

      // Track milestones
      Object.keys(milestones.current).forEach(milestone => {
        const percent = parseInt(milestone);
        if (scrollPercent >= percent && !milestones.current[percent as keyof typeof milestones.current]) {
          milestones.current[percent as keyof typeof milestones.current] = true;
          trackScrollDepth(percent, pageName);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageName]);
}