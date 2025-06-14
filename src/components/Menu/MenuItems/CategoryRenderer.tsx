import { SubCategoryRenderer } from "./SubCategoryRenderer";
import { DirectItemsRenderer } from "./DirectItemsRenderer";
import { useMenuRendering } from "@/hooks/menu";
import { isPizzaCategoryById } from "../menuRenderingUtils";

interface CategoryRendererProps {
  category: Category;
  categoryIndex: number;
}

export const CategoryRenderer: React.FC<CategoryRendererProps> = ({ 
  category, 
  categoryIndex 
}) => {
  const { locale } = useMenuRendering();
  
  // Use centralized pizza detection for header text
  const getHeaderText = (categoryId: string, categoryTitle: any) => {
    if (isPizzaCategoryById(categoryId, categoryTitle)) {
      return locale === 'sv' ? 'Extra ingredienser' : 'Extra ingredients';
    }
    return locale === 'sv' ? 'Övriga alternativ' : 'Other options';
  };

  return (
    <div key={category._id} className="flex flex-col gap-5" data-category-id={category._id}>
      {/* Show category header only if category has no subcategories (like Förrätter) */}
      {(!category.sub_categories || category.sub_categories.length === 0) && (
        <div className="text-center border-b pb-3">
          <h3 className="font-recoleta text-xl font-medium text-primary tracking-tight">
            {category.title[locale as keyof typeof category.title]}
          </h3>
        </div>
      )}
      
      {/* Category Items */}
      <div className="flex flex-col gap-6">
        {/* Render subcategories with their own headers */}
        {category.sub_categories?.map((subCategory, subIndex) => (
          <SubCategoryRenderer
            key={`${subCategory._id}-${categoryIndex}-${subIndex}`}
            subCategory={subCategory}
            categoryIndex={categoryIndex}
            subIndex={subIndex}
          />
        ))}
        
        {/* Render direct menu items with extra spacing if there are subcategories */}
        {category.menu_list && category.menu_list.length > 0 && (
          <DirectItemsRenderer
            category={category}
            categoryIndex={categoryIndex}
            hasSubcategories={!!(category.sub_categories && category.sub_categories.length > 0)}
            headerText={getHeaderText(category._id, category.title)}
          />
        )}
      </div>
    </div>
  );
};