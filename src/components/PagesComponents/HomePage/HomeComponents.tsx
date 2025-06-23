import React from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import { generateFAQSchema } from "@/lib/metadata";
import { HomeHero } from "@/components/Heros";
import { MenuSkeleton } from "@/components/Menu";
import { IntroSection } from "@/components/IntroSection";
import { useTranslations } from "next-intl";
import MaskText from "@/components/ui/MaskText";
import FadeUp from "@/components/ui/FadeUp";

// Dynamic imports for below-the-fold components
const Gallery = dynamic(() => import("@/components/Gallery"), {
  loading: () => <div className="h-[600px] animate-pulse bg-gray-100" />,
  ssr: true,
});

const FAQ = dynamic(
  () => import("@/components/FAQ").then((mod) => ({ default: mod.FAQ })),
  {
    loading: () => <div className="h-[400px] animate-pulse bg-gray-50" />,
    ssr: true,
  },
);

// Dynamic import for Menu with SSR enabled for better iOS compatibility
const Menu = dynamic(
  () =>
    import("@/components/Menu").then((mod) => ({
      default: mod.Menu,
    })),
  {
    loading: () => <MenuSkeleton />,
    ssr: true, // Enable SSR for better iOS browser compatibility
  },
);

type Props = {
  homeData: HomePage;
  categoriesData: Category[];
  locale: string;
  faqData?: FAQ;
  contactData?: Contact;
  lunchData?: LunchConfiguration;
};

const HomeComponents: React.FC<Props> = ({
  homeData,
  categoriesData,
  locale,
  faqData,
  contactData,
  lunchData,
}) => {
  // Generate opening hours string from contact data
  let openingHours: string | undefined;
  if (contactData?.opening_hours) {
    const intro =
      locale === "sv" ? "Vi har öppet alla dagar!" : "We are open every day!";
    const hours = contactData.opening_hours
      .map((hour) => `${hour.day[locale as keyof LocalizedText]}: ${hour.time}`)
      .join("\n");
    openingHours = `${intro}\n${hours}`;
  }

  // Generate lunch info string from lunch data
  let lunchInfo: string | undefined;
  if (lunchData) {
    const lunchPrice = lunchData.dagensLunch?.price || 119;
    const timeInfo = lunchData.timeInfo;
    const numberOfDishes = lunchData.dagensLunch?.items?.length || 9;
    const numberOfPizzas =
      lunchData.lunchPizza?.subcategoryRef?.menu_list?.length || 24;
    const totalDishes = numberOfDishes + 1;

    if (locale === "sv") {
      lunchInfo =
        `Lunch kostar från ${lunchPrice} kr och serveras vardagar ${timeInfo?.hours || "11:00-15:00"}. ` +
        `I priset ingår huvudrätt, sallad, bröd och kaffe. ` +
        `Välj mellan ${totalDishes} olika rätter eller ${numberOfPizzas}st lunchpizza.`;
    } else {
      lunchInfo =
        `Our weekday lunch special is from ${lunchPrice} SEK, served ${timeInfo?.hours || "11:00-15:00"}. ` +
        `It includes a main course, plus salad bar, bread and coffee. ` +
        `Pick from ${totalDishes} daily classics or any of our ${numberOfPizzas} lunch pizzas.`;
    }
  }

  const faqSchema = generateFAQSchema(
    locale as "sv" | "en",
    openingHours,
    lunchInfo,
    faqData,
  );

  const { gallery_section, intro_section } = homeData;
  const t = useTranslations("Home");

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeHero />
      <IntroSection data={intro_section} />
      <section className="w-full py-16 md:flex md:min-h-screen md:items-center md:py-12">
        <div className="container md:flex md:h-[calc(100vh-6rem)] md:flex-col md:justify-center">
          <div className="mb-12 text-center">
            <MaskText
              as="h2"
              className="mb-6 font-graduate text-3xl font-bold leading-tight text-primary md:text-4xl lg:text-5xl"
              phrases={[t("MenuSection.title")]}
              delay={0.2}
            />
            <FadeUp delay={0.4}>
              <p
                id="menu-section"
                className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                {t("MenuSection.description")}
              </p>
            </FadeUp>
          </div>
          <div className="md:flex md:min-h-0 md:flex-1 md:flex-col">
            <Menu categories={categoriesData} />
          </div>
        </div>
      </section>
      <Gallery data={gallery_section} />
      <FAQ />
    </>
  );
};

export default HomeComponents;
