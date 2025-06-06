import React from "react";
import MenuItem from "./MenuItem";
import { useGetLocale } from "@/config";

export const MenuItems: React.FC<{ 
  data: (SubCategory | Food)[] | Category[];
  showCategoryHeaders?: boolean;
}> = ({
  data,
  showCategoryHeaders = false,
}) => {
  const locale = useGetLocale();
  
  // If we're showing category headers, data is Category[]
  if (showCategoryHeaders && data.length > 0 && 'sub_categories' in data[0]) {
    const categories = data as Category[];
    
    return (
      <div className="flex flex-col max-w-md mx-auto mt-8 gap-12 w-full h-full custom-scrollbar-container">
        {categories.map((category, categoryIndex) => (
          <div key={category._id} className="flex flex-col gap-5">
            {/* Category Header */}
            <div className="text-center border-b pb-3">
              <h3 className="font-recoleta text-xl font-medium text-primary tracking-tight">
                {category.title[locale]}
              </h3>
            </div>
            
            {/* Category Items */}
            <ul className="flex flex-col gap-6">
              {/* Render subcategories */}
              {category.sub_categories?.map((item, index) => (
                <MenuItem key={`${item._id}-${categoryIndex}-${index}`} item={item} />
              ))}
              
              {/* Render direct menu items */}
              {category.menu_list?.map((item, index) => (
                <MenuItem key={`${item._id}-${categoryIndex}-${index}`} item={item} />
              ))}
            </ul>
          </div>
        ))}
        
        {(!data || data?.length === 0) && (
          <div className="text-center col-span-2 text-rose-700 text-lg">
            No menu list available
          </div>
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
        <li className="text-center col-span-2 text-rose-700 text-lg">
          No menu list available
        </li>
      )}
    </ul>
  );
};
