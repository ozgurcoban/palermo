import React from "react";
import { INewsItem } from "@/types/generated";
import { HomeHero as Hero } from "@/components/Heros";
import PageTransition from "@/components/ui/PageTransition";
import Gallery from "@/components/Gallery";
import Story from "@/components/Story";
import Menu from "@/components/Menu";
import Wall from "@/components/Wall";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
import RecentNews from "@/components/News/RecentNews";
import Banner from "@/components/Banner";

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
  const {
    banner,
    gallery_section,
    story_section,
    testimonials_section,
    wall_section,
  } = homeData;
  return (
    <PageTransition>
      <Hero />
      {banner && <Banner banners={banner} />}
      <Menu categories={categoriesData} />
      <Gallery data={gallery_section} />
      <AboutUs data={story_section} />
      <Wall data={wall_section} />
      {/* <Testimonials data={testimonials_section} /> */}
      {/* <RecentNews news={news.slice(0, 3)} /> */}
    </PageTransition>
  );
};

export default HomeComponents;
