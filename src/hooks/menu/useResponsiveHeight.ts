import { useState, useEffect } from "react";

interface UseResponsiveHeightReturn {
  isMobile: boolean;
  menuHeight: string;
}

const MOBILE_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;
const DESKTOP_HEIGHT = "80vh";
const FALLBACK_NAVBAR_HEIGHT = 80;
const FALLBACK_BOTTOM_BAR_HEIGHT = 120;
const EXTRA_SPACING = 40;
const BOTTOM_BAR_PADDING = 16;

export const useResponsiveHeight = (): UseResponsiveHeightReturn => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [menuHeight, setMenuHeight] = useState<string>("85vh");

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    const calculateMenuHeight = () => {
      if (window.innerWidth < DESKTOP_BREAKPOINT) {
        // Mobile/tablet breakpoint
        const navbar = (document.querySelector("header nav") ||
          document.querySelector(
            'nav[role="navigation"]:not(.fixed)',
          )) as HTMLElement;
        const bottomBar = document.querySelector(
          'nav.fixed[role="navigation"]',
        ) as HTMLElement;

        const navbarHeight = navbar ? navbar.offsetHeight : FALLBACK_NAVBAR_HEIGHT;
        const bottomBarHeight = bottomBar 
          ? bottomBar.offsetHeight + BOTTOM_BAR_PADDING 
          : FALLBACK_BOTTOM_BAR_HEIGHT;
        const viewportHeight = window.innerHeight;

        // Calculate available height with padding
        const availableHeight =
          viewportHeight - navbarHeight - bottomBarHeight - EXTRA_SPACING;
        setMenuHeight(`${availableHeight}px`);
      } else {
        setMenuHeight(DESKTOP_HEIGHT);
      }
    };

    const handleResize = () => {
      checkIsMobile();
      calculateMenuHeight();
    };

    // Initial calculations
    checkIsMobile();
    calculateMenuHeight();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile, menuHeight };
};