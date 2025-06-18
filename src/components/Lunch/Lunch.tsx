"use client";

import React, { useRef, forwardRef } from "react";
import { useGetLocale } from "@/config";
import { Clock } from "lucide-react";
import MenuItem from "../Menu/MenuItems/MenuItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import FadeUp from "../ui/FadeUp";
import { useTranslations } from "next-intl";
import { useIsMobile } from "@/hooks/menu/useIsMobile";

type Props = {
  lunchData: LunchConfiguration;
};

export const Lunch = forwardRef<HTMLDivElement, Props>(({ lunchData }, ref) => {
  const locale = useGetLocale();
  const t = useTranslations("Lunch");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useIsMobile();

  if (!lunchData) {
    return (
      <div className="w-full text-center">
        <h2 className="text-2xl">Ingen lunchdata tillgänglig</h2>
        <p className="mt-4">
          Vänligen kontrollera din internetanslutning eller försök igen senare.
        </p>
      </div>
    );
  }

  const { dagensLunch, lunchPizza, monthlySpecial } = lunchData;

  // Transform lunch items to match MenuItem structure
  const dagensItems =
    dagensLunch?.items?.map((item, index) => ({
      _id: `dagens-${index}`,
      _type: "foods" as const,
      title: item.title,
      description: item.description || "",
      priceSection: {
        price: dagensLunch.price || 119,
      },
    })) || [];

  // Transform pizza items with override price
  const pizzaItems =
    lunchPizza?.subcategoryRef?.menu_list?.map((item) => ({
      ...item,
      priceSection: {
        ...item.priceSection,
        price: lunchPizza.price || 119, // Override price for pizza
        takeawayPrice: undefined, // Remove takeaway price
      },
    })) || [];

  // Transform monthly special items
  const monthlyItem = monthlySpecial?.dish
    ? [
        {
          ...monthlySpecial.dish,
          _id: "monthly-special",
          _type: "foods" as const,
          priceSection: {
            price: monthlySpecial.price,
          },
        },
      ]
    : [];

  // Reset scroll when changing tabs
  const handleTabChange = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  };

  const defaultTab = dagensLunch
    ? "dagens"
    : lunchPizza
      ? "pizza"
      : monthlySpecial
        ? "monthly"
        : "dagens";

  return (
    <div className="w-full" id="lunch" data-scroll-target="lunch" ref={ref}>
      <FadeUp delay={0.9}>
        <div
          className={`w-full rounded border-4 bg-white dark:bg-card sm:border-8 md:border-[12px] ${isMobile ? "h-[calc(100dvh-var(--bottombar-height)-var(--navbar-height)+20px)]" : ""}`}
        >
          <div
            style={{
              boxShadow: "inset 0 0 6px 1px rgba(0, 0, 0, 0.2)",
            }}
            className={`flex flex-col px-3 pb-4 pt-6 sm:px-5 sm:pb-8 sm:pt-8 md:px-10 lg:px-20 ${isMobile ? "h-full" : "menu-height"}`}
          >
            <Tabs
              defaultValue={defaultTab}
              className="flex h-full w-full flex-col"
              onValueChange={handleTabChange}
            >
              <TabsList className="mb-3 grid h-auto w-full grid-cols-3 gap-1 rounded-full p-1 sm:mb-6 sm:gap-2 sm:p-2">
                {dagensLunch && (
                  <TabsTrigger
                    value="dagens"
                    className="flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-full py-2 text-xs sm:flex-row sm:gap-2 sm:py-3 sm:text-sm"
                  >
                    <span className="text-12 leading-tight sm:text-xs md:text-sm">
                      {dagensLunch.title?.[locale] || "Dagens lunch"}
                    </span>
                  </TabsTrigger>
                )}
                {lunchPizza && (
                  <TabsTrigger
                    value="pizza"
                    className="flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-full py-2 text-xs sm:flex-row sm:gap-2 sm:py-3 sm:text-sm"
                  >
                    <span className="text-12 leading-tight sm:text-xs md:text-sm">
                      {lunchPizza.title?.[locale] || "Lunchpizza"}
                    </span>
                  </TabsTrigger>
                )}
                {monthlySpecial && (
                  <TabsTrigger
                    value="monthly"
                    className="flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-full py-2 text-xs sm:flex-row sm:gap-2 sm:py-3 sm:text-sm"
                  >
                    <span className="text-12 leading-tight sm:text-xs md:text-sm">
                      {monthlySpecial.title?.[locale] || "Månadens tips"}
                    </span>
                  </TabsTrigger>
                )}
              </TabsList>

              <div
                className={`flex-1 overflow-y-auto ${isMobile ? "pb-4" : "pb-24 lg:pb-0"}`}
                ref={scrollRef}
                tabIndex={0}
                role="region"
                aria-label={t("lunchMenuLabel")}
              >
                {dagensLunch && (
                  <TabsContent value="dagens" className="mt-0">
                    <div className="sticky top-0 z-10 mb-3 border-b border-border bg-white pb-2 dark:bg-card sm:mb-4 sm:pb-4">
                      <h2 className="text-center font-recoleta text-lg sm:text-xl md:text-2xl">
                        {dagensLunch.title?.[locale] || "Dagens lunch"}
                      </h2>
                      {dagensLunch.description?.[locale] && (
                        <p className="mb-1 text-center text-xs text-muted-foreground sm:mb-2 sm:text-sm">
                          {dagensLunch.description[locale]}
                        </p>
                      )}
                    </div>
                    <ul className="mx-auto flex w-full max-w-md flex-col gap-3 px-2 sm:gap-5 sm:px-0">
                      {dagensItems.map((item) => (
                        <MenuItem key={item._id} item={item as Food} />
                      ))}
                    </ul>
                  </TabsContent>
                )}

                {lunchPizza && (
                  <TabsContent value="pizza" className="mt-0">
                    <div className="sticky top-0 z-10 mb-3 border-b border-border bg-white pb-2 dark:bg-card sm:mb-4 sm:pb-4">
                      <h2 className="text-center font-recoleta text-lg sm:text-xl md:text-2xl">
                        {lunchPizza.title?.[locale] || "Lunchpizza"}
                      </h2>
                      {lunchPizza.description?.[locale] && (
                        <p className="mb-1 text-center text-xs text-muted-foreground sm:mb-2 sm:text-sm">
                          {lunchPizza.description[locale]}
                        </p>
                      )}
                    </div>
                    <ul className="mx-auto flex w-full max-w-md flex-col gap-3 px-2 sm:gap-5 sm:px-0">
                      {pizzaItems.map((item) => (
                        <MenuItem key={item._id} item={item} />
                      ))}
                    </ul>
                  </TabsContent>
                )}

                {monthlySpecial && (
                  <TabsContent value="monthly" className="mt-0">
                    <div className="sticky top-0 z-10 mb-3 border-b border-border bg-white pb-2 dark:bg-card sm:mb-4 sm:pb-4">
                      <h2 className="text-center font-recoleta text-lg sm:text-xl md:text-2xl">
                        {monthlySpecial.title?.[locale] || "Månadens tips"}
                      </h2>
                      {monthlySpecial.description?.[locale] && (
                        <p className="mb-1 text-center text-xs text-muted-foreground sm:mb-2 sm:text-sm">
                          {monthlySpecial.description[locale]}
                        </p>
                      )}
                    </div>
                    <ul className="mx-auto flex w-full max-w-md flex-col gap-3 px-2 sm:gap-5 sm:px-0">
                      {monthlyItem.map((item) => (
                        <MenuItem key={item._id} item={item as Food} />
                      ))}
                    </ul>
                  </TabsContent>
                )}
              </div>
            </Tabs>
          </div>
        </div>
      </FadeUp>
    </div>
  );
});

Lunch.displayName = "Lunch";
