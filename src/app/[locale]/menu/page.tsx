import Menu from "@/components/Menu";
import { WelcomeSection } from "@/components/Sections";
import PageTransition from "@/components/ui/PageTransition";

export default function MenuPage() {
  return <PageTransition>
    <Menu />
    <WelcomeSection />
  </PageTransition>;
}
