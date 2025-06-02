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
      
      <section className="w-full py-16 md:py-20">
        <div className="container">
          <FadeUp delay={0.9}>
            <h2 className="title-secondary cursor-default text-center mb-4">
              {t("content.title")}
            </h2>
          </FadeUp>
          <FadeUp delay={1.1}>
            <p className="text-body text-center max-w-2xl mx-auto mb-12">
              {t("content.description")}
            </p>
          </FadeUp>
          <FadeUp delay={1.3}>
            <Menu categories={categoriesData} disableAnimations />
          </FadeUp>
        </div>
      </section>
      
      <FoodDeliveryApps />
    </>
  );
};

export default MenuComponents;
