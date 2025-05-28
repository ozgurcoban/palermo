"use client";
import { useLiveQuery } from "next-sanity/preview";

import { CATEGORIES_QUERY, HOME_QUERY } from "../../../../sanity/lib/queries";
import HomeComponents from "./HomeComponents";
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
  const [data] = useLiveQuery<HomePage>(homeData, HOME_QUERY);
  const [categories] = useLiveQuery<Category[]>(
    categoriesData,
    CATEGORIES_QUERY,
  );

  return (
    <HomeComponents homeData={data} news={news} categoriesData={categories} />
  );
}
