// DEPRECATED: Pizza-specific functions - no longer needed
// Helper function to identify pizza categories
// export const getPizzaCategoryIds = (categories: Category[]): string[] => {
//   return categories
//     .filter(cat => cat._id === "pizza" || cat.title?.en?.toLowerCase() === "pizza")
//     .map(cat => cat._id);
// };

// Helper function to check if a category is a pizza category
// export const isPizzaCategory = (category: Category | null | undefined): boolean => {
//   if (!category) return false;
//   return category._id === "pizza" || category.title?.en?.toLowerCase() === "pizza";
// };

// DEPRECATED: Old complex functions - kept for reference
// Helper function to check if pizza subcategories are actually visible in rendered data
// export const isPizzaSubcategoryVisible = (
//   categories: Category[],
//   useChips: boolean,
//   selectedCategories: string[],
//   currentCategory: Category | null | undefined,
//   menus_list: (SubCategory | Food)[] | Category[]
// ): boolean => {
//   const pizzaCategoryIds = getPizzaCategoryIds(categories);
//   
//   if (useChips) {
//     // Mobile: Check if actual rendered data contains pizza categories with subcategories
//     if (menus_list.length === 0) return false;
//     
//     // Check if menus_list contains Category objects (showCategoryHeaders mode)
//     if (menus_list.length > 0 && 'sub_categories' in menus_list[0]) {
//       const categoryData = menus_list as Category[];
//       return categoryData.some(cat => 
//         pizzaCategoryIds.includes(cat._id) && 
//         cat.sub_categories && 
//         cat.sub_categories.length > 0
//       );
//     }
//     
//     // If it's flat data (SubCategory | Food), no pizza subcategories are shown
//     return false;
//   } else {
//     // Desktop: Check if current tab is pizza and has subcategories
//     return isPizzaCategory(currentCategory) && !!currentCategory?.sub_categories?.length;
//   }
// };

// Helper function to check if pizza items with takeaway prices are visible in rendered data
// export const hasVisiblePizzaItemsWithTakeaway = (
//   categories: Category[],
//   useChips: boolean,
//   selectedCategories: string[],
//   currentCategory: Category | null | undefined,
//   menus_list: (SubCategory | Food)[] | Category[]
// ): boolean => {
//   const pizzaCategoryIds = getPizzaCategoryIds(categories);
//   
//   if (useChips) {
//     // Mobile: Check if actual rendered data contains pizza with takeaway prices
//     if (menus_list.length === 0) return false;
//     
//     // Check if menus_list contains Category objects (showCategoryHeaders mode)
//     if (menus_list.length > 0 && 'sub_categories' in menus_list[0]) {
//       const categoryData = menus_list as Category[];
//       return categoryData.some(category =>
//         pizzaCategoryIds.includes(category._id) &&
//         category.sub_categories?.some((subCategory: any) =>
//           subCategory.menu_list?.some((menuItem: any) =>
//             "takeawayPrice" in menuItem.priceSection &&
//             menuItem.priceSection.takeawayPrice,
//           ),
//         )
//       );
//     }
//     
//     // If it's flat data (SubCategory | Food), no pizza subcategories are shown
//     return false;
//   } else {
//     // Desktop: Check current pizza category for takeaway prices
//     if (!isPizzaCategory(currentCategory)) return false;
//     
//     return currentCategory?.sub_categories?.some((subCategory) =>
//       subCategory.menu_list?.some(
//         (item) =>
//           "takeawayPrice" in item.priceSection &&
//           item.priceSection.takeawayPrice,
//       ),
//     ) ?? false;
//   }
// };

// DEPRECATED: Old complex function - kept for reference
// Enhanced function to check if we should show "Servering/Avh" labels based on actual rendered data
// export const shouldShowTakeawayLabels = (
//   categories: Category[],
//   useChips: boolean,
//   selectedCategories: string[],
//   getCategory: Category | null | undefined,
//   menus_list: (SubCategory | Food)[] | Category[]
// ): boolean => {
//   // First check if pizza subcategories are actually visible in rendered data
//   const pizzaSubcategoriesVisible = isPizzaSubcategoryVisible(
//     categories, 
//     useChips, 
//     selectedCategories, 
//     getCategory,
//     menus_list
//   );
//   
//   if (!pizzaSubcategoriesVisible) return false;
//   
//   // Then check if visible pizza items have takeaway prices
//   return hasVisiblePizzaItemsWithTakeaway(
//     categories, 
//     useChips, 
//     selectedCategories, 
//     getCategory,
//     menus_list
//   );
// };

// Simple function to check if we should show takeaway labels based on scroll position
// This creates a dynamic effect where labels appear/disappear as user scrolls through pizzas
export const shouldShowTakeawayLabelsBasedOnScroll = (
  categories: Category[],
  useChips: boolean,
  visibleCategoryId: string | null,
  currentCategory: Category | null | undefined,
  visibleSubcategoryId: string | null,
  selectedCategories: string[] = []
): boolean => {
  if (useChips) {
    // Mobile: Show labels ONLY when scrolling past pizza subcategory
    if (!visibleSubcategoryId) {
      return false;
    }
    
    // Find the visible subcategory
    for (const category of categories) {
      const subcategory = category.sub_categories?.find(
        sub => sub._id === visibleSubcategoryId
      );
      
      if (subcategory) {
        // Check if this is a pizza subcategory (check both languages)
        const isPizzaSubcategory = 
          subcategory.title?.sv?.toLowerCase().includes('pizza') ||
          subcategory.title?.en?.toLowerCase().includes('pizza') ||
          subcategory._id.includes('pizza');
        
        if (isPizzaSubcategory) {
          // Check if it has takeaway prices
          const hasTakeaway = subcategory.menu_list?.some((item) =>
            "takeawayPrice" in item.priceSection &&
            item.priceSection.takeawayPrice
          ) ?? false;
          
          return hasTakeaway;
        } else {
          return false;
        }
      }
    }
    
    return false;
  } else {
    // Desktop: Show when current category has any subcategories with takeaway prices
    
    if (!currentCategory) return false;
    
    // Check if ANY subcategory in current tab has takeaway prices
    const hasTakeaway = currentCategory.sub_categories?.some((subCategory) => {
      const hasPrice = subCategory.menu_list?.some((item) =>
        "takeawayPrice" in item.priceSection &&
        item.priceSection.takeawayPrice
      ) ?? false;
      
      
      return hasPrice;
    }) ?? false;
    
    return hasTakeaway;
  }
};

// Helper function to check if we should show glass/bottle labels
export const shouldShowGlassLabels = (
  useChips: boolean,
  getCategory: Category | null | undefined
): boolean => {
  // Only show on desktop (not mobile chips) and only when current category has glass prices
  if (useChips) return false;
  if (!getCategory?.sub_categories?.length) return false;
  
  return getCategory.sub_categories.some((subCategory) =>
    subCategory.menu_list?.some(
      (item) =>
        "glassPrice" in item.priceSection &&
        item.priceSection.glassPrice,
    ),
  ) ?? false;
};