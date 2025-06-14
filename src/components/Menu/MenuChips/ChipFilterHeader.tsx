import { X, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";

interface ChipFilterHeaderProps {
  locale: string;
  hasFilters: boolean;
  isAllSelected: boolean;
  onClearAll: () => void;
  onCollapse: () => void;
}

export const ChipFilterHeader: React.FC<ChipFilterHeaderProps> = ({
  locale,
  hasFilters,
  isAllSelected,
  onClearAll,
  onCollapse
}) => {
  const t = useTranslations("Home.Menu");

  return (
    <div className="mb-4 flex items-center justify-between">
      <span className="text-sm font-medium text-primary uppercase tracking-wide">
        {t("categories")}
      </span>
      <div className="flex items-center gap-3">
        {hasFilters && !isAllSelected && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-all duration-200 animate-scaleIn"
          >
            <X className="h-3 w-3" />
            {locale === 'sv' ? 'Rensa filter' : 'Clear filter'}
          </button>
        )}
        {hasFilters && (
          <button
            onClick={onCollapse}
            aria-label={locale === 'sv' ? 'Stäng filter' : 'Close filters'}
            className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};