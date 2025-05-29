"use client";

import React, { useState, useRef, useEffect } from "react";
import FadeUp from "../ui/FadeUp";
import { useGetLocale } from "@/config";
import { Clock } from "lucide-react";
import MenuItem from "../Menu/MenuItems/MenuItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type Props = {
  lunchData: LunchConfiguration;
};

export const Lunch: React.FC<Props> = ({ lunchData }) => {
  const locale = useGetLocale();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Add scroll hint animation
  useEffect(() => {
    if (!scrollRef.current) return;

    const hasSeenScroll = localStorage.getItem("lunch-scroll");
    if (hasSeenScroll) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-subtle-scroll");
          localStorage.setItem("lunch-scroll", "true");
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(scrollRef.current);

    return () => observer.disconnect();
  }, []);

  if (!lunchData) {
    return (
      <section className="border-image w-screen py-24">
        <div className="container text-center">
          <h2 className="text-2xl">Ingen lunchdata tillgänglig</h2>
          <p className="mt-4">
            Vänligen kontrollera din internetanslutning eller försök igen
            senare.
          </p>
        </div>
      </section>
    );
  }

  const { title, timeInfo, dagensLunch, lunchPizza, monthlySpecial } =
    lunchData;

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
    <section className="border-image w-screen py-24" id="lunch">
      <div className="container">
        <FadeUp>
          <h2 className="title-secondary cursor-default !text-center">
            {title?.[locale] || "Lunch"}
          </h2>
        </FadeUp>

        {timeInfo && (
          <FadeUp
            delay={0.2}
            className="mt-6 flex items-center justify-center gap-2 text-primary"
          >
            <Clock className="size-5" />
            <span className="font-medium">
              {timeInfo.days[locale]} {timeInfo.hours}
            </span>
          </FadeUp>
        )}

        <FadeUp
          delay={0.3}
          duration={0.5}
          variants={{ initial: { scaleY: 0 }, animate: { scaleY: 1 } }}
          className="mt-8 w-full rounded border-[12px] bg-white md:mt-16"
        >
          <FadeUp
            delay={0.8}
            style={{
              boxShadow: "inset 0 0 6px 1px rgba(0, 0, 0, 0.2)",
            }}
            className="px-5 pb-8 pt-4 md:px-10 lg:px-20"
          >
            <Tabs
              defaultValue={defaultTab}
              className="w-full"
              onValueChange={handleTabChange}
            >
              <TabsList className="mb-6 grid w-full grid-cols-3">
                {dagensLunch && (
                  <TabsTrigger
                    value="dagens"
                    className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2"
                  >
                    <span className="text-xs sm:text-sm">
                      {dagensLunch.title?.[locale] || "Dagens lunch"}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {dagensLunch.price} kr
                    </Badge>
                  </TabsTrigger>
                )}
                {lunchPizza && (
                  <TabsTrigger
                    value="pizza"
                    className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2"
                  >
                    <span className="text-xs sm:text-sm">
                      {lunchPizza.title?.[locale] || "Lunchpizza"}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {lunchPizza.price} kr
                    </Badge>
                  </TabsTrigger>
                )}
                {monthlySpecial && (
                  <TabsTrigger
                    value="monthly"
                    className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2"
                  >
                    <span className="text-xs sm:text-sm">
                      {monthlySpecial.title?.[locale] || "Månadens tips"}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {monthlySpecial.price} kr
                    </Badge>
                  </TabsTrigger>
                )}
              </TabsList>

              <div
                className="subtle-scroll h-[60vh] overflow-y-scroll"
                ref={scrollRef}
              >
                {dagensLunch && (
                  <TabsContent value="dagens" className="mt-0">
                    <div className="sticky top-0 mb-4 border-b bg-white pb-4">
                      <h3 className="text-center font-recoleta text-2xl">
                        {dagensLunch.title?.[locale] || "Dagens lunch"}
                      </h3>
                      <p className="text-center font-lobster text-3xl text-primary">
                        {dagensLunch.price} kr
                      </p>
                    </div>
                    <ul className="mx-auto flex w-full max-w-md flex-col gap-5">
                      {dagensItems.map((item) => (
                        <MenuItem key={item._id} item={item as Food} />
                      ))}
                    </ul>
                  </TabsContent>
                )}

                {lunchPizza && (
                  <TabsContent value="pizza" className="mt-0">
                    <div className="sticky top-0 mb-4 border-b bg-white pb-4">
                      <h3 className="text-center font-recoleta text-2xl">
                        {lunchPizza.title?.[locale] || "Lunchpizza"}
                      </h3>
                      {lunchPizza.description?.[locale] && (
                        <p className="mb-2 text-center text-sm text-dark/85">
                          {lunchPizza.description[locale]}
                        </p>
                      )}
                      <p className="text-center font-lobster text-3xl text-primary">
                        {lunchPizza.price} kr
                      </p>
                    </div>
                    <ul className="mx-auto flex w-full max-w-md flex-col gap-5">
                      {pizzaItems.map((item) => (
                        <MenuItem key={item._id} item={item} />
                      ))}
                    </ul>
                  </TabsContent>
                )}

                {monthlySpecial && (
                  <TabsContent value="monthly" className="mt-0">
                    <div className="sticky top-0 mb-4 border-b bg-white pb-4">
                      <h3 className="text-center font-recoleta text-2xl">
                        {monthlySpecial.title?.[locale] || "Månadens tips"}
                      </h3>
                      <p className="text-center font-lobster text-3xl text-primary">
                        {monthlySpecial.price} kr
                      </p>
                    </div>
                    <ul className="mx-auto flex w-full max-w-md flex-col gap-5">
                      {monthlyItem.map((item) => (
                        <MenuItem key={item._id} item={item as Food} />
                      ))}
                    </ul>
                  </TabsContent>
                )}
              </div>
            </Tabs>
          </FadeUp>
        </FadeUp>
      </div>
    </section>
  );
};
