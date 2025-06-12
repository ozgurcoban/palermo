import React from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import { generateFAQSchema } from "@/lib/metadata";
import { HomeHero } from "@/components/Heros";
import Menu from "@/components/Menu";

// Dynamic imports for below-the-fold components
const Gallery = dynamic(() => import("@/components/Gallery"), {
  loading: () => <div className="h-[600px] animate-pulse bg-gray-100" />,
  ssr: true,
});

const FAQ = dynamic(() => import("@/components/FAQ").then(mod => ({ default: mod.FAQ })), {
  loading: () => <div className="h-[400px] animate-pulse bg-gray-50" />,
  ssr: true,
});

type Props = {
  homeData: HomePage;
  categoriesData: Category[];
  locale: string;
};

const HomeComponentsOptimized: React.FC<Props> = ({
  homeData,
  categoriesData,
  locale,
}) => {
  const faqSchema = generateFAQSchema(locale as "sv" | "en");

  const { gallery_section } = homeData;

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeHero />
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