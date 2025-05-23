"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import MenuTabs from "./MenuTabs";
import MenuItems from "./MenuItems";
import FadeUp from "../ui/FadeUp";
import { useGetLocale } from "@/config";
import { SlashIcon } from "@radix-ui/react-icons";
import Localization from "../localization";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [tab]);

  useEffect(() => {
    if (!scrollRef.current || !wrapperRef.current) return;

    // Check localStorage first
    if (localStorage.getItem("menu-scroll")) {
      return;
    }

    // Single observer configuration for both refs
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-subtle-scroll");
          localStorage.setItem("menu-scroll", "true");
          observer.unobserve(entry.target);
        }
      });
    });

    // Observe both elements
    observer.observe(scrollRef.current);

    if (window.innerWidth < 768) observer.observe(wrapperRef.current);

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, []);

  // This effect removes the animation class if the user scrolls the container.
  useEffect(() => {
    const scroll = scrollRef.current;
    const wrapper = wrapperRef.current;
    if (!scroll || !wrapper) return;

    const handleScroll = () => {
      // If the container has been scrolled even a little, remove the animation
      if (scroll.scrollTop > 0) {
        scroll.classList.remove("animate-subtle-scroll");
        wrapper.classList.remove("animate-subtle-scroll");
      }
    };

    scroll.addEventListener("scroll", handleScroll);

    return () => {
      scroll.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Get the menu list every time the selected tab changes
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
    <section className="border-image w-screen py-24">
      <div className="container">
        {/* <h1>API URL: {process.env.NEXT_PUBLIC_API_URL}</h1> */}
        <FadeUp>
          <h2 className="title-secondary cursor-default !text-center" id="menu">
            <Localization text="Home.Menu.title" />
          </h2>
        </FadeUp>
        <FadeUp
          delay={0.3}
          duration={0.5}
          variants={{ initial: { scaleY: 0 }, animate: { scaleY: 1 } }}
          className="mt-8 w-full rounded border-[12px] bg-white md:mt-16"
        >
          <FadeUp
            delay={0.8}
            style={{
              boxShadow: "inset 0 0 6px 1px rgba(0, 0, 0, 0.2)",
            }}
            className="flex h-[80vh] flex-col gap-5 overflow-hidden px-5 pb-8 pt-4 md:flex-row md:px-10 lg:gap-10 lg:px-20"
          >
            <div className="flex flex-col" ref={wrapperRef}>
              <MenuTabs
                tabs={categories}
                selectedTab={tab}
                setSelectedTab={setTab}
              />
            </div>
            <div
              className="subtle-scroll sticky top-0 mb-1 mt-6 w-full overflow-y-scroll text-center md:mt-8"
              ref={scrollRef}
            >
              {getCategory?.description && (
                <div className="mx-auto mb-3 max-w-md text-justify text-lg">
                  <p>{getCategory.description?.[locale]}</p>
                </div>
              )}
              <div className="sticky top-0 mx-auto flex max-w-md items-center bg-white">
                {getCategory?.sub_categories?.some((subCategory) =>
                  subCategory.menu_list.some(
                    (item) =>
                      "takeawayPrice" in item.priceSection &&
                      item.priceSection.takeawayPrice,
                  ),
                ) ? (
                  <>
                    <p className="sticky top-0 w-full whitespace-nowrap bg-white text-right text-primary">
                      {t("dineIn")}
                    </p>
                    <SlashIcon className="h-6 text-primary" />{" "}
                    {/* Updated to use text-primary */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="whitespace-nowrap text-primary">
                            {t("takeAway.short")}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>{t("takeAway.full")}</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </>
                ) : null}
                {getCategory?.sub_categories?.some((subCategory) =>
                  subCategory.menu_list.some(
                    (item) =>
                      "glassPrice" in item.priceSection &&
                      item.priceSection.glassPrice,
                  ),
                ) ? (
                  <TooltipProvider>
                    <Tooltip>
                      <div className="flex w-full justify-end">
                        <TooltipTrigger asChild>
                          <p className="whitespace-nowrap text-primary">
                            {t("glass.short")}
                          </p>
                        </TooltipTrigger>
                      </div>
                      <TooltipContent>
                        <span>{t("glass.full")}</span>
                      </TooltipContent>
                    </Tooltip>
                    <SlashIcon className="h-6 text-primary" />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="whitespace-nowrap text-primary">
                          {t("bottle.short")}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>{t("bottle.full")}</span>
                      </TooltipContent>
                    </Tooltip>
                    <SlashIcon className="h-6" />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="whitespace-nowrap text-primary">
                          {t("carafe.short")}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>{t("carafe.full")}</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
