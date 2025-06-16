import { useCallback } from "react";

interface ScrollOptions {
  elementId: string;
  mobileOffset?: number;
  desktopBehavior?: "center" | "offset";
  desktopOffset?: number;
  delay?: number;
  onScroll?: () => void;
}

export const useScrollToElement = () => {
  const scrollToElement = useCallback((options: ScrollOptions) => {
    const {
      elementId,
      mobileOffset = 20,
      desktopBehavior = "center",
      desktopOffset = 100,
      delay = 100,
      onScroll,
    } = options;

    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (!element) return;

      const isMobile = window.innerWidth < 1024;

      if (isMobile) {
        const elementRect = element.getBoundingClientRect();
        const elementTop = elementRect.top + window.scrollY;
        const scrollTarget = elementTop - mobileOffset;

        window.scrollTo({
          top: scrollTarget,
          behavior: "smooth",
        });
      } else {
        if (desktopBehavior === "center") {
          const elementRect = element.getBoundingClientRect();
          const elementTop = elementRect.top + window.scrollY;
          const elementHeight = elementRect.height;
          const viewportHeight = window.innerHeight;

          const scrollTarget =
            elementTop - (viewportHeight - elementHeight) / 2;

          window.scrollTo({
            top: scrollTarget,
            behavior: "smooth",
          });
        } else {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });

          setTimeout(() => {
            window.scrollBy({ top: -desktopOffset, behavior: "smooth" });
          }, 500);
        }
      }

      if (onScroll) {
        onScroll();
      }
    }, delay);
  }, []);

  return scrollToElement;
};
