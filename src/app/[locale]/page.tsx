import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/config";
import { HomeHero as Hero } from "@/components/Heros";
import PageTransition from "@/components/ui/PageTransition";
import Gallery from "@/components/Gallery";
import Story from "@/components/Story";
import Menu from "@/components/Menu";
import Wall from "@/components/Wall";
import WaveDivider from "@/components/WaveDivider";
import Testimonials from "@/components/Testimonials";
import RecentNews from "@/components/News/RecentNews";
import Banner from "@/components/Banner";

type Props = {
  params: { locale: string };
};

export default function IndexPage({ params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some(cur => cur === locale);
  if (!isValidLocale) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <PageTransition>
      <Hero />
      <Banner />
      <Gallery />
      <Story />
      <Menu />
      <Wall />
      <Testimonials />
      <RecentNews />
    </PageTransition>
  );
}
