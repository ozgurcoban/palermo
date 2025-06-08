"use client";

import Image from "next/image";
import FadeUp from "@/components/ui/FadeUp";
import { useTranslations } from "next-intl";
import Localization from "@/components/localization";
import ScrollToMenu from "../ScrollToMenu";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Utensils } from "lucide-react";
import { trackLunchCTAClick } from "@/lib/gtag";


export function HomeHero() {
  const t = useTranslations("Home");
  // unstable_setRequestLocale(locale)

  return (
    <div className="relative flex h-[70vh] w-screen items-center justify-center">
      <div
        className="relative h-full overflow-hidden hero-image-container"
      >
        <div className="absolute z-10 h-full w-full bg-black/40" />
        <Image
          src="/hero.png"
          alt="hero"
          width={1920}
          height={1080}
          style={{ objectFit: "cover" }}
          className="h-full w-full"
        />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center sm:px-8">
        <FadeUp delay={0.5} >
          <Badge
            variant="secondary"
            className="pointer-events-none mb-4 rounded-sm bg-muted-foreground/70 px-4 py-2 font-medium text-secondary backdrop-blur-sm"
          >
            <span className="uppercase">
              <Localization text="Home.HomeHero.badge.main" />
            </span>
            <span>
              <Localization text="Home.HomeHero.badge.suffix" />
            </span>
          </Badge>
        </FadeUp>

        <FadeUp delay={0.8} >
          <h1 className="hero-title mb-4">
            <Localization text="Home.HomeHero.title" />
          </h1>
        </FadeUp>
        {/* Hero description */}
        <FadeUp delay={1.1} >
          <p className="break-words font-lato text-[4vw] text-light opacity-70 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] sm:text-[22px] lg:text-[26px] lg:leading-[85px]">
            <Localization text="Home.HomeHero.description" />
          </p>
        </FadeUp>
      </div>
      <div className="absolute bottom-6 z-20 flex flex-col items-center gap-3">
        {/* Lunch button - only visible on mobile/tablet */}
        <FadeUp className="lg:hidden" delay={1.4} >
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="group border-2 border-white bg-white/20 font-medium uppercase tracking-wide text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:text-white"
          >
            <Link 
              href="/lunch" 
              className="flex items-center gap-2"
              onClick={() => {
                // Track the click
                trackLunchCTAClick();
                // Let the navigation proceed normally
              }}
            >
              <Utensils className="h-4 w-4" />
              <Localization text="Navigation.lunch" />
            </Link>
          </Button>
        </FadeUp>

        {/* Main CTA button */}
        <FadeUp delay={1.7} >
          <ScrollToMenu>{t("HomeHero.cta")}</ScrollToMenu>
        </FadeUp>
      </div>
    </div>
  );
}
