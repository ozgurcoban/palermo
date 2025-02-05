"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import MenuTabs from "./MenuTabs";
import MenuItems from "./MenuItems";
import FadeUp from "../ui/FadeUp";
import { useGetLocale } from "@/config";
import { SlashIcon } from "@radix-ui/react-icons";
import Localization from "../localization";
import { useTranslations } from "next-intl";

type Props = {
  categories: Category[];
};

export const Menu: React.FC<Props> = ({ categories }) => {
  if (Array.isArray(categories) && categories.length > 0)
    return <MenuContent categories={categories} />;

  return;
};

const MenuContent: React.FC<Props> = ({ categories }) => {
  const t = useTranslations("Home.Menu");
  const locale = useGetLocale();

  // The tab category index and its value
  const [tab, setTab] = useState(categories[0]._id);

  // Ref for scrollable div
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [tab]);

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
    () => categories.find((category) => tab === category._id),
    [categories, tab],
  );

  return (
    <section className="border-image w-screen py-32">
      <div className="container">
        <FadeUp>
          <h2 className="title-secondary cursor-default !text-center">
            <Localization text="Home.Menu.title" />
          </h2>
        </FadeUp>
        <FadeUp
          delay={0.3}
          duration={0.5}
          variants={{ initial: { scaleY: 0 }, animate: { scaleY: 1 } }}
          className="mt-8 w-full rounded border-[12px] border-accent bg-white md:mt-16"
        >
          <FadeUp
            delay={0.8}
            className="flex h-[80vh] flex-col gap-5 overflow-hidden px-5 pb-8 pt-4 md:flex-row md:px-10 lg:gap-10 lg:px-20"
          >
            <div className="flex flex-col">
              <MenuTabs
                tabs={categories}
                selectedTab={tab}
                setSelectedTab={setTab}
              />
            </div>
            <div
              className="sticky top-0 mb-1 mt-6 w-full overflow-y-scroll text-center md:mt-8"
              ref={scrollRef}
            >
              {getCategory?.description && (
                <div className="mx-auto mb-3 max-w-md text-justify text-lg">
                  <p>{getCategory.description?.[locale]}</p>
                </div>
              )}
              <div className="sticky top-0 mx-auto flex max-w-md bg-white">
                {getCategory?.sub_categories?.some((subCategory) =>
                  subCategory.menu_list.some(
                    (item) =>
                      "takeawayPrice" in item.priceSection &&
                      item.priceSection.takeawayPrice,
                  ),
                ) ? (
                  <>
                    <p className="sticky top-0 w-full whitespace-nowrap bg-white text-right text-accent">
                      {t("dineIn")}
                    </p>
                    <SlashIcon className="h-6 text-gray-500" />
                    <p className="whitespace-nowrap text-gray-500">
                      {" "}
                      {t("takeAway")}
                    </p>
                  </>
                ) : null}
                {getCategory?.sub_categories?.some((subCategory) =>
                  subCategory.menu_list.some(
                    (item) =>
                      "glassPrice" in item.priceSection &&
                      item.priceSection.glassPrice,
                  ),
                ) ? (
                  <>
                    <p className="sticky top-0 w-full whitespace-nowrap bg-white text-right text-accent">
                      {t("glass")}
                    </p>
                    <SlashIcon className="h-6 text-accent" />
                    <p className="">{t("bottle")}</p>
                    <SlashIcon className="h-6" />
                    <p className="text-gray-500">{t("carafe")}</p>
                  </>
                ) : null}
              </div>
              <hr className="mt-4" />
              <FadeUp delay={1} className="h-full w-full">
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
