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
import { Link, useRouter } from "@/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { trackFAQCTAClick } from "@/lib/gtag";

export function FAQ() {
  const locale = useGetLocale();
  const router = useRouter();
  const [openingHours, setOpeningHours] = useState<string | undefined>();
  const [lunchInfo, setLunchInfo] = useState<string | undefined>();
  
  const handleDeliveryClick = () => {
    trackFAQCTAClick(2, "delivery", "menu#food-delivery");
    
    // For desktop browsers - try hash navigation first
    if (typeof window !== "undefined") {
      // Detect if we're likely on iOS Safari
      const isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      
      if (isIOSSafari) {
        // iOS Safari fallback - use sessionStorage
        sessionStorage.setItem("scrollToDelivery", "true");
        router.push("/menu");
      } else {
        // Desktop/other browsers - try direct hash navigation
        window.location.href = "/menu#food-delivery";
      }
    } else {
      // Fallback if window is not available
      router.push("/menu");
    }
  };

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
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  <div className="space-y-4">
                    <p className="whitespace-pre-line">{faq.answer}</p>
                    {index === 0 && (
                      <Link href="/lunch">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="group"
                          onClick={() => trackFAQCTAClick(0, "lunch", "/lunch")}
                        >
                          {locale === "sv"
                            ? "Se lunchmenyn"
                            : "View lunch menu"}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    )}
                    {index === 2 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="group"
                        onClick={handleDeliveryClick}
                      >
                        {locale === "sv" ? "Se leveransalternativ" : "View delivery options"}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    )}
                    {index === 4 && (
                      <Link href="/menu">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="group"
                          onClick={() => trackFAQCTAClick(4, "menu", "/menu")}
                        >
                          {locale === "sv" ? "Utforska menyn" : "Explore menu"}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    )}
                    {index === 5 && (
                      <a href="#contact">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="group"
                          onClick={() => trackFAQCTAClick(5, "contact", "#contact")}
                        >
                          {locale === "sv" ? "Kontakta oss" : "Contact us"}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </a>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
      </div>
    </section>
  );
}
