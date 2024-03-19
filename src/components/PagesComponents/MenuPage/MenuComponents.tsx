import React from "react";
import PageTransition from "@/components/ui/PageTransition";
import Menu from "@/components/Menu";
import { WelcomeSection } from "@/components/Sections";

type Props = {
  categoriesData: Category[];
};

const MenuComponents: React.FC<Props> = ({ categoriesData }) => {
  return (
    <PageTransition>
      <Menu categories={categoriesData} />
      <WelcomeSection />
    </PageTransition>
  );
};

export default MenuComponents;
