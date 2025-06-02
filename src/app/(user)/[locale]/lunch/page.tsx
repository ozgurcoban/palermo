import { draftMode } from "next/headers";
import { token } from "../../../../../sanity/lib/token";
import { LUNCH_QUERY } from "../../../../../sanity/lib/queries";
import { getClient } from "../../../../../sanity/lib/client";
import PreviewProvider from "@/components/PreviewProvider";
import LunchComponents from "@/components/PagesComponents/LunchPage/LunchComponents";
import PreviewLunchPage from "@/components/PagesComponents/LunchPage/PreviewLunchPage";

import { locales } from "@/config";
import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { constructMetadata } from "@/lib/metadata";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "Metadata.lunch" });
  
  return constructMetadata({
    title: t("title"),
    description: t("description"),
    locale,
  });
}

export default async function LunchPage({ params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  const isDraft = draftMode().isEnabled;
  const client = getClient(isDraft ? token : undefined);

  const lunchData = await client.fetch<LunchConfiguration>(LUNCH_QUERY);

  if (isDraft)
    return (
      <PreviewProvider token={token}>
        <PreviewLunchPage lunchData={lunchData} />
      </PreviewProvider>
    );

  return <LunchComponents lunchData={lunchData} />;
}
