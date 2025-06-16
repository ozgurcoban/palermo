import React from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import { generateFAQSchema } from "@/lib/metadata";
import { HomeHero } from "@/components/Heros";
import { MenuSkeleton } from "@/components/Menu";

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

// Dynamic import for Menu to prevent FOUC and hydration issues
const MenuResponsive = dynamic(
  () =>
    import("@/components/Menu").then((mod) => ({
      default: mod.MenuResponsive,
    })),
  {
    loading: () => <MenuSkeleton />,
    ssr: false, // Disable SSR to prevent hydration mismatch
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

const HomeComponentsOptimized: React.FC<Props> = ({
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

  const { gallery_section } = homeData;

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeHero />
      <section className="w-full py-16 md:py-20">
        <div className="container">
          <MenuResponsive categories={categoriesData} />
        </div>
      </section>
      <Gallery data={gallery_section} />
      <FAQ />
    </>
  );
};

export default HomeComponentsOptimized;
