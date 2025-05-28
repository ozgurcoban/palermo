import React from "react";
import PageTransition from "@/components/ui/PageTransition";
import { Lunch } from "@/components/Lunch/Lunch";

type Props = {
  lunchData: LunchConfiguration;
};

const MenuComponents: React.FC<Props> = ({ lunchData }) => {
  return (
    <PageTransition>
      <Lunch lunchData={lunchData} />
    </PageTransition>
  );
};

export default MenuComponents;
