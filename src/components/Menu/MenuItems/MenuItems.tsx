import React from "react";
import MenuItem from "./MenuItem";

export const MenuItems: React.FC<{ data: (SubCategory | Food)[] }> = ({
  data,
}) => {
  // console.log(data)
  return (
    <ul className="flex flex-col max-w-96 mx-auto mt-8 gap-5 w-full h-full custom-scrollbar-container">
      {data?.map(item => (
        <MenuItem key={item._id} item={item} />
      ))}
      {(!data || data?.length === 0) && (
        <li className="text-center col-span-2 text-rose-700 text-lg">
          No menu list available
        </li>
      )}
    </ul>
  );
};
