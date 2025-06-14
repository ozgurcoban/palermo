import React from "react";
import MenuItem from "./MenuItem";
import { CategoryRenderer, EmptyState } from ".";

// Type guard to check if an item is a Category
// This is more robust than checking 'sub_categories' in data[0] because:
// 1. Some categories might not have sub_categories field at all
// 2. Categories can be identified by having either sub_categories OR menu_list
const isCategory = (item: any): item is Category => {
  return item && typeof item === 'object' && 'title' in item && 
    (item.sub_categories !== undefined || item.menu_list !== undefined);
};

export const MenuItems: React.FC<{ 
  data: (SubCategory | Food)[] | Category[];
  showCategoryHeaders?: boolean;
}> = ({
  data,
  showCategoryHeaders = false,
}) => {
  // Check if we have categories by examining the data structure
  const hasCategories = showCategoryHeaders && data.length > 0 && isCategory(data[0]);
  
  // If we're showing category headers and data contains categories
  if (hasCategories) {
    const categories = data as Category[];
    
    return (
      <div className="flex flex-col max-w-md mx-auto mt-8 gap-12 w-full h-full custom-scrollbar-container">
        {categories.map((category, categoryIndex) => (
          <CategoryRenderer
            key={category._id}
            category={category}
            categoryIndex={categoryIndex}
          />
        ))}
        
        {(!data || data?.length === 0) && (
          <EmptyState showCategoryHeaders={true} />
        )}
      </div>
    );
  }
  
  // Original flat list rendering
  const items = data as (SubCategory | Food)[];
  return (
    <ul className="flex flex-col max-w-md mx-auto mt-8 gap-5 w-full h-full custom-scrollbar-container">
      {items?.map((item, index) => (
        <MenuItem key={`${item._id}-${index}`} item={item} />
      ))}
      {(!data || data?.length === 0) && (
        <EmptyState showCategoryHeaders={false} />
      )}
    </ul>
  );
};