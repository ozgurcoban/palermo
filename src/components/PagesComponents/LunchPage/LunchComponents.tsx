"use client";

import React from "react";
import { Lunch } from "@/components/Lunch/Lunch";
import { PageHeroOptimized as PageHero } from "@/components/Heros";
import FadeUp from "@/components/ui/FadeUp";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { useGetLocale } from "@/config";
import { trackLunchPageCTAClick } from "@/lib/gtag";

type Props = {
  lunchData: LunchConfiguration;
};

const LunchComponents: React.FC<Props> = ({ lunchData }) => {
  const t = useTranslations("Lunch");
  const locale = useGetLocale();

  const scrollToLunch = () => {
    // Wrap tracking in try-catch to prevent crashes
    try {
      trackLunchPageCTAClick();
    } catch (error) {
      console.error("Tracking error:", error);
    }

    // Small delay to ensure element is rendered
    const delay = 100;

    setTimeout(() => {
      const lunchSection = document.getElementById("lunch");
      if (lunchSection) {
        const navbarHeight = 132;
        const lunchPosition =
          lunchSection.getBoundingClientRect().top + window.scrollY;
        const viewportHeight = window.innerHeight;
        const lunchHeight = lunchSection.offsetHeight;

        // Same calculation as menu page
        const offsetPosition =
          lunchPosition -
          navbarHeight -
          (viewportHeight - navbarHeight - lunchHeight) / 2 +
          20;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, delay);
  };

  return (
    <>
      <PageHero
        imageUrl="/images/hero/lunch-hero-exterior.webp"
        imageAlt="lunch hero"
        badge={
          <Badge className="pointer-events-none mb-4 rounded-sm bg-muted-foreground/80 px-4 py-2 font-medium text-secondary opacity-90">
            <span className="uppercase tracking-wider">
              {lunchData?.timeInfo
                ? `${lunchData.timeInfo.days[locale]} ${lunchData.timeInfo.hours}`
                : t("hero.badge", { defaultValue: "Vardagar 11:00-15:00" })}
            </span>
          </Badge>
        }
        title={t("hero.title", {
          defaultValue: "Weekday lunch at Palermo Uppsala",
        })}
        description={t("hero.description", {
          price: lunchData?.dagensLunch?.price || 119,
          count: (lunchData?.dagensLunch?.items?.length || 8) + (lunchData?.monthlySpecial ? 1 : 0),
          defaultValue:
            "Från {price} SEK • Välj mellan {count} rätter + lunchpizza • Sallad, bröd & kaffe ingår",
        })}
        ctaText={t("hero.cta", { defaultValue: "Se dagens lunch" })}
        ctaAction={scrollToLunch}
      />

      <section className="w-full py-16 md:py-20">
        <div className="container">
          <FadeUp delay={0.9}>
            <h2 className="title-secondary mb-4 cursor-default text-center">
              {t("content.title")}
            </h2>
          </FadeUp>
          <FadeUp delay={1.1}>
            <p className="text-body mx-auto mb-12 max-w-2xl text-center">
              {t("content.description")}
            </p>
          </FadeUp>
          <FadeUp delay={1.2}>
            <Lunch lunchData={lunchData} />
          </FadeUp>
        </div>
      </section>
    </>
  );
};

export default LunchComponents;
