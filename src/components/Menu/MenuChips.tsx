"use client";

import { useGetLocale } from "@/config";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface MenuChipsProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
  onClearAll: () => void;
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

const MenuChips: React.FC<MenuChipsProps> = ({
  categories,
  selectedCategories,
  onCategoryToggle,
  onClearAll,
  scrollContainerRef,
}) => {
  const locale = useGetLocale();
  const t = useTranslations("Home.Menu");
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2);
  const [showAllActive, setShowAllActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [justInteracted, setJustInteracted] = useState(false);

  const hasFilters = selectedCategories.length > 0 || showAllActive;
  const isAllSelected = selectedCategories.length === categories.length;

  // Get selected category names in the order they were selected
  const selectedCategoryNames = selectedCategories
    .map(selectedId => categories.find(cat => cat._id === selectedId))
    .filter(Boolean)
    .map(cat => cat!.title[locale]);


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
        setIsExpanded(false);
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
  }, [isExpanded, justInteracted, scrollContainerRef]);

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

  return (
    <div className="w-full">
      {/* Collapsed view - show always when not expanded */}
      {!isExpanded ? (
        <motion.div 
          ref={containerRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-2 p-2.5 bg-muted/50 rounded-lg"
        >
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 flex-1 overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {locale === 'sv' ? 'Filter:' : 'Filter:'}
            </span>
            <div className="flex gap-1.5 items-center">
              {selectedCategories.length === 0 ? (
                <Badge variant="outline" className="text-xs px-2.5 py-0.5 whitespace-nowrap">
                  {locale === 'sv' ? 'Alla' : 'All'}
                </Badge>
              ) : showAllActive ? (
                <Badge variant="default" className="text-xs px-2.5 py-0.5 whitespace-nowrap">
                  {locale === 'sv' ? 'Alla' : 'All'}
                </Badge>
              ) : (
                <>
                  {selectedCategoryNames.slice(0, visibleCount).map((name, i) => (
                    <Badge key={i} variant="default" className="text-xs px-2.5 py-0.5 whitespace-nowrap">
                      {name}
                    </Badge>
                  ))}
                  {selectedCategoryNames.length > visibleCount && (
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      +{selectedCategoryNames.length - visibleCount}
                    </span>
                  )}
                </>
              )}
            </div>
          </button>
          <div className="flex items-center gap-2 shrink-0">
            {hasFilters && (
              <button
                onClick={() => {
                  onClearAll();
                  setShowAllActive(false);
                }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
            >
              <span className="hidden sm:inline">{locale === 'sv' ? 'Ändra' : 'Change'}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ) : (
        /* Expanded view */
        <>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-primary uppercase tracking-wide">
              {t("categories")}
            </span>
            <div className="flex items-center gap-3">
              <AnimatePresence>
                {hasFilters && !isAllSelected && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => {
                      onClearAll();
                      setShowAllActive(false);
                    }}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-3 w-3" />
                    {locale === 'sv' ? 'Rensa filter' : 'Clear filter'}
                  </motion.button>
                )}
              </AnimatePresence>
              {hasFilters && (
                <button
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
      
      <div className="flex flex-wrap gap-2">
        {/* "Alla" chip */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Clear filters and show all items
            onClearAll();
            setShowAllActive(true);
            setIsExpanded(false);
          }}
          className="focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-full"
        >
          <Badge
            variant={isAllSelected ? "default" : "outline"}
            className={`cursor-pointer transition-all duration-200 hover:scale-105 px-4 py-2 text-sm font-medium ${
              isAllSelected 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "border-2 hover:border-primary/50 hover:bg-primary/5"
            }`}
          >
            {locale === 'sv' ? 'Alla' : 'All'}
          </Badge>
        </motion.button>

        {/* Category chips */}
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category._id);
          
          return (
            <motion.button
              key={category._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setJustInteracted(true);
                onCategoryToggle(category._id);
                setShowAllActive(false);
                setTimeout(() => setJustInteracted(false), 1000);
              }}
              className="focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-full"
            >
              <Badge
                variant={isSelected ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 px-4 py-2 text-sm font-medium ${
                  isSelected 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "border-2 hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                {category.title[locale]}
              </Badge>
            </motion.button>
          );
        })}
      </div>

          {/* Filter count indicator */}
          <AnimatePresence>
            {hasFilters && !isAllSelected && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-3 text-xs text-muted-foreground"
              >
                {locale === 'sv' 
                  ? `Visar ${selectedCategories.length} av ${categories.length} kategorier`
                  : `Showing ${selectedCategories.length} of ${categories.length} categories`}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default MenuChips;