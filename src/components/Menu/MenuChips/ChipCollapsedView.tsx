import { Badge } from "@/components/ui/badge";
import { X, ChevronDown } from "lucide-react";

interface ChipCollapsedViewProps {
  containerRef: React.RefObject<HTMLDivElement>;
  locale: string;
  selectedCategories: string[];
  selectedCategoryNames: string[];
  visibleCount: number;
  showAllActive: boolean;
  hasFilters: boolean;
  onExpand: () => void;
  onClearAll: () => void;
}

export const ChipCollapsedView: React.FC<ChipCollapsedViewProps> = ({
  containerRef,
  locale,
  selectedCategories,
  selectedCategoryNames,
  visibleCount,
  showAllActive,
  hasFilters,
  onExpand,
  onClearAll
}) => {
  return (
    <div 
      ref={containerRef}
      className="flex items-center justify-between gap-2 p-2.5 bg-muted/50 rounded-lg animate-slideIn"
    >
      <button
        onClick={onExpand}
        className="flex items-center gap-2 flex-1 overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
      >
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {locale === 'sv' ? 'Filter:' : 'Filter:'}
        </span>
        <div className="flex gap-1.5 items-center">
          {selectedCategories.length === 0 ? (
            <Badge variant="outline" className="text-xs px-2.5 py-0.5 whitespace-nowrap">
              {locale === 'sv' ? 'Alla' : 'All'}
            </Badge>
          ) : showAllActive ? (
            <Badge variant="default" className="text-xs px-2.5 py-0.5 whitespace-nowrap">
              {locale === 'sv' ? 'Alla' : 'All'}
            </Badge>
          ) : (
            <>
              {selectedCategoryNames.slice(0, visibleCount).map((name, i) => (
                <Badge key={i} variant="default" className="text-xs px-2.5 py-0.5 whitespace-nowrap">
                  {name}
                </Badge>
              ))}
              {selectedCategoryNames.length > visibleCount && (
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  +{selectedCategoryNames.length - visibleCount}
                </span>
              )}
            </>
          )}
        </div>
      </button>
      <div className="flex items-center gap-2 shrink-0">
        {hasFilters && (
          <button
            onClick={onClearAll}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          onClick={onExpand}
          aria-label={locale === 'sv' ? 'Ändra filter' : 'Change filters'}
          className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
        >
          <span className="hidden sm:inline">{locale === 'sv' ? 'Ändra' : 'Change'}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};