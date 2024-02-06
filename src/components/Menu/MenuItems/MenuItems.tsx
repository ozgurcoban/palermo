import React from "react";
import MenuItem from "./MenuItem";
import { IMenuList } from "@/types/generated";

export const MenuItems: React.FC<{ data: IMenuList[] }> = ({ data }) => {
  return (
    <ul className="flex flex-col max-w-96 mx-auto mt-8 gap-5 w-full h-full custom-scrollbar-container">
      {data?.map((item) => (
        <MenuItem key={Math.random()} item={item} />
      ))}
      {(!data || data?.length === 0) && (
        <li className="text-center col-span-2 text-rose-700 text-lg">
          No menu list available
        </li>
      )}
    </ul>
  );
};
