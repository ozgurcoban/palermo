"use client";

import React, { useEffect } from "react";
import Menu from "@/components/Menu";
import { PageHeroOptimized as PageHero } from "@/components/Heros";
import FadeUp from "@/components/ui/FadeUp";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import FoodDeliveryApps from "@/components/FoodDeliveryApps";
import { trackMenuPageCTAClick } from "@/lib/gtag";

type Props = {
  categoriesData: Category[];
};

const MenuComponents: React.FC<Props> = ({ categoriesData }) => {
  const t = useTranslations("MenuPage");

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

    // Small delay to ensure element is rendered
    const delay = 100;

    setTimeout(() => {
      const menuSection = document.getElementById("menu");
      if (menuSection) {
        const navbarHeight = 132;
        const menuPosition =
          menuSection.getBoundingClientRect().top + window.scrollY;
        const viewportHeight = window.innerHeight;
        const menuHeight = menuSection.offsetHeight;
        const offsetPosition =
          menuPosition -
          navbarHeight -
          (viewportHeight - navbarHeight - menuHeight) / 2 +
          40;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      } else {
        // Fallback: scroll to a fixed position if element not found
        window.scrollTo({
          top: 600,
          behavior: "smooth",
        });
      }
    }, delay);
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
          <FadeUp delay={1.3}>
            <Menu
              categories={categoriesData}
              disableAnimations
            />
          </FadeUp>
        </div>
      </section>

      <FoodDeliveryApps />
    </>
  );
};

export default MenuComponents;
