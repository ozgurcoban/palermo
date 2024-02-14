"use client";
import React, { useMemo, useState } from "react";
import MenuTabs from "./MenuTabs";
import MenuItems from "./MenuItems";
import FadeUp from "../ui/FadeUp";
import { getLocale } from "@/config";

type Props = {
  categories: Category[];
};

export const Menu: React.FC<Props> = ({ categories }) => {
  if (Array.isArray(categories) && categories.length > 0)
    return <MenuContent categories={categories} />;

  return;
};

const MenuContent: React.FC<Props> = ({ categories }) => {
  const locale = getLocale();

  // The tab category index and its value
  const [tab, setTab] = useState({
    index: 1,
    value: categories[0]._id,
  });

  // Get the menu list everytime the selected tab changed
  const menus_list = useMemo(() => {
    const filteredList = categories.find(({ _id }) => tab.value === _id);
    if (filteredList)
      return [
        ...(filteredList.sub_categories ?? []),
        ...(filteredList.menu_list ?? []),
      ];
    else return [];
  }, [tab.value]);

  return (
    <section className="py-32  w-screen border-image">
      <div className="container">
        <FadeUp>
          <h2 className="title-secondary !text-center cursor-default">
            Try us, you'll love us
          </h2>
        </FadeUp>
        <FadeUp
          delay={0.3}
          duration={0.5}
          variants={{ initial: { scaleY: 0 }, animate: { scaleY: 1 } }}
          className="mt-16 rounded-3xl border-[12px] border-accent bg-white w-full"
        >
          <FadeUp
            delay={0.8}
            className="h-[80vh] overflow-hidden lg:px-20 md:px-10 px-5 py-16 flex gap-5 lg:gap-10"
          >
            <div className="flex flex-col">
              <MenuTabs
                tabs={categories}
                selectedTab={tab.index}
                setSelectedTab={setTab}
              />
            </div>
            <div className="w-full text-center mb-1 mt-8">
              {categories[tab.index].description && (
                <div className="text-center text-lg mb-3">
                  <p>{categories[tab.index].description?.[locale]}</p>
                </div>
              )}
              <span className="text-center text-gray-700">
                Servering/Avhämtning
              </span>
              <hr className="mt-4" />
              <FadeUp delay={1} className="w-full h-full overflow-y-scroll">
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
