import Banner from "@/components/Banner";
import { AboutHero } from "@/components/Heros";
import NationEveryone from "@/components/NationEveryone";
import { FirstSection } from "@/components/Sections";
import PageTransition from "@/components/ui/PageTransition";

export default function AboutPage() {
  return (
    <PageTransition>
      <AboutHero />
      <Banner />
      <NationEveryone />
      <FirstSection />
    </PageTransition>
  );
}
