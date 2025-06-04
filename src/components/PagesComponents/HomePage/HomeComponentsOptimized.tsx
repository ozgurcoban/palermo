import React from "react";
import { INewsItem } from "@/types/generated";
import Gallery from "@/components/Gallery";
import Script from "next/script";
import { generateFAQSchema } from "@/lib/metadata";
import { FAQ } from "@/components/FAQ";
import { HomeHeroUltraOptimized } from "@/components/Heros/HomeHeroUltraOptimized";

// Import Menu normally to avoid dynamic import issues
import Menu from "@/components/Menu";

type Props = {
  homeData: HomePage;
  news: INewsItem[];
  categoriesData: Category[];
  locale: string;
};

const HomeComponentsOptimized: React.FC<Props> = ({
  homeData,
  news,
  categoriesData,
  locale,
}) => {
  const faqSchema = generateFAQSchema(locale as "sv" | "en");

  const { gallery_section, story_section } = homeData;

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeHeroUltraOptimized locale={locale} />
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

export default HomeComponentsOptimized;