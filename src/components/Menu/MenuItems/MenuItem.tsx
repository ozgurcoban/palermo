import { useGetLocale } from "@/config";
import React from "react";
import { SlashIcon } from "@radix-ui/react-icons";
import MaskText from "@/components/ui/MaskText";

const MenuItem: React.FC<{ item: SubCategory | Food | Wine }> = ({ item }) => {
  // console.log("item", item, "type", item._type);

  const locale = useGetLocale();

  if (item._type === "foods") return <MenuFoodItem {...(item as Food)} />;
  return (
    <li className="flex flex-col items-center gap-2 text-center">
      <h3 className="w-full font-recoleta text-2xl font-medium tracking-tight">
        {(item as SubCategory).title[locale]}
      </h3>
      {item.description && (
        <span className="w-full font-lato text-sm text-dark/85">
          {item.description[locale]}
        </span>
      )}
      <ul className="mt-3 flex w-full flex-col gap-5 border-y py-6">
        {(item as SubCategory).menu_list?.map((item) =>
          item._type === "wines" ? (
            <MenuWineItem key={item._id} {...(item as Wine)} />
          ) : (
            <MenuFoodItem key={item._id} {...(item as Food)} />
          ),
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
      <div className="flex items-start justify-between">
        <h4 className="max-w-44 text-balance text-left font-recoleta text-xl tracking-tight sm:max-w-64">
          {title[locale]}
        </h4>

        <div className="mx-2 mt-3 h-[1px] flex-1 bg-accent/50" />
        <div>
          <span className="text-md whitespace-nowrap font-lobster text-primary">
            {price} {!takeawayPrice ? <span>kr</span> : null}
          </span>
          {takeawayPrice && (
            <>
              <SlashIcon className="ml-[-4px] inline-block h-6" />
              <span className="text-md whitespace-nowrap font-lobster text-gray-500">
                {takeawayPrice} <span>kr</span>
              </span>
            </>
          )}
        </div>
      </div>
      {description && (
        <span className="text-left font-lato text-sm text-dark/85">
          {description[locale]}
        </span>
      )}
      {badge && (
        <span className="self-start whitespace-nowrap rounded-md bg-neutral-50 px-2 py-1 text-xs font-medium uppercase text-gray-600 ring-1 ring-inset ring-gray-500/10">
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
      <div className="flex items-center justify-between">
        <h4 className="text-left font-recoleta text-xl tracking-tight">
          {title[locale]}
        </h4>

        <div className="mx-2 h-[1px] flex-1 bg-accent/50" />
        <div>
          <span className="text-md self-start whitespace-nowrap font-lobster">
            {glassPrice}
          </span>
          <SlashIcon className="ml-[-4px] inline-block h-6" />
          <span className="text-md self-start whitespace-nowrap font-lobster">
            {bottlePrice} {!carafePrice && <span>kr</span>}
          </span>
          <SlashIcon className="ml-[-4px] inline-block h-6" />
          {carafePrice ? (
            <span className="text-md whitespace-nowrap font-lobster">
              {carafePrice} <span>kr</span>
            </span>
          ) : (
            <span className="whitespace-nowrap text-sm text-gray-400">N/A</span>
          )}
        </div>
      </div>
      {description && (
        <span className="text-left font-lato text-sm text-dark/85">
          {description[locale]}
        </span>
      )}
      {badge && (
        <span className="ml-1 inline-flex items-center self-start whitespace-nowrap rounded-md bg-neutral-50 px-2 py-1 text-xs font-medium uppercase text-gray-600 ring-1 ring-inset ring-gray-500/10">
          {badge[locale]}
        </span>
      )}
    </li>
  );
};

export default MenuItem;
