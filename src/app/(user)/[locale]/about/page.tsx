import { draftMode } from "next/headers";
import { token } from "../../../../../sanity/lib/token";
import { ABOUT_QUERY } from "../../../../../sanity/lib/queries";
import { getClient } from "../../../../../sanity/lib/client";
import PreviewProvider from "@/components/PreviewProvider";
import PreviewAboutPage from "@/components/PagesComponents/AboutPage/PreviewAboutPage";
import AboutComponents from "@/components/PagesComponents/AboutPage/AboutComponents";
import { locales } from "@/config";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

export default async function AboutPage({ params: { locale } }: Props) {
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
