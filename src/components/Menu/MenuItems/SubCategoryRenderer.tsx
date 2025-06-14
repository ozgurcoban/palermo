import MenuItem from "./MenuItem";
import { useMenuRendering } from "@/hooks/menu";

interface SubCategoryRendererProps {
  subCategory: SubCategory;
  categoryIndex: number;
  subIndex: number;
}

export const SubCategoryRenderer: React.FC<SubCategoryRendererProps> = ({
  subCategory,
  categoryIndex,
  subIndex
}) => {
  const { locale } = useMenuRendering();
  

  return (
    <div className="flex flex-col gap-4" data-subcategory-id={subCategory._id}>
      {/* Subcategory header */}
      <div className="text-center border-b pb-3">
        <h3 className="font-recoleta text-xl font-medium text-primary tracking-tight">
          {subCategory.title[locale as keyof typeof subCategory.title]}
        </h3>
      </div>
      {/* Subcategory items */}
      <ul className="flex flex-col gap-6">
        {subCategory.menu_list?.map((item, index) => (
          <MenuItem key={`${item._id}-${categoryIndex}-${subIndex}-${index}`} item={item} />
        ))}
      </ul>
    </div>
  );
};