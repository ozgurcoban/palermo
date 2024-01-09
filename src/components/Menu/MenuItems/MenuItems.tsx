import React from "react";
import MenuItem from "./MenuItem";
import FadeUp from "@/components/ui/FadeUp";

interface MenuItems {
  data:
    | {
        title: string;
        description: string;
        price: string;
      }[]
    | undefined;
}

export const MenuItems: React.FC<MenuItems> = ({ data }) => {
  return (
    <ul className="mt-8 grid lg:grid-cols-2 grid-cols-1 gap-5 w-full sm:max-h-none max-h-40 sm:overflow-y-hidden overflow-y-scroll">
      {data?.map((item, i) => (
        <FadeUp key={`menu-item-${i}`} delay={1.2 + i * 0.2}>
          <MenuItem {...item} />
        </FadeUp>
      ))}
    </ul>
  );
};
