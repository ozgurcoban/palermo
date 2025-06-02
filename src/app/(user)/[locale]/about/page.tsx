import { draftMode } from "next/headers";
import { token } from "../../../../../sanity/lib/token";
import { ABOUT_QUERY } from "../../../../../sanity/lib/queries";
import { getClient } from "../../../../../sanity/lib/client";
import PreviewProvider from "@/components/PreviewProvider";
import PreviewAboutPage from "@/components/PagesComponents/AboutPage/PreviewAboutPage";
import AboutComponents from "@/components/PagesComponents/AboutPage/AboutComponents";
import { locales } from "@/config";
import { notFound, redirect } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { constructMetadata } from "@/lib/metadata";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  // Använd fallback metadata eftersom sidan redirectar
  const t = await getTranslations({ locale, namespace: "Metadata" });
  
  return constructMetadata({
    title: locale === "sv" ? "Om oss - Palermo Uppsala" : "About Us - Palermo Uppsala",
    description: t("description"),
    locale,
    noIndex: true, // Eftersom sidan redirectar
  });
}

export default async function AboutPage({ params: { locale } }: Props) {
  // Temporarily redirect to home page
  redirect(`/${locale}`);
  
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);
  const isDraft = draftMode().isEnabled;
  const client = getClient(isDraft ? token : undefined);

  const aboutData = await client.fetch<AboutPage>(ABOUT_QUERY);

  if (isDraft)
    return (
      <PreviewProvider token={token}>
        <PreviewAboutPage aboutData={aboutData} />
      </PreviewProvider>
    );

  return <AboutComponents aboutData={aboutData} />;
}
