"use client";

import {
  useChipVisibility,
  useChipExpansion,
  useChipScrollTracking,
  useMenuRendering
} from "@/hooks/menu";
import { ChipCollapsedView, ChipExpandedView } from "./MenuChips/";

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
  const { locale, getCategoryDisplayName } = useMenuRendering();
  
  const {
    isExpanded,
    showAllActive,
    justInteracted,
    expandChips,
    collapseChips,
    setInteracted,
    activateShowAll,
    deactivateShowAll
  } = useChipExpansion();

  const selectedCategoryNames = getCategoryDisplayName(selectedCategories, categories);
  const hasFilters = selectedCategories.length > 0 || showAllActive;
  const isAllSelected = selectedCategories.length === categories.length;

  const { visibleCount, containerRef } = useChipVisibility({ 
    selectedCategoryNames, 
    hasFilters 
  });

  useChipScrollTracking({
    isExpanded,
    justInteracted,
    scrollContainerRef,
    onCollapse: collapseChips
  });

  const handleClearAll = () => {
    onClearAll();
    deactivateShowAll();
  };

  return (
    <div className="w-full">
      {!isExpanded ? (
        <ChipCollapsedView
          containerRef={containerRef}
          locale={locale}
          selectedCategories={selectedCategories}
          selectedCategoryNames={selectedCategoryNames}
          visibleCount={visibleCount}
          showAllActive={showAllActive}
          hasFilters={hasFilters}
          onExpand={expandChips}
          onClearAll={handleClearAll}
        />
      ) : (
        <ChipExpandedView
          locale={locale}
          categories={categories}
          selectedCategories={selectedCategories}
          isAllSelected={isAllSelected}
          hasFilters={hasFilters}
          onCategoryToggle={onCategoryToggle}
          onClearAll={onClearAll}
          onCollapse={collapseChips}
          onActivateShowAll={activateShowAll}
          onDeactivateShowAll={deactivateShowAll}
          onSetInteracted={setInteracted}
        />
      )}
    </div>
  );
};

export default MenuChips;