"use client";
import React, { useMemo, useState } from "react";
import MenuTabs from "./MenuTabs";
import MenuItems from "./MenuItems";
import FadeUp from "../ui/FadeUp";
import { useGetLocale } from "@/config";
import { SlashIcon } from "@radix-ui/react-icons";

type Props = {
  categories: Category[];
};

export const Menu: React.FC<Props> = ({ categories }) => {
  // if (
  //   categories &&
  //   categories[0] &&
  //   categories[0].menu_list &&
  //   categories[0].menu_list[0] &&
  //   categories[0].menu_list[0].priceSection
  // ) {
  //   console.log("kiri", categories[0].menu_list[0].priceSection.price);
  // }

  if (Array.isArray(categories) && categories.length > 0)
    return <MenuContent categories={categories} />;

  return;
};

const MenuContent: React.FC<Props> = ({ categories }) => {
  const locale = useGetLocale();

  // The tab category index and its value
  const [tab, setTab] = useState(categories[0]._id);

  // Get the menu list everytime the selected tab changed
  const menus_list = useMemo(() => {
    const filteredList = categories.find(({ _id }) => tab === _id);
    if (filteredList)
      return [
        ...(filteredList.sub_categories ?? []),
        ...(filteredList.menu_list ?? []),
      ];
    else return [];
  }, [tab, categories]);

  const getCategory = useMemo(
    () => categories.find(category => tab === category._id),
    [categories, tab]
  );

  console.log("getCategory", getCategory);

  return (
    <section className="py-32  w-screen border-image">
      <div className="container">
        <FadeUp>
          <h2 className="title-secondary !text-center cursor-default">
            {"Try us, you'll love us"}
          </h2>
        </FadeUp>
        <FadeUp
          delay={0.3}
          duration={0.5}
          variants={{ initial: { scaleY: 0 }, animate: { scaleY: 1 } }}
          className="mt-8 md:mt-16 rounded-3xl border-[12px] border-accent bg-white w-full"
        >
          <FadeUp
            delay={0.8}
            className="h-[80vh] overflow-hidden lg:px-20 md:px-10 px-5 pt-4 pb-8 flex flex-col md:flex-row gap-5 lg:gap-10"
          >
            <div className="flex flex-col">
              <MenuTabs
                tabs={categories}
                selectedTab={tab}
                setSelectedTab={setTab}
              />
            </div>
            <div className="w-full text-center mb-1 mt-6 md:mt-8 sticky top-0 overflow-y-scroll">
              {getCategory?.description && (
                <div className="text-center text-lg mb-3">
                  <p>{getCategory.description?.[locale]}</p>
                </div>
              )}
              <div className="flex">
                <p className="text-right text-gray-700 sticky top-0 bg-white w-full whitespace-nowrap">
                  Servering
                </p>

                {getCategory?.sub_categories?.some(subCategory =>
                  subCategory.menu_list.some(
                    item =>
                      "takeawayPrice" in item.priceSection &&
                      item.priceSection.takeawayPrice
                  )
                ) ? (
                  <>
                    <SlashIcon className="h-6 text-gray-500" />
                    <p className="">Avh.</p>
                  </>
                ) : null}
              </div>
              <hr className="mt-4" />
              <FadeUp delay={1} className="w-full h-full">
                <MenuItems data={menus_list} />
              </FadeUp>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <hr />
          </FadeUp>
        </FadeUp>
      </div>
    </section>
  );
};
