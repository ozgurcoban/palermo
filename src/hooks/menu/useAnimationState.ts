import { useState, useEffect } from "react";

interface UseAnimationStateReturn {
  hasSeenAnimation: boolean;
}

const ANIMATION_COOLDOWN_KEY = "menu-animation-seen";
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
const ANIMATION_COMPLETE_DELAY = 2000;

export const useAnimationState = (disableAnimations: boolean = false): UseAnimationStateReturn => {
  // Initialize to true to avoid hydration mismatch, then update on client
  const [hasSeenAnimation, setHasSeenAnimation] = useState(true);

  useEffect(() => {
    if (disableAnimations) {
      setHasSeenAnimation(true);
      return;
    }

    // Check localStorage only on client side
    if (typeof window !== "undefined") {
      const lastSeen = localStorage.getItem(ANIMATION_COOLDOWN_KEY);
      const now = Date.now();

      if (lastSeen && now - parseInt(lastSeen) < TWENTY_FOUR_HOURS) {
        setHasSeenAnimation(true);
      } else {
        // Enable animations on client if not seen recently
        setHasSeenAnimation(false);
        // Save after animations complete
        const timeoutId = setTimeout(() => {
          localStorage.setItem(ANIMATION_COOLDOWN_KEY, now.toString());
        }, ANIMATION_COMPLETE_DELAY);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [disableAnimations]);

  return { hasSeenAnimation };
};