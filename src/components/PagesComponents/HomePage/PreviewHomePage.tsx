"use client";
import { useLiveQuery } from "next-sanity/preview";
import { useGetLocale } from "@/config";

import { CATEGORIES_QUERY, HOME_QUERY } from "../../../../sanity/lib/queries";
import HomeComponentsOptimized from "./HomeComponentsOptimized";
import { INewsItem } from "@/types/generated";

export default function PreviewHomePage({
  homeData,
  news,
  categoriesData,
}: {
  homeData: HomePage;
  news: INewsItem[];
  categoriesData: Category[];
  lunchData?: LunchConfiguration;
}) {
  const locale = useGetLocale();
  const [data] = useLiveQuery<HomePage>(homeData, HOME_QUERY);
  const [categories] = useLiveQuery<Category[]>(
    categoriesData,
    CATEGORIES_QUERY,
  );

  return (
    <HomeComponentsOptimized homeData={data} news={news} categoriesData={categories} locale={locale} />
  );
}
