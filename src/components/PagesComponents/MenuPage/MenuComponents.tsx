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
      <PageHero 
        imageUrl="/images/hero/menu-hero.png" 
        imageAlt="menu hero"
        badge={
          <Badge className="pointer-events-none mb-4 rounded-sm bg-muted-foreground/80 px-4 py-2 font-medium text-secondary opacity-90">
            <span className="uppercase tracking-wider">
              {t("hero.badge", { defaultValue: "Full Menu" })}
            </span>
          </Badge>
        }
        title={t("hero.title", { defaultValue: "Menu" })}
        description={t("hero.description", {
          defaultValue: "Discover our selection of delicious dishes and beverages",
        })}
      />
      <FadeUp delay={0.9}>
        <Menu categories={categoriesData} disableAnimations />
      </FadeUp>
      <FoodDeliveryApps />
    </>
  );
};

export default MenuComponents;
