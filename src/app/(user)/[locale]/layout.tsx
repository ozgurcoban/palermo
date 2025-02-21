import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";
import { locales } from "@/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { lobster, lato, recoleta, lobsterTwo } from "@/lib/fonts";
import IntlProvider from "@/providers/IntlProvider";
import ContactInfoSection from "@/components/Contact/ContactInfoSection";
import { Toaster } from "@/components/ui/toaster";
import ScrollTop from "@/components/ScrollTop";
import { CONTACT_QUERY } from "../../../../sanity/lib/queries";
import { getClient } from "../../../../sanity/lib/client";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export const revalidate = 30;

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

  const client = getClient(undefined);

  const contactData = await client.fetch<Contact>(CONTACT_QUERY);

  return (
    <html
      lang={locale}
      className={`${lobsterTwo.variable} ${lato.variable} ${lobster.variable} ${recoleta.variable}`}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden">
        <IntlProvider params={{ locale }}>
          <Toaster />
          <Navbar />
          <ScrollTop />
          <main>
            {children}
            <ContactInfoSection contactData={contactData} />
          </main>
          <Footer contactData={contactData} />
        </IntlProvider>
      </body>
    </html>
  );
}
