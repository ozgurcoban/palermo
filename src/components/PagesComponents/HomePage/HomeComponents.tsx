"use client";

import React from "react";
import { HomeHero as Hero } from "@/components/Heros";
import Gallery from "@/components/Gallery";
import dynamic from "next/dynamic";
import { MenuSkeleton } from "@/components/Menu";
import Script from "next/script";
import { generateFAQSchema } from "@/lib/metadata";
import { useGetLocale } from "@/config";
import { FAQ } from "@/components/FAQ";
import { IntroSection } from "@/components/IntroSection";

// Dynamic import for Menu to prevent FOUC
const Menu = dynamic(
  () => import("@/components/Menu").then(mod => ({ default: mod.Menu })),
  {
    loading: () => <MenuSkeleton />,
    ssr: false,
  }
);

type Props = {
  homeData: HomePage;
  categoriesData: Category[];
};

const HomeComponents: React.FC<Props> = ({
  homeData,
  categoriesData,
}) => {
  // console.log("homeData", homeData);
  const locale = useGetLocale();
  const faqSchema = generateFAQSchema(locale as "sv" | "en");

  const { gallery_section, intro_section } = homeData;
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <IntroSection data={intro_section} />
      <section className="w-full py-16 md:py-20">
        <div className="container">
          <Menu categories={categoriesData} />
        </div>
      </section>
      <Gallery data={gallery_section} />
      <FAQ />
    </>
  );
};

export default HomeComponents;
