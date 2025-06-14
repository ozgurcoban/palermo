import { useState, useEffect } from "react";

interface UseScrollTrackingProps {
  scrollRef: React.RefObject<HTMLDivElement>;
  useChips: boolean;
  menus_list: any[];
  selectedCategories: string[];
}

interface UseScrollTrackingReturn {
  visibleCategoryId: string | null;
  visibleSubcategoryId: string | null;
}

export const useScrollTracking = ({
  scrollRef,
  useChips,
  menus_list,
  selectedCategories,
}: UseScrollTrackingProps): UseScrollTrackingReturn => {
  const [visibleCategoryId, setVisibleCategoryId] = useState<string | null>(null);
  const [visibleSubcategoryId, setVisibleSubcategoryId] = useState<string | null>(null);

  // Intersection Observer for tracking visible categories in mobile mode
  useEffect(() => {
    if (!useChips || !scrollRef.current) {
      return;
    }

    
    // Add a small delay to ensure DOM is ready
    const setupObserver = () => {
      if (!scrollRef.current) return;
      
      // Log what we find
      const categoryHeaders = scrollRef.current.querySelectorAll("[data-category-id]");
      const subcategoryHeaders = scrollRef.current.querySelectorAll("[data-subcategory-id]");
      
      

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const categoryId = entry.target.getAttribute("data-category-id");
            const subcategoryId = entry.target.getAttribute("data-subcategory-id");
            
            
            if (entry.isIntersecting) {
              if (categoryId) {
                setVisibleCategoryId(categoryId);
                setVisibleSubcategoryId(null);
              } else if (subcategoryId) {
                setVisibleSubcategoryId(subcategoryId);
                // Also update the parent category if we can find it
                const parentCategory = entry.target.closest("[data-category-id]");
                if (parentCategory) {
                  const parentId = parentCategory.getAttribute("data-category-id");
                  if (parentId) setVisibleCategoryId(parentId);
                }
              }
            }
          });
        },
        {
          root: scrollRef.current,
          rootMargin: "-20% 0px -20% 0px", // Trigger when element is near center of viewport
          threshold: 0.1,
        },
      );

      // Observe all category and subcategory headers
      categoryHeaders.forEach((header) => observer.observe(header));
      subcategoryHeaders.forEach((header) => observer.observe(header));
      
      return () => {
        categoryHeaders.forEach((header) => observer.unobserve(header));
        subcategoryHeaders.forEach((header) => observer.unobserve(header));
        observer.disconnect();
      };
    };
    
    // Setup with a small delay to ensure DOM is ready
    let cleanupFn: (() => void) | undefined;
    const timeoutId = setTimeout(() => {
      cleanupFn = setupObserver();
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      if (cleanupFn) cleanupFn();
    };
  }, [useChips, menus_list, selectedCategories, scrollRef]);

  return { visibleCategoryId, visibleSubcategoryId };
};