import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";
import { locales } from "@/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { teko, lobster, lato } from "../fonts";
import IntlProvider from "@/providers/IntlProvider";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${lato.variable} ${teko.variable} ${lobster.variable}`}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden">
        <IntlProvider params={{ locale }}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </IntlProvider>
      </body>
    </html>
  );
}
