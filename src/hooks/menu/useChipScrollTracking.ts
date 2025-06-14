import { useEffect } from 'react';

interface UseChipScrollTrackingProps {
  isExpanded: boolean;
  justInteracted: boolean;
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
  onCollapse: () => void;
}

export const useChipScrollTracking = ({
  isExpanded,
  justInteracted,
  scrollContainerRef,
  onCollapse
}: UseChipScrollTrackingProps) => {
  // Listen to menu container scroll - close expanded view on scroll
  useEffect(() => {
    if (!isExpanded) return;
    
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      // Don't close if user just interacted with chips
      if (justInteracted) return;
      
      // Clear any existing timeout
      clearTimeout(scrollTimeout);
      
      // Set a small delay to avoid closing on accidental scrolls
      scrollTimeout = setTimeout(() => {
        onCollapse();
      }, 150);
    };

    // Listen to the menu scroll container
    const scrollContainer = scrollContainerRef?.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Also listen to window scroll and touch events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(scrollTimeout);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [isExpanded, justInteracted, scrollContainerRef, onCollapse]);
};