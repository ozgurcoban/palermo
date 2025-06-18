"use client";
import { useLiveQuery } from "next-sanity/preview";
import { useGetLocale } from "@/config";

import { CATEGORIES_QUERY, HOME_QUERY } from "../../../../sanity/lib/queries";
import HomeComponents from "./HomeComponents";

export default function PreviewHomePage({
  homeData,
  categoriesData,
}: {
  homeData: HomePage;
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
    <HomeComponents homeData={data} categoriesData={categories} locale={locale} />
  );
}
