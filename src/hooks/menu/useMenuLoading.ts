import { useState, useEffect } from "react";

interface UseMenuLoadingReturn {
  isMenuLoading: boolean;
}

export const useMenuLoading = (hasCategories: boolean): UseMenuLoadingReturn => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuLoading, setIsMenuLoading] = useState(false);

  useEffect(() => {
    // Component is now mounted on client
    setIsMounted(true);
    
    if (hasCategories) {
      // Show skeleton briefly to prevent flash
      setIsMenuLoading(true);
      
      // Small delay to allow proper rendering and avoid flash
      const timer = setTimeout(() => {
        setIsMenuLoading(false);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [hasCategories]);

  // Only show loading state if mounted (client-side)
  return { isMenuLoading: isMounted && isMenuLoading };
};