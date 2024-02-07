import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/config";
import { HomeHero as Hero } from "@/components/Heros";
import PageTransition from "@/components/ui/PageTransition";
import Gallery from "@/components/Gallery";
import Story from "@/components/Story";
import Menu from "@/components/Menu";
import Wall from "@/components/Wall";
import Testimonials from "@/components/Testimonials";
import RecentNews from "@/components/News/RecentNews";
import Banner from "@/components/Banner";
import { getNews } from "@/lib/getNews";
import { INewsItem } from "@/types/generated";

type Props = {
  params: { locale: string };
};

export default async function IndexPage({ params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  const news: INewsItem[] = await getNews();

  return (
    <PageTransition>
      <Hero />
      <Banner />
      <Gallery />
      <Story />
      <Menu />
      <Wall />
      <Testimonials />
      <RecentNews news={news.slice(0, 3)} />
    </PageTransition>
  );
}
