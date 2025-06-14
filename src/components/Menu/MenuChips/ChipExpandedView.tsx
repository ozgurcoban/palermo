import { Badge } from "@/components/ui/badge";
import { ChipFilterHeader } from "./ChipFilterHeader";

interface ChipExpandedViewProps {
  locale: string;
  categories: Category[];
  selectedCategories: string[];
  isAllSelected: boolean;
  hasFilters: boolean;
  onCategoryToggle: (categoryId: string) => void;
  onClearAll: () => void;
  onCollapse: () => void;
  onActivateShowAll: () => void;
  onDeactivateShowAll: () => void;
  onSetInteracted: () => void;
}

export const ChipExpandedView: React.FC<ChipExpandedViewProps> = ({
  locale,
  categories,
  selectedCategories,
  isAllSelected,
  hasFilters,
  onCategoryToggle,
  onClearAll,
  onCollapse,
  onActivateShowAll,
  onDeactivateShowAll,
  onSetInteracted
}) => {
  const handleClearAll = () => {
    onClearAll();
    onDeactivateShowAll();
  };

  const handleShowAll = () => {
    onClearAll();
    onActivateShowAll();
  };

  const handleCategoryToggle = (categoryId: string) => {
    onSetInteracted();
    onCategoryToggle(categoryId);
    onDeactivateShowAll();
  };

  return (
    <>
      <ChipFilterHeader
        locale={locale}
        hasFilters={hasFilters}
        isAllSelected={isAllSelected}
        onClearAll={handleClearAll}
        onCollapse={onCollapse}
      />
      
      <div className="flex flex-wrap gap-2">
        {/* "Alla" chip */}
        <button
          onClick={handleShowAll}
          className="focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-full chip-button"
        >
          <Badge
            variant={isAllSelected ? "default" : "outline"}
            className={`cursor-pointer transition-all duration-200 hover:scale-105 px-4 py-2 text-sm font-medium ${
              isAllSelected 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "border-2 hover:border-primary/50 hover:bg-primary/5"
            }`}
          >
            {locale === 'sv' ? 'Alla' : 'All'}
          </Badge>
        </button>

        {/* Category chips */}
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category._id);
          
          return (
            <button
              key={category._id}
              onClick={() => handleCategoryToggle(category._id)}
              className="focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-full chip-button"
            >
              <Badge
                variant={isSelected ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 px-4 py-2 text-sm font-medium ${
                  isSelected 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "border-2 hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                {category.title[locale as keyof typeof category.title]}
              </Badge>
            </button>
          );
        })}
      </div>

      {/* Filter count indicator */}
      {hasFilters && !isAllSelected && (
        <div className="mt-3 text-xs text-muted-foreground animate-slideIn">
          {locale === 'sv' 
            ? `Visar ${selectedCategories.length} av ${categories.length} kategorier`
            : `Showing ${selectedCategories.length} of ${categories.length} categories`}
        </div>
      )}
    </>
  );
};