import { useGetLocale } from "@/config";

export const useMenuRendering = () => {
  const locale = useGetLocale();

  const getCategoryDisplayName = (selectedCategories: string[], categories: Category[]) => {
    return selectedCategories
      .map(selectedId => categories.find(cat => cat._id === selectedId))
      .filter(Boolean)
      .map(cat => cat!.title[locale]);
  };

  const getHeaderText = (categoryId: string, categoryTitle: any) => {
    if (categoryId === 'pizza' || categoryTitle.en.toLowerCase() === 'pizza') {
      return locale === 'sv' ? 'Extra ingredienser' : 'Extra ingredients';
    }
    return locale === 'sv' ? 'Övriga alternativ' : 'Other options';
  };

  const getFilterLabel = () => locale === 'sv' ? 'Filter:' : 'Filter:';
  const getAllLabel = () => locale === 'sv' ? 'Alla' : 'All';
  const getChangeLabel = () => locale === 'sv' ? 'Ändra' : 'Change';
  const getClearFilterLabel = () => locale === 'sv' ? 'Rensa filter' : 'Clear filter';
  const getCloseLabel = () => locale === 'sv' ? 'Stäng filter' : 'Close filters';
  const getCategoriesLabel = () => locale === 'sv' ? 'kategorier' : 'categories';
  
  const getFilterCountText = (selectedCount: number, totalCount: number) => {
    return locale === 'sv' 
      ? `Visar ${selectedCount} av ${totalCount} kategorier`
      : `Showing ${selectedCount} of ${totalCount} categories`;
  };


  return {
    locale,
    getCategoryDisplayName,
    getHeaderText,
    getFilterLabel,
    getAllLabel,
    getChangeLabel,
    getClearFilterLabel,
    getCloseLabel,
    getCategoriesLabel,
    getFilterCountText
  };
};