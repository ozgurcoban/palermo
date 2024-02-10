import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";
import { locales } from "@/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { lobster, lato, recoleta } from "@/lib/fonts";
import IntlProvider from "@/providers/IntlProvider";
import ContactInfoSection from "@/components/Contact/ContactInfoSection";
import { Toaster } from "@/components/ui/toaster";
import ScrollTop from "@/components/ScrollTop";

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
      className={`${lato.variable} ${lobster.variable} ${recoleta.variable}`}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden">
        <IntlProvider params={{ locale }}>
          <Toaster />
          <Navbar />
          <ScrollTop />
          <main>
            {children}
            <ContactInfoSection />
          </main>
          <Footer />
        </IntlProvider>
      </body>
    </html>
  );
}
