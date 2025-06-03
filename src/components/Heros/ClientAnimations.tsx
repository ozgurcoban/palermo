"use client";

import { useEffect } from "react";
import { trackLunchCTAClick } from "@/lib/gtag";

export default function ClientAnimations() {
  useEffect(() => {
    // Add fade-in animations after hydration
    const elements = document.querySelectorAll('.hero-title, .badge, p');
    elements.forEach((el, index) => {
      el.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700');
      setTimeout(() => {
        el.classList.remove('opacity-0', 'translate-y-4');
      }, index * 200);
    });

    // Track lunch button clicks
    const lunchButton = document.querySelector('a[href="/lunch"]');
    if (lunchButton) {
      lunchButton.addEventListener('click', trackLunchCTAClick);
    }

    return () => {
      if (lunchButton) {
        lunchButton.removeEventListener('click', trackLunchCTAClick);
      }
    };
  }, []);

  return null;
}