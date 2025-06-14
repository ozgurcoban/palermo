import { useState, useEffect, useMemo, useRef } from "react";

interface UseCategoryFilteringProps {
  categories: Category[];
  isMobile: boolean;
}

interface UseCategoryFilteringReturn {
  selectedCategories: string[];
  tab: string;
  menus_list: (SubCategory | Food)[] | Category[];
  getCategory: Category | null | undefined;
  scrollRef: React.RefObject<HTMLDivElement>;
  handleCategoryToggle: (categoryId: string) => void;
  handleClearAll: () => void;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

export const useCategoryFiltering = ({
  categories,
  isMobile,
}: UseCategoryFilteringProps): UseCategoryFilteringReturn => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [tab, setTab] = useState(categories[0]?._id || "");
  const scrollRef = useRef<HTMLDivElement>(null);

  const useChips = isMobile;

  // Reset tab when categories change
  useEffect(() => {
    if (categories.length > 0 && !categories.find(cat => cat._id === tab)) {
      setTab(categories[0]._id);
    }
  }, [categories, tab]);

  // Scroll to top when selection changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [selectedCategories, tab]);

  // Get the menu list based on mode
  const menus_list = useMemo(() => {
    if (useChips) {
      // Chips mode: multi-select filtering
      if (selectedCategories.length === 0) {
        // Return all categories with structure intact for "Alla"
        return categories;
      }

      // Sort categories based on selection order
      const filteredCategories = selectedCategories
        .map((selectedId) => categories.find(({ _id }) => _id === selectedId))
        .filter(Boolean) as Category[];

      // Return categories in the order they were selected
      return filteredCategories;
    } else {
      // Tabs mode: single category selection (desktop)
      const filteredList = categories.find(({ _id }) => tab === _id);
      if (filteredList) {
        // For desktop, return subcategories and direct menu items
        return [
          ...(filteredList.sub_categories ?? []),
          ...(filteredList.menu_list ?? []),
        ];
      } else return [];
    }
  }, [useChips, selectedCategories, tab, categories]);

  // Get category for description display
  const getCategory = useMemo(() => {
    if (useChips) {
      if (selectedCategories.length === 0) return null;
      return categories.find((category) =>
        selectedCategories.includes(category._id),
      );
    } else {
      return categories.find((category) => tab === category._id);
    }
  }, [useChips, categories, selectedCategories, tab]);

  // Handler functions for chips
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
  };

  return {
    selectedCategories,
    tab,
    menus_list,
    getCategory,
    scrollRef,
    handleCategoryToggle,
    handleClearAll,
    setTab,
  };
};