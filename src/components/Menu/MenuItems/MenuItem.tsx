import { useGetLocale } from "@/config";
import React from "react";
import { SlashIcon } from "@radix-ui/react-icons";

const MenuItem: React.FC<{ item: SubCategory | Food | Wine }> = ({ item }) => {
  // console.log("item", item, "type", item._type);

  const locale = useGetLocale();

  if (item._type === "foods") return <MenuFoodItem {...(item as Food)} />;
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
        {(item as SubCategory).menu_list?.map(item =>
          item._type === "wines" ? (
            <MenuWineItem key={item._id} {...(item as Wine)} />
          ) : (
            <MenuFoodItem key={item._id} {...(item as Food)} />
          )
        )}
      </ul>
    </li>
  );
};

const MenuFoodItem: React.FC<Food> = ({
  title,
  priceSection: { price, takeawayPrice },
  description,
  badge,
}) => {
  // console.log(price);

  const locale = useGetLocale();
  return (
    <li className="flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <h4 className="sm:max-w-64 max-w-44 text-balance font-recoleta text-left text-xl tracking-tight">
          {title[locale]}
        </h4>

        <div className="mx-2 flex-1 h-[1px] bg-accent/50 mt-3" />
        <div>
          <span className="font-lobster text-md text-accent whitespace-nowrap">
            {price} {!takeawayPrice ? <span>kr</span> : null}
          </span>
          {takeawayPrice && (
            <>
              <SlashIcon className="inline-block h-6 ml-[-4px]" />
              <span className="font-lobster text-md text-gray-500 whitespace-nowrap">
                {takeawayPrice} <span>kr</span>
              </span>
            </>
          )}
        </div>
      </div>
      {description && (
        <span className="text-sm text-left font-lato text-dark/85">
          {description[locale]}
        </span>
      )}
      {badge && (
        <span className="self-start rounded-md bg-neutral-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 uppercase whitespace-nowrap">
          {badge[locale]}
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
      {badge && (
        <span className="inline-flex items-center rounded-md bg-neutral-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 ml-1 uppercase whitespace-nowrap self-start">
          {badge[locale]}
        </span>
      )}
    </li>
  );
};

export default MenuItem;
