"use client";

import React from "react";
import { Lunch } from "@/components/Lunch/Lunch";
import { PageHero } from "@/components/Heros";
import FadeUp from "@/components/ui/FadeUp";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { useGetLocale } from "@/config";

type Props = {
  lunchData: LunchConfiguration;
};

const LunchComponents: React.FC<Props> = ({ lunchData }) => {
  const t = useTranslations("Lunch");
  const locale = useGetLocale();

  const scrollToLunch = () => {
    const lunchSection = document.getElementById("lunch");
    if (lunchSection) {
      // Små fördröjning för att undvika animationskonflikter
      setTimeout(() => {
        lunchSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <>
      <PageHero
        imageUrl="/images/hero/lunch-hero-exterior.png"
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
          defaultValue:
            "Daily lunch {price} SEK • Salad, bread & coffee included",
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
