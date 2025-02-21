import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/config";
import { getNews } from "@/lib/getNews";
import { INewsItem } from "@/types/generated";
import { draftMode } from "next/headers";
import { token } from "../../../../sanity/lib/token";
import { getClient } from "../../../../sanity/lib/client";
import { CATEGORIES_QUERY, HOME_QUERY } from "../../../../sanity/lib/queries";
import PreviewProvider from "@/components/PreviewProvider";
import HomeComponents from "@/components/PagesComponents/HomePage/HomeComponents";
import PreviewHomePage from "@/components/PagesComponents/HomePage/PreviewHomePage";

type Props = {
  params: { locale: string };
};

export default async function IndexPage({ params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  const news: { data: INewsItem[] } = await getNews();

  const isDraft = draftMode().isEnabled;
  const client = getClient(isDraft ? token : undefined);

  const homeData = await client.fetch<HomePage>(HOME_QUERY);
  const categoriesData = await client.fetch<Category[]>(CATEGORIES_QUERY);

  if (isDraft)
    return (
      <PreviewProvider token={token}>
        <PreviewHomePage
          homeData={homeData}
          news={news.data}
          categoriesData={categoriesData}
        />
      </PreviewProvider>
    );

  return (
    <HomeComponents
      homeData={homeData}
      news={news.data}
      categoriesData={categoriesData}
    />
  );
}
