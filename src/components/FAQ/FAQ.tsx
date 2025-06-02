"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FadeUp from "@/components/ui/FadeUp";
import { useGetLocale } from "@/config";
import { getFAQData } from "@/lib/metadata";
import { getClient } from "../../../sanity/lib/client";
import { CONTACT_QUERY, LUNCH_QUERY } from "../../../sanity/lib/queries";

export function FAQ() {
  const locale = useGetLocale();
  const [openingHours, setOpeningHours] = useState<string | undefined>();
  const [lunchInfo, setLunchInfo] = useState<string | undefined>();

  useEffect(() => {
    async function fetchOpeningHours() {
      try {
        const client = getClient(undefined);
        const [contactData, lunchData] = await Promise.all([
          client.fetch<Contact>(CONTACT_QUERY),
          client.fetch<LunchConfiguration>(LUNCH_QUERY),
        ]);

        if (contactData?.opening_hours) {
          const intro =
            locale === "sv"
              ? "Vi har öppet alla dagar!"
              : "We are open every day!";
          const hours = contactData.opening_hours
            .map((hour) => `${hour.day[locale]}: ${hour.time}`)
            .join("\n");

          setOpeningHours(`${intro}\n${hours}`);
        }

        // Format lunch info
        if (lunchData) {
          const lunchPrice = lunchData.dagensLunch?.price || 119;
          const pizzaPrice = lunchData.lunchPizza?.price || 119;
          const timeInfo = lunchData.timeInfo;
          const numberOfDishes = lunchData.dagensLunch?.items?.length || 9;

          // Get number of pizzas from the referenced subcategory
          const numberOfPizzas =
            lunchData.lunchPizza?.subcategoryRef?.menu_list?.length || 24;

          // Add 1 for the tips dish
          const totalDishes = numberOfDishes + 1;

          if (locale === "sv") {
            setLunchInfo(
              `Dagens lunch kostar från ${lunchPrice} kr och serveras vardagar ${timeInfo?.hours || "11:00-15:00"}. ` +
                `I priset ingår huvudrätt, sallad, bröd och kaffe. ` +
                `Välj mellan ${totalDishes} olika rätter eller ${numberOfPizzas}st lunchpizza.`,
            );
          } else {
            setLunchInfo(
              `Our weekday lunch special is from ${lunchPrice} SEK, served ${timeInfo?.hours || "11:00-15:00"}. ` +
                `It includes a main course, plus salad bar, bread and coffee. ` +
                `Pick from ${totalDishes} daily classics or any of our ${numberOfPizzas} lunch pizzas.`,
            );
          }
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
        // Use default values if fetch fails
      }
    }

    fetchOpeningHours();
  }, [locale]);

  const faqs = getFAQData(locale as "sv" | "en", openingHours, lunchInfo);

  return (
    <section className="w-full bg-muted/30 py-16 md:py-20">
      <div className="container">
        <FadeUp>
          <h2 className="title-secondary mb-2 text-center">
            {locale === "sv" ? "Vanliga frågor" : "Frequently Asked Questions"}
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-body mx-auto mb-12 max-w-2xl text-center">
            {locale === "sv"
              ? "Här hittar du svar på de vanligaste frågorna om Palermo Uppsala"
              : "Find answers to the most common questions about Palermo Uppsala"}
          </p>
        </FadeUp>
        <FadeUp delay={0.4}>
          <Accordion type="single" collapsible className="mx-auto max-w-3xl">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="whitespace-pre-line text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
      </div>
    </section>
  );
}
