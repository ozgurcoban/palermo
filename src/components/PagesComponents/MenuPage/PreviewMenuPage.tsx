"use client";
import { useLiveQuery } from "next-sanity/preview";

import { CATEGORIES_QUERY } from "../../../../sanity/lib/queries";
import MenuComponents from "./MenuComponents";

export default function PreviewMenuPage({
  categoriesData,
}: {
  categoriesData: Category[];
}) {
  const [categories] = useLiveQuery<Category[]>(
    categoriesData,
    CATEGORIES_QUERY
  );

  return <MenuComponents categoriesData={categories} />;
}
