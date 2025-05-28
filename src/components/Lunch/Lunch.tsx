"use client";

import React, { useState } from "react";
import FadeUp from "../ui/FadeUp";
import { useGetLocale } from "@/config";
import { Clock, Pizza, Calendar, Utensils } from "lucide-react";
import MaskText from "../ui/MaskText";
import { describe } from "node:test";

type Props = {
  lunchData: LunchConfiguration;
};

type LunchCategory = "dagens" | "pizza" | "monthly";

export const Lunch: React.FC<Props> = ({ lunchData }) => {
  const locale = useGetLocale();
  const [activeCategory, setActiveCategory] = useState<LunchCategory>("dagens");

  if (!lunchData) return null;

  const { title, timeInfo, dagensLunch, lunchPizza, monthlySpecial } =
    lunchData;

  // Transform lunch items to match MenuItem structure
  const lunchItems = dagensLunch?.items?.map((item, index) => ({
    _id: `dagens-${index}`,
    _type: "foods" as const,
    title: item.title,
    description: item.description,
    priceSection: {
      price: dagensLunch.price,
    },
  }));

  // Transform pizza items with override price
  const pizzaItems = lunchPizza.subcategoryRef?.menu_list?.map((item) => ({
    ...item,
    priceSection: {
      ...item.priceSection,
      price: lunchPizza.price, // Override price with lunchPizza price
      takeawayPrice: undefined, // Ensure takeawayPrice is undefined
    },
  }));
  // Transform monthly special item
  const monthlyItem = monthlySpecial?.dish
    ? [
        {
          _id: "monthly-special",
          _type: "foods" as const,
          title: monthlySpecial.dish.title,
          description: monthlySpecial.dish.description,
          priceSection: {
            price: monthlySpecial.price,
          },
        },
      ]
    : [];

  const categories = [
    {
      id: "dagens" as LunchCategory,
      title: lunchPizza?.title,
      items: lunchItems || [],
      price: lunchPizza?.price || 119,
    },
    {
      id: "pizza" as LunchCategory,
      title: lunchPizza?.title,
      items: pizzaItems || [],
      price: lunchPizza?.price || 119,
    },
    {
      id: "monthly" as LunchCategory,
      title: monthlySpecial?.title,
      items: monthlyItem || [],
      price: monthlySpecial?.price || 119,
    },
  ];

  const activeItems = categories.find(
    (category) => category.id === activeCategory,
  );
  if (!activeItems) return null;
  return (
    <section className="border-image w-screen py-24" id="lunch">
      <div className="container">
        <FadeUp>
          <h2 className="title-secondary cursor-default">Fiss tirri</h2>
        </FadeUp>
      </div>
    </section>
  );
};
