import { token } from "../../../../../sanity/lib/token";
import { draftMode } from "next/headers";
import { getClient } from "../../../../../sanity/lib/client";
import { CATEGORIES_QUERY } from "../../../../../sanity/lib/queries";
import PreviewProvider from "@/components/PreviewProvider";
import PreviewMenuPage from "@/components/PagesComponents/MenuPage/PreviewMenuPage";
import MenuComponents from "@/components/PagesComponents/MenuPage/MenuComponents";
import { notFound } from "next/navigation";
import { locales } from "@/config";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

export default async function MenuPage({ params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);
  const isDraft = draftMode().isEnabled;
  const client = getClient(isDraft ? token : undefined);
  const categoriesData = await client.fetch<Category[]>(CATEGORIES_QUERY);

  if (isDraft)
    return (
      <PreviewProvider token={token}>
        <PreviewMenuPage categoriesData={categoriesData} />
      </PreviewProvider>
    );

  return <MenuComponents categoriesData={categoriesData} />;
}
