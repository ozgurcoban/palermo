"use client";

import React from "react";
import { INewsItem } from "@/types/generated";
import { HomeHero as Hero } from "@/components/Heros";
import Gallery from "@/components/Gallery";
// import Story from "@/components/Story";
import Menu from "@/components/Menu";
// import Wall from "@/components/Wall";
// import AboutUs from "@/components/AboutUs";
// import Testimonials from "@/components/Testimonials";
// import RecentNews from "@/components/News/RecentNews";
import Banner from "@/components/Banner";
import Script from "next/script";
import { generateFAQSchema } from "@/lib/metadata";
import { useGetLocale } from "@/config";
import { FAQ } from "@/components/FAQ";

type Props = {
  homeData: HomePage;
  news: INewsItem[];
  categoriesData: Category[];
};

const HomeComponents: React.FC<Props> = ({
  homeData,
  news,
  categoriesData,
}) => {
  // console.log("homeData", homeData);
  const locale = useGetLocale();
  const faqSchema = generateFAQSchema(locale as "sv" | "en");

  const {
    banner,
    gallery_section,
    story_section,
    testimonials_section,
    wall_section,
  } = homeData;
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      {banner && <Banner banners={banner} />}
      <section className="w-full py-16 md:py-20">
        <div className="container">
          <Menu categories={categoriesData} />
        </div>
      </section>
      {/* <AboutUs data={story_section} /> */}
      <Gallery data={gallery_section} />
      <FAQ />
      {/* <Wall data={wall_section} /> */}
      {/* <Testimonials data={testimonials_section} /> */}
      {/* <RecentNews news={news.slice(0, 3)} /> */}
    </>
  );
};

export default HomeComponents;
