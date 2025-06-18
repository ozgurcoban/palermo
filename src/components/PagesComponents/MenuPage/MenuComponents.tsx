"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { MenuSkeleton } from "@/components/Menu";
import { PageHero } from "@/components/Heros";
import FadeUp from "@/components/ui/FadeUp";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import FoodDeliveryApps from "@/components/FoodDeliveryApps";
import { trackMenuPageCTAClick } from "@/lib/gtag";
import { useScrollToElement } from "@/hooks/useScrollToElement";

// Dynamic import for Menu
const Menu = dynamic(
  () => import("@/components/Menu").then(mod => ({ default: mod.Menu })),
  {
    loading: () => <MenuSkeleton />,
    ssr: false,
  }
);

type Props = {
  categoriesData: Category[];
};

const MenuComponents: React.FC<Props> = ({ categoriesData }) => {
  const t = useTranslations("MenuPage");
  const scrollToElement = useScrollToElement();

  // Check for hash in URL or sessionStorage flag
  useEffect(() => {
    const checkAndScroll = () => {
      // Function to perform the actual scroll with a nice pause
      const performScroll = () => {
        const deliverySection = document.getElementById("food-delivery");
        if (deliverySection) {
          const navbarHeight = 132;
          const offsetPosition =
            deliverySection.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight -
            20;

          // Add a longer pause before scrolling for better UX
          setTimeout(() => {
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }, 800); // Longer pause to let user see the page loaded
        }
      };

      // Check hash first (works on desktop)
      if (window.location.hash === "#food-delivery") {
        performScroll();

        // Clear hash after scrolling
        setTimeout(() => {
          window.history.replaceState(null, "", window.location.pathname);
        }, 1000);
      }

      // Also check sessionStorage (fallback for iOS)
      const shouldScrollToDelivery = sessionStorage.getItem("scrollToDelivery");
      if (shouldScrollToDelivery === "true") {
        sessionStorage.removeItem("scrollToDelivery");
        performScroll();
      }
    };

    // Try immediately
    checkAndScroll();

    // Also try after a delay for slow-loading pages
    const timeoutId = setTimeout(checkAndScroll, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  const scrollToMenu = () => {
    // Track the click event safely
    try {
      trackMenuPageCTAClick();
    } catch (error) {
      // Silently ignore tracking errors
    }

    scrollToElement({
      elementId: "menu",
      mobileOffset: 10,
      desktopBehavior: "center",
    });
  };

  return (
    <>
      <PageHero
        imageUrl="/images/hero/menu-hero.webp"
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
          defaultValue:
            "Discover our selection of delicious dishes and beverages",
        })}
        ctaText={t("hero.cta", { defaultValue: "Se hela menyn" })}
        ctaAction={scrollToMenu}
      />

      <section className="w-full pt-16 pb-8 md:pt-20 md:pb-12 md:flex md:min-h-screen md:items-center">
        <div className="container md:flex md:h-[calc(100vh-6rem)] md:flex-col md:justify-center">
          <div className="mb-6 text-center">
            <FadeUp delay={0.3}>
              <h2 className="title-secondary mb-4 cursor-default">
                {t("content.title")}
              </h2>
            </FadeUp>
            <FadeUp delay={0.4}>
              <p className="text-body mx-auto max-w-2xl">
                {t("content.description")}
              </p>
            </FadeUp>
          </div>
          <div className="md:flex-1 md:flex md:flex-col md:min-h-0">
            <Menu
              categories={categoriesData}
              disableAnimations
            />
          </div>
        </div>
      </section>

      <FoodDeliveryApps />
    </>
  );
};

export default MenuComponents;
