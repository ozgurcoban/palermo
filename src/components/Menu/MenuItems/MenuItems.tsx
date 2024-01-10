import React from "react";
import MenuItem from "./MenuItem";
import FadeUp from "@/components/ui/FadeUp";

interface MenuItems {
  data:
    | {
        id: string;
        title: string;
        description: string;
        price: string;
      }[]
    | undefined;
}

export const MenuItems: React.FC<MenuItems> = ({ data }) => {
  return (
    <ul className="mt-8 grid lg:grid-cols-2 grid-cols-1 gap-5 w-full sm:max-h-none max-h-48 sm:overflow-y-hidden overflow-y-scroll">
      {data?.map((item, i) => (
        <MenuItem key={Math.random()} {...item} index={i} />
      ))}
      {(!data || data?.length === 0) && (
        <li className="text-center col-span-2 text-rose-700 text-lg">
          No menu list available
        </li>
      )}
    </ul>
  );
};
