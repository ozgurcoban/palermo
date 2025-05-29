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
  const monthlyItems = monthlySpecial?.dish
    ? [
        {
          _id: "monthly-special",
          _type: "foods" as const,
          title: monthlySpecial.dish.title,
          description: monthlySpecial.dish.description || "",
          priceSection: {
            price: monthlySpecial.price || 119, // Default price if not specified
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
          <h2 className="title-secondary cursor-default">
            {title[locale] || "Lunch"}
          </h2>
        </FadeUp>

        {timeInfo && (
          <FadeUp className="mt-6 flex items-center justify-center gap-2 text-primary">
            <Clock className="size-5" />
            <span className="text-lg">
              {timeInfo.days[locale]} • {timeInfo.hours}
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
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="mb-6 grid w-full grid-cols-3">
                {dagensLunch && (
                  <TabsTrigger
                    value="dagens"
                    className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2"
                  >
                    <span className="text-xs sm:text-sm">
                      {dagensLunch.title?.[locale]}
                    </span>
                  </TabsTrigger>
                )}
                {lunchPizza && (
                  <TabsTrigger
                    value="pizza"
                    className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2"
                  >
                    <span className="text-xs sm:text-sm">
                      {lunchPizza.title?.[locale]}
                    </span>
                    <Badge variant="secondary" className="mt-1">
                      Från {lunchPizza.price} kr
                    </Badge>
                  </TabsTrigger>
                )}
              </TabsList>
            </Tabs>
          </FadeUp>
        </FadeUp>
      </div>
    </section>
  );
};
