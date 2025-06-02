import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { constructMetadata } from "@/lib/metadata";

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "NotFoundPage" });
  
  return constructMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    noIndex: true, // Vi vill inte att 404-sidor indexeras
  });
}

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");

  return (
    <main className="h-screen grid place-items-center">
      <h2 className="text-xl">{t("title")}</h2>
      <p className="max-w-[460px]">{t("description")}</p>
    </main>
  );
}
