import { IMenuItem, IMenuList, ISubCategory } from "@/types/generated";
import React from "react";

const MenuItem: React.FC<{ item: IMenuList }> = ({ item }) => {
  if ((item as IMenuItem).title) return <MenuFoodItem {...item as IMenuItem} />;
  return (
    <li className="flex items-center flex-col gap-2">
      <h3 className="font-recoleta font-medium text-2xl tracking-tight">
        {(item as ISubCategory).sub_category_title}
      </h3>
      <span className="text-sm font-lato text-dark/85">{item.description}</span>
      <ul className="flex flex-col gap-5 pt-6 mt-3 border-t">
        {
          (item as ISubCategory).menu_list?.map((item) => (
            <MenuFoodItem key={Math.random()} {...item} />
          ))
        }
      </ul>
    </li>
  );
};

const MenuFoodItem: React.FC<IMenuItem> = ({ title, price, description }) => {
  return (
    <li className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h4 className="font-recoleta font-light text-xl tracking-tight">
          {title}
        </h4>
        <div className="mx-2 flex-1 h-[1px] bg-accent/50" />
        <span className="font-lobster text-md text-accent self-start">
          {price}kr
        </span>
      </div>
      <span className="text-sm font-lato text-dark/85">{description}</span>
    </li>
  );
};

export default MenuItem;
