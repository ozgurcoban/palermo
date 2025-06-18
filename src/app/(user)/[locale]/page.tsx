import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/config";
import { draftMode } from "next/headers";
import { token } from "../../../../sanity/lib/token";
import { getClient } from "../../../../sanity/lib/client";
import { CATEGORIES_QUERY, HOME_QUERY, FAQ_QUERY, CONTACT_QUERY, LUNCH_QUERY } from "../../../../sanity/lib/queries";
import PreviewProvider from "@/components/PreviewProvider";
import { HomeComponents, PreviewHomePage } from "@/components/PagesComponents/HomePage";
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

export const revalidate = 60; // 1 minute

export default async function IndexPage({ params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);


  const isDraft = draftMode().isEnabled;
  const client = getClient(isDraft ? token : undefined);

  const [homeData, categoriesData, faqData, contactData, lunchData] = await Promise.all([
    client.fetch<HomePage>(HOME_QUERY),
    client.fetch<Category[]>(CATEGORIES_QUERY),
    client.fetch<FAQ>(FAQ_QUERY),
    client.fetch<Contact>(CONTACT_QUERY),
    client.fetch<LunchConfiguration>(LUNCH_QUERY),
  ]);

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
    <HomeComponents
      homeData={homeData}
      categoriesData={categoriesData}
      locale={locale}
      faqData={faqData}
      contactData={contactData}
      lunchData={lunchData}
    />
  );
}
