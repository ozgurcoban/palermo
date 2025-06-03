"use client";

import React from "react";
import Banner from "@/components/Banner";
import { PageHeroOptimized as PageHero } from "../../Heros";
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
        imageUrl="/images/hero/about-hero-bar.webp"
        imageAlt="about hero"
        badge={
          <Badge className="pointer-events-none mb-4 rounded-sm bg-muted-foreground/80 px-4 py-2 font-medium text-secondary opacity-90">
            <span className="uppercase tracking-wider">
              {t("hero.badge", { defaultValue: "Since 1991" })}
            </span>
          </Badge>
        }
        title={t("hero.title", { defaultValue: "About Us" })}
        description={t("hero.description", {
          defaultValue:
            "Uppsala's most natural meeting place for over 30 years",
        })}
      />
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
