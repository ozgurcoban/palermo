import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { locales } from "@/config";
import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { lato, recoleta, graduate } from "@/lib/fonts";
import IntlProvider from "@/providers/IntlProvider";
import ContactInfoSectionLazy from "@/components/Contact/ContactInfoSectionLazy";
import { Toaster } from "@/components/ui/toaster";
import { CONTACT_QUERY, LUNCH_QUERY } from "../../../../sanity/lib/queries";
import { getClient } from "../../../../sanity/lib/client";
import { generateRestaurantSchema } from "@/lib/metadata";
import Script from "next/script";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { CookieBanner } from "@/components/CookieBanner";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LanguageSwitchChecker } from "@/components/LanguageSwitchChecker";
import { criticalCSS } from "@/lib/critical-css";
import MobileBottomBar from "@/components/MobileBottomBar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export const revalidate = 60; // 1 minute

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
  
  // Check for language switch cookie
  const cookieStore = cookies();
  const isLanguageSwitching = cookieStore.get("langSwitch")?.value === "true";

  return (
    <html
      lang={locale}
      className={`${lato.variable} ${recoleta.variable} ${graduate.variable} ${isLanguageSwitching ? "no-animations" : ""}`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <script dangerouslySetInnerHTML={{__html: `
          // Check for language switch immediately before React hydration
          if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('langSwitch') === 'true') {
            document.documentElement.classList.add('no-animations');
            // Don't remove here - let React component handle it properly
          }
        `}} />
      </head>
      <body className="overflow-x-hidden">
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && <GoogleAnalytics />}
        <SpeedInsights />
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
            <LanguageSwitchChecker />
            <Toaster />
            <Navbar />
            <main>
              {children}
              <ContactInfoSectionLazy contactData={contactData} lunchData={lunchData} />
            </main>
            <Footer contactData={contactData} />
            <MobileBottomBar />
            <CookieBanner />
          </IntlProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
