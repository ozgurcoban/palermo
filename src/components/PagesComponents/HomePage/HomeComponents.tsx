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

  const {
    banner,
    gallery_section,
    story_section,
    testimonials_section,
    wall_section,
  } = homeData;
  return (
    <>
      <Hero />
      {banner && <Banner banners={banner} />}
      <Menu categories={categoriesData} />
      {/* <AboutUs data={story_section} /> */}
      <Gallery data={gallery_section} />
      {/* <Wall data={wall_section} /> */}
      {/* <Testimonials data={testimonials_section} /> */}
      {/* <RecentNews news={news.slice(0, 3)} /> */}
    </>
  );
};

export default HomeComponents;
