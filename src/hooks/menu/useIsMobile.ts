import { useState, useEffect } from "react";

interface UseResponsiveHeightReturn {
  isMobile: boolean;
}

const MOBILE_BREAKPOINT = 768;

export const useIsMobile = (): UseResponsiveHeightReturn => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Initial check
    checkIsMobile();

    // Add event listener
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return { isMobile };
};