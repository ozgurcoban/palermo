import React from "react";
import { useGetLocale } from "@/config";

interface MenuHeaderProps {
  category: Category | null | undefined;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({ category }) => {
  const locale = useGetLocale();

  if (!category) return null;

  return (
    <div className="mx-auto mb-6 max-w-md" key={category._id}>
      <h2 className="mb-3 text-center font-recoleta text-3xl font-medium text-primary">
        {category.title[locale]}
      </h2>
      {category.description && (
        <p className="text-justify text-muted-foreground">
          {category.description[locale]}
        </p>
      )}
    </div>
  );
};