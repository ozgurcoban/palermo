"use client";

import React from "react";
import Banner from "@/components/Banner";
import { PageHero } from "../../Heros";
import NationEveryone from "../../NationEveryone";
import {
  FirstSection,
  FourthSection,
  SecondSection,
  ThirdSection,
  WelcomeSection,
} from "../../Sections";
import FadeUp from "@/components/ui/FadeUp";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

type Props = {
  aboutData: AboutPage;
};

const AboutComponents: React.FC<Props> = ({ aboutData }) => {
  const { images, banner, sections } = aboutData;
  const t = useTranslations("AboutPage");

  return (
    <>
      <PageHero
        imageUrl="/images/about/restaurant.jpg"
        imageAlt="about hero"
      >
        <FadeUp delay={0.3}>
          <Badge className="pointer-events-none mb-4 rounded-sm bg-muted-foreground/80 px-4 py-2 font-medium text-secondary opacity-90">
            <span className="uppercase tracking-wider">
              {t("hero.badge", { defaultValue: "Since 1991" })}
            </span>
          </Badge>
        </FadeUp>
        
        <FadeUp delay={0.5}>
          <h1 className="mb-3 text-center font-recoleta text-[12vw] font-bold leading-tight text-secondary drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] sm:mb-4 sm:text-5xl md:text-6xl lg:text-7xl">
            {t("hero.title", { defaultValue: "About Us" })}
          </h1>
        </FadeUp>

        <FadeUp delay={0.7}>
          <p className="max-w-2xl break-words font-lato text-base text-light/90 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] sm:text-lg md:text-xl lg:text-2xl">
            {t("hero.description", { 
              defaultValue: "Uppsala's most natural meeting place for over 30 years" 
            })}
          </p>
        </FadeUp>
      </PageHero>
      {banner && <Banner banners={banner} />}
      <NationEveryone />
      {sections && (
        <>
          {sections[0] && <FirstSection section={sections[0]} />}
          {sections[1] && <SecondSection section={sections[1]} />}
          {sections[2] && <ThirdSection section={sections[2]} />}
          {sections[3] && <FourthSection section={sections[3]} />}
        </>
      )}
      <WelcomeSection />
    </>
  );
};

export default AboutComponents;
