import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/config";
import Hero from "@/components/Hero";
import PageTransition from "@/components/ui/PageTransition";
import Gallery from "@/components/Gallery";
import Story from "@/components/Story";
import Menu from "@/components/Menu";
import Wall from "@/components/Wall";
import WaveDivider from "@/components/WaveDivider";

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
      <WaveDivider />
      <Gallery />
      <Story />
      <Menu />
      <Wall />
    </PageTransition>
  );
}
