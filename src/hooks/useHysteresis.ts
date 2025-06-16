import { useState, useEffect, useRef } from "react";

/**
 * Hook that adds hysteresis (delay) to boolean state changes
 * - When value becomes true: updates immediately
 * - When value becomes false: delays the update by specified milliseconds
 * 
 * @param value - The boolean value to add hysteresis to
 * @param delay - Delay in milliseconds before setting to false (default: 1500ms)
 * @returns The debounced boolean value
 */
export const useHysteresis = (value: boolean, delay: number = 1500): boolean => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (value) {
      // Show immediately when value becomes true
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setDebouncedValue(true);
    } else if (debouncedValue) {
      // Hide with delay when value becomes false
      if (!timerRef.current) {
        timerRef.current = setTimeout(() => {
          setDebouncedValue(false);
          timerRef.current = null;
        }, delay);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, debouncedValue, delay]);

  return debouncedValue;
};