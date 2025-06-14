import MenuItem from "./MenuItem";

interface DirectItemsRendererProps {
  category: Category;
  categoryIndex: number;
  hasSubcategories: boolean;
  headerText: string;
}

export const DirectItemsRenderer: React.FC<DirectItemsRendererProps> = ({
  category,
  categoryIndex,
  hasSubcategories,
  headerText
}) => {
  return (
    <div className={`flex flex-col gap-4 ${hasSubcategories ? 'mt-8' : ''}`}>
      {/* Add a header for direct items if they exist alongside subcategories */}
      {hasSubcategories && (
        <div className="text-center border-b pb-3">
          <h3 className="font-recoleta text-xl font-medium text-primary tracking-tight">
            {headerText}
          </h3>
        </div>
      )}
      <ul className="flex flex-col gap-6">
        {category.menu_list!.map((item, index) => (
          <MenuItem key={`${item._id}-${categoryIndex}-direct-${index}`} item={item} />
        ))}
      </ul>
    </div>
  );
};