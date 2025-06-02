"use client";

import React from "react";
import Menu from "@/components/Menu";
import { PageHero } from "@/components/Heros";
import FadeUp from "@/components/ui/FadeUp";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import FoodDeliveryApps from "@/components/FoodDeliveryApps";

type Props = {
  categoriesData: Category[];
};

const MenuComponents: React.FC<Props> = ({ categoriesData }) => {
  const t = useTranslations("MenuPage");

  return (
    <>
      <PageHero imageUrl="/images/hero/menu-hero.png" imageAlt="menu hero">
        <FadeUp delay={0.3}>
          <Badge className="pointer-events-none mb-4 rounded-sm bg-muted-foreground/80 px-4 py-2 font-medium text-secondary opacity-90">
            <span className="uppercase tracking-wider">
              {t("hero.badge", { defaultValue: "Full Menu" })}
            </span>
          </Badge>
        </FadeUp>

        <FadeUp delay={0.5}>
          <h1 className="hero-title-simple mb-3 sm:mb-4">
            {t("hero.title", { defaultValue: "Menu" })}
          </h1>
        </FadeUp>

        <FadeUp delay={0.7}>
          <p className="max-w-2xl break-words font-lato text-base text-light/90 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] sm:text-lg md:text-xl lg:text-2xl">
            {t("hero.description", {
              defaultValue:
                "Discover our selection of delicious dishes and beverages",
            })}
          </p>
        </FadeUp>
      </PageHero>
      <FadeUp delay={0.9}>
        <Menu categories={categoriesData} disableAnimations />
      </FadeUp>
      <FoodDeliveryApps />
    </>
  );
};

export default MenuComponents;
