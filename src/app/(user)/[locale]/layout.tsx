import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";
import { locales } from "@/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { lobster, lato, recoleta, graduate } from "@/lib/fonts";
import IntlProvider from "@/providers/IntlProvider";
import ContactInfoSection from "@/components/Contact/ContactInfoSection";
import { Toaster } from "@/components/ui/toaster";
import ScrollTop from "@/components/ScrollTop";
import { CONTACT_QUERY, LUNCH_QUERY } from "../../../../sanity/lib/queries";
import { getClient } from "../../../../sanity/lib/client";
import { generateRestaurantSchema } from "@/lib/metadata";
import Script from "next/script";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { CookieBanner } from "@/components/CookieBanner";
import { criticalCSS } from "@/lib/critical-css";
import { ThemeProvider } from "@/providers/ThemeProvider";

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
  const lunchData = await client.fetch<LunchConfiguration>(LUNCH_QUERY);

  const restaurantSchema = generateRestaurantSchema(locale as "sv" | "en");

  return (
    <html
      lang={locale}
      className={` ${lato.variable} ${lobster.variable} ${recoleta.variable} ${graduate.variable} `}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="/_next/image" />
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      </head>
      <body className="overflow-x-hidden">
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && <GoogleAnalytics />}
        <Script
          id="restaurant-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <IntlProvider params={{ locale }}>
            <Toaster />
            <Navbar />
            <ScrollTop />
            <main>
              {children}
              <ContactInfoSection contactData={contactData} lunchData={lunchData} />
            </main>
            <Footer contactData={contactData} />
            <CookieBanner />
          </IntlProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
