import { MENU_CONSTANTS } from './menuConstants';

// Utility functions for menu rendering calculations
export const calculateBadgeWidth = (text: string): number => {
  const textWidth = text.length * MENU_CONSTANTS.TEXT_CHAR_WIDTH;
  return textWidth + MENU_CONSTANTS.BADGE_PADDING;
};

export const calculateAvailableWidth = (containerWidth: number): number => {
  return containerWidth - 
    MENU_CONSTANTS.FILTER_TEXT_WIDTH - 
    MENU_CONSTANTS.BUTTON_WIDTH - 
    MENU_CONSTANTS.EXTRA_NUMBER_WIDTH;
};

export const calculateVisibleCategoryCount = (
  categoryNames: string[], 
  availableWidth: number
): number => {
  let totalWidth = 0;
  let fitCount = 0;

  for (let i = 0; i < categoryNames.length; i++) {
    const badgeWidth = calculateBadgeWidth(categoryNames[i]);
    const gapWidth = i > 0 ? MENU_CONSTANTS.GAP_WIDTH : 0;
    
    if (totalWidth + badgeWidth + gapWidth < availableWidth) {
      totalWidth += badgeWidth + gapWidth;
      fitCount++;
    } else {
      break;
    }
  }

  return fitCount || 1; // Show at least one if possible
};

// Category identification utilities - using centralized logic
export const isPizzaCategoryById = (categoryId: string, categoryTitle: any): boolean => {
  return categoryId === 'pizza' || categoryTitle.en.toLowerCase() === 'pizza';
};


export const hasSubcategories = (category: Category): boolean => {
  return !!(category.sub_categories && category.sub_categories.length > 0);
};

export const hasDirectMenuItems = (category: Category): boolean => {
  return !!(category.menu_list && category.menu_list.length > 0);
};

// Menu state utilities
export const isAllCategoriesSelected = (
  selectedCategories: string[], 
  totalCategories: number
): boolean => {
  return selectedCategories.length === totalCategories;
};

export const hasActiveFilters = (
  selectedCategories: string[], 
  showAllActive: boolean
): boolean => {
  return selectedCategories.length > 0 || showAllActive;
};

// Rendering decision utilities
export const shouldShowCategoryHeader = (category: Category): boolean => {
  return !hasSubcategories(category);
};

export const shouldShowDirectItemsHeader = (
  category: Category,
  hasSubcategories: boolean
): boolean => {
  return hasDirectMenuItems(category) && hasSubcategories;
};