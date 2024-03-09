import { useGetLocale } from "@/config";
import React from "react";

const MenuItem: React.FC<{ item: SubCategory | Food | Wine }> = ({ item }) => {
  console.log("item", item, "type", item._type);

  const locale = useGetLocale();

  if (item._type === "foods")
    // Identify if the item is the food
    return <MenuFoodItem {...(item as Food)} />;
  // else if (item._type === "subcategories") {
  //   return <MenuWineItem {...(item as Wine)} />;
  // }
  return (
    <li className="flex text-center items-center flex-col gap-2">
      <h3 className="font-recoleta font-medium text-2xl tracking-tight w-full">
        {(item as SubCategory).title[locale]}
      </h3>
      {item.description && (
        <span className="text-sm font-lato text-dark/85 w-full">
          {item.description[locale]}
        </span>
      )}
      <ul className="flex flex-col gap-5 py-6 mt-3 border-y w-full">
        {(item as SubCategory).menu_list?.map(item => (
          <MenuFoodItem key={item._id} {...item} />
        ))}
      </ul>
    </li>
  );
};

const MenuFoodItem: React.FC<Food> = ({
  title,
  priceSection: { price, takeAwayPrice },
  description,
  badge,
}) => {
  // console.log(price);

  const locale = useGetLocale();
  return (
    <li className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h4 className="font-recoleta text-left text-xl tracking-tight">
          {title[locale]}
        </h4>
        {badge && (
          <span className="inline-flex items-center rounded-md bg-neutral-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 ml-1 uppercase">
            {badge[locale]}
          </span>
        )}
        <div className="mx-2 flex-1 h-[1px] bg-accent/50" />
        <div>
          <span className="font-lobster text-md text-accent self-start whitespace-nowrap">
            {price} <span>kr</span>
          </span>
        </div>
      </div>
      {description && (
        <span className="text-sm text-left font-lato text-dark/85">
          {description[locale]}
        </span>
      )}
    </li>
  );
};
const MenuWineItem: React.FC<Wine> = ({
  title,
  priceSection: { bottlePrice, glassPrice, carafePrice },
  description,
  badge,
}) => {
  // console.log(price);

  const locale = useGetLocale();
  return (
    <li className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h4 className="font-recoleta text-left text-xl tracking-tight">
          {title[locale]}
        </h4>
        {badge && (
          <span className="inline-flex items-center rounded-md bg-neutral-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 ml-1 uppercase">
            {badge[locale]}
          </span>
        )}
        <div className="mx-2 flex-1 h-[1px] bg-accent/50" />
        <div>
          <span className="font-lobster text-md text-accent self-start whitespace-nowrap">
            {glassPrice} <span>kr</span>
          </span>
        </div>
      </div>
      {description && (
        <span className="text-sm text-left font-lato text-dark/85">
          {description[locale]}
        </span>
      )}
    </li>
  );
};

export default MenuItem;
