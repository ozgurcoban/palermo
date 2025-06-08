import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/config";
import { draftMode } from "next/headers";
import { token } from "../../../../sanity/lib/token";
import { getClient } from "../../../../sanity/lib/client";
import { CATEGORIES_QUERY, HOME_QUERY } from "../../../../sanity/lib/queries";
import PreviewProvider from "@/components/PreviewProvider";
import HomeComponentsOptimized from "@/components/PagesComponents/HomePage/HomeComponentsOptimized";
import PreviewHomePage from "@/components/PagesComponents/HomePage/PreviewHomePage";
import { constructMetadata } from "@/lib/metadata";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "Metadata.home" });
  
  return constructMetadata({
    title: t("title"),
    description: t("description"),
    locale,
  });
}

export default async function IndexPage({ params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);


  const isDraft = draftMode().isEnabled;
  const client = getClient(isDraft ? token : undefined);

  const homeData = await client.fetch<HomePage>(HOME_QUERY);
  const categoriesData = await client.fetch<Category[]>(CATEGORIES_QUERY);

  if (isDraft)
    return (
      <PreviewProvider token={token}>
        <PreviewHomePage
          homeData={homeData}
          categoriesData={categoriesData}
        />
      </PreviewProvider>
    );

  return (
    <HomeComponentsOptimized
      homeData={homeData}
      categoriesData={categoriesData}
      locale={locale}
    />
  );
}
