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
            {/* Show category header only if category has no subcategories (like Förrätter) */}
            {(!category.sub_categories || category.sub_categories.length === 0) && (
              <div className="text-center border-b pb-3">
                <h3 className="font-recoleta text-xl font-medium text-primary tracking-tight">
                  {category.title[locale]}
                </h3>
              </div>
            )}
            
            {/* Category Items */}
            <div className="flex flex-col gap-6">
              {/* Render subcategories with their own headers */}
              {category.sub_categories?.map((subCategory, subIndex) => (
                <div key={`${subCategory._id}-${categoryIndex}-${subIndex}`} className="flex flex-col gap-4">
                  {/* Subcategory header */}
                  <div className="text-center border-b pb-3">
                    <h3 className="font-recoleta text-xl font-medium text-primary tracking-tight">
                      {subCategory.title[locale]}
                    </h3>
                  </div>
                  {/* Subcategory items */}
                  <ul className="flex flex-col gap-6">
                    {subCategory.menu_list?.map((item, index) => (
                      <MenuItem key={`${item._id}-${categoryIndex}-${subIndex}-${index}`} item={item} />
                    ))}
                  </ul>
                </div>
              ))}
              
              {/* Render direct menu items with extra spacing if there are subcategories */}
              {category.menu_list && category.menu_list.length > 0 && (
                <div className={`flex flex-col gap-4 ${category.sub_categories && category.sub_categories.length > 0 ? 'mt-8' : ''}`}>
                  {/* Add a header for direct items if they exist alongside subcategories */}
                  {category.sub_categories && category.sub_categories.length > 0 && (
                    <div className="text-center border-b pb-3">
                      <h3 className="font-recoleta text-xl font-medium text-primary tracking-tight">
                        {category._id === 'pizza' || category.title.en.toLowerCase() === 'pizza' 
                          ? (locale === 'sv' ? 'Extra ingredienser' : 'Extra ingredients')
                          : (locale === 'sv' ? 'Övriga alternativ' : 'Other options')}
                      </h3>
                    </div>
                  )}
                  <ul className="flex flex-col gap-6">
                    {category.menu_list.map((item, index) => (
                      <MenuItem key={`${item._id}-${categoryIndex}-direct-${index}`} item={item} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
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
