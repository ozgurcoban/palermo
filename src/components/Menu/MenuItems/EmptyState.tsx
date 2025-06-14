interface EmptyStateProps {
  showCategoryHeaders?: boolean;
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  showCategoryHeaders = false, 
  message = "No menu list available" 
}) => {
  const containerClass = showCategoryHeaders ? "text-center col-span-2" : "text-center col-span-2";
  const elementType = showCategoryHeaders ? "div" : "li";

  const Element = elementType as keyof JSX.IntrinsicElements;

  return (
    <Element className={`${containerClass} text-rose-700 text-lg`}>
      {message}
    </Element>
  );
};