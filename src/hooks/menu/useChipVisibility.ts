import { useState, useEffect, useRef } from 'react';

interface UseChipVisibilityProps {
  selectedCategoryNames: string[];
  hasFilters: boolean;
}

export const useChipVisibility = ({ 
  selectedCategoryNames, 
  hasFilters 
}: UseChipVisibilityProps) => {
  const [visibleCount, setVisibleCount] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate how many categories fit without truncation
  useEffect(() => {
    if (!containerRef.current || !hasFilters) return;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const filterTextWidth = 50; // Approximate width of "Filter:"
    const buttonWidth = 80; // Approximate width of buttons section
    const gapWidth = 6; // Gap between badges
    const extraNumberWidth = 30; // Width for "+2" text
    const availableWidth = containerWidth - filterTextWidth - buttonWidth - extraNumberWidth;

    // Create temporary badges to measure
    let totalWidth = 0;
    let fitCount = 0;

    for (let i = 0; i < selectedCategoryNames.length; i++) {
      // Approximate badge width (8px padding * 2 + text width)
      const textWidth = selectedCategoryNames[i].length * 7; // Rough estimate
      const badgeWidth = textWidth + 20; // Adding padding
      
      if (totalWidth + badgeWidth + (i > 0 ? gapWidth : 0) < availableWidth) {
        totalWidth += badgeWidth + (i > 0 ? gapWidth : 0);
        fitCount++;
      } else {
        break;
      }
    }

    // If even one category is too long, show just one
    setVisibleCount(fitCount || 1);
  }, [selectedCategoryNames, hasFilters]);

  return {
    visibleCount,
    containerRef
  };
};