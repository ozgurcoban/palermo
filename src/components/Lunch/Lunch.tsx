"use client";

import React, { useState, useRef } from "react";
import { useGetLocale } from "@/config";
import { Clock } from "lucide-react";
import MenuItem from "../Menu/MenuItems/MenuItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import FadeUp from "../ui/FadeUp";

type Props = {
  lunchData: LunchConfiguration;
};

export const Lunch: React.FC<Props> = ({ lunchData }) => {
  const locale = useGetLocale();
  const scrollRef = useRef<HTMLDivElement>(null);


  if (!lunchData) {
    return (
      <div className="w-full text-center">
        <h2 className="text-2xl">Ingen lunchdata tillgänglig</h2>
        <p className="mt-4">
          Vänligen kontrollera din internetanslutning eller försök igen
          senare.
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
    <div className="w-full" id="lunch">
        <FadeUp delay={0.9}>
          <div className="w-full rounded border-4 bg-white sm:border-8 md:border-[12px]">
            <div
              style={{
                boxShadow: "inset 0 0 6px 1px rgba(0, 0, 0, 0.2)",
              }}
              className="px-3 pb-4 pt-6 sm:px-5 sm:pb-8 sm:pt-8 md:px-10 lg:px-20"
            >
              <Tabs
                defaultValue={defaultTab}
                className="w-full"
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
                  className="h-[70vh] overflow-y-scroll sm:h-[55vh] md:h-[60vh]"
                  ref={scrollRef}
                >
                  {dagensLunch && (
                    <TabsContent value="dagens" className="mt-0">
                      <div className="sticky top-0 z-10 mb-3 border-b bg-white pb-2 sm:mb-4 sm:pb-4">
                        <h3 className="text-center font-recoleta text-lg sm:text-xl md:text-2xl">
                          {dagensLunch.title?.[locale] || "Dagens lunch"}
                        </h3>
                        {dagensLunch.description?.[locale] && (
                          <p className="mb-1 text-center text-xs text-dark/85 sm:mb-2 sm:text-sm">
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
                      <div className="sticky top-0 z-10 mb-3 border-b bg-white pb-2 sm:mb-4 sm:pb-4">
                        <h3 className="text-center font-recoleta text-lg sm:text-xl md:text-2xl">
                          {lunchPizza.title?.[locale] || "Lunchpizza"}
                        </h3>
                        {lunchPizza.description?.[locale] && (
                          <p className="mb-1 text-center text-xs text-dark/85 sm:mb-2 sm:text-sm">
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
                      <div className="sticky top-0 z-10 mb-3 border-b bg-white pb-2 sm:mb-4 sm:pb-4">
                        <h3 className="text-center font-recoleta text-lg sm:text-xl md:text-2xl">
                          {monthlySpecial.title?.[locale] || "Månadens tips"}
                        </h3>
                        {monthlySpecial.description?.[locale] && (
                          <p className="mb-1 text-center text-xs text-dark/85 sm:mb-2 sm:text-sm">
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
};
