// Enhanced type definitions for Menu components

export interface MenuChipsProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
  onClearAll: () => void;
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

export interface ChipExpansionState {
  isExpanded: boolean;
  showAllActive: boolean;
  justInteracted: boolean;
}

export interface ChipVisibilityState {
  visibleCount: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

export interface MenuRenderingHelpers {
  locale: string;
  getCategoryDisplayName: (selectedCategories: string[], categories: Category[]) => string[];
  getHeaderText: (categoryId: string, categoryTitle: any) => string;
  getFilterLabel: () => string;
  getAllLabel: () => string;
  getChangeLabel: () => string;
  getClearFilterLabel: () => string;
  getCloseLabel: () => string;
  getCategoriesLabel: () => string;
  getFilterCountText: (selectedCount: number, totalCount: number) => string;
}

export interface CategoryRendererProps {
  category: Category;
  categoryIndex: number;
}

export interface SubCategoryRendererProps {
  subCategory: SubCategory;
  categoryIndex: number;
  subIndex: number;
}

export interface DirectItemsRendererProps {
  category: Category;
  categoryIndex: number;
  hasSubcategories: boolean;
  headerText: string;
}

export interface EmptyStateProps {
  showCategoryHeaders?: boolean;
  message?: string;
}