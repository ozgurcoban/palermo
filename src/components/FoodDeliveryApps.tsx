"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FadeUp from "@/components/ui/FadeUp";
import { useTranslations } from "next-intl";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { trackDeliveryAppClick } from "@/lib/gtag";

interface DeliveryApp {
  name: string;
  link: string;
  color: string;
  buttonText: string;
}

export default function FoodDeliveryApps() {
  const t = useTranslations("FoodDelivery");

  const deliveryApps: DeliveryApp[] = [
    {
      name: "Uber Eats",
      link: "https://www.ubereats.com/store/restaurang-palermo/mdWfw25_Xtq7sV-nXuEYjQ?diningMode=DELIVERY&ps=1",
      color: "bg-[#06C167]",
      buttonText: t("orderVia", { app: "UberEats" }),
    },
    {
      name: "Foodora",
      link: "https://www.foodora.se/restaurant/fyi3/restaurang-palermo",
      color: "bg-[#D70F64]",
      buttonText: t("orderVia", { app: "Foodora" }),
    },
    {
      name: "Wolt",
      link: "https://wolt.com/sv/swe/uppsala/restaurant/restaurang-palermo",
      color: "bg-[#009DE0]",
      buttonText: t("orderVia", { app: "Wolt" }),
    },
  ];

  return (
    <section id="food-delivery" className="w-screen bg-accent-soft-apricot py-20" aria-labelledby="delivery-heading">
      <div className="container">
        <FadeUp delay={0.2}>
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              {t("subtitle")}
            </Badge>
            <h2 id="delivery-heading" className="title-secondary mb-6">{t("title")}</h2>
            <p className="text-body mx-auto mb-12 max-w-2xl">
              {t("description")}
            </p>
          </div>
        </FadeUp>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {deliveryApps.map((app, index) => (
            <FadeUp key={app.name} delay={0.3 + index * 0.1}>
              <Card className="bg-card border shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex h-20 items-center justify-center">
                    {app.name === "Uber Eats" && (
                      <CardTitle className="text-4xl">
                        <h3 className="sr-only">{app.name}</h3>
                        <span className="text-foreground" aria-hidden="true">Uber</span>
                        <span className="text-[#06C167]" aria-hidden="true">Eats</span>
                      </CardTitle>
                    )}
                    {app.name === "Foodora" && (
                      <CardTitle className="text-4xl text-[#D70F64]">
                        <h3 className="sr-only">{app.name}</h3>
                        <span aria-hidden="true">foodora</span>
                      </CardTitle>
                    )}
                    {app.name === "Wolt" && (
                      <CardTitle className="text-4xl text-[#009DE0]">
                        <h3 className="sr-only">{app.name}</h3>
                        <span aria-hidden="true">Wolt</span>
                      </CardTitle>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-6 text-base text-muted-foreground">
                    Palermo <span aria-hidden="true">❤️</span><span className="sr-only">loves</span> {app.name}
                  </p>

                  <Button
                    asChild
                    className="w-full"
                    size="lg"
                  >
                    <a
                      href={app.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                      onClick={() => trackDeliveryAppClick(app.name)}
                      aria-label={`${app.buttonText} ${t("opensInNewTab")}`}
                    >
                      <span>{app.buttonText}</span>
                      <ArrowTopRightIcon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.6}>
          <p className="text-body mt-8 text-center text-muted-foreground">
            {t("deliveryAreas")}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
