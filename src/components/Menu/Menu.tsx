"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import MenuTabs from "./MenuTabs";
import MenuChips from "./MenuChips";
import MenuItems from "./MenuItems";
import FadeUp from "../ui/FadeUp";
import { useGetLocale } from "@/config";
import { SlashIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  categories: Category[];
  disableAnimations?: boolean;
};

export const Menu: React.FC<Props> = ({
  categories,
  disableAnimations = false,
}) => {
  if (Array.isArray(categories) && categories.length > 0)
    return (
      <MenuContent
        categories={categories}
        disableAnimations={disableAnimations}
      />
    );

  return;
};

const MenuContent: React.FC<Props> = ({
  categories,
  disableAnimations = false,
}) => {
  const t = useTranslations("Home.Menu");
  const locale = useGetLocale();

  // Mobile detection
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const useChips = isMobile;

  // Check if animations should be disabled based on localStorage (24-hour cooldown)
  // Initialize to true to avoid hydration mismatch, then update on client
  const [hasSeenAnimation, setHasSeenAnimation] = useState(true);

  useEffect(() => {
    if (disableAnimations) {
      setHasSeenAnimation(true);
      return;
    }

    // Check localStorage only on client side
    if (typeof window !== "undefined") {
      const lastSeen = localStorage.getItem("menu-animation-seen");
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (lastSeen && now - parseInt(lastSeen) < twentyFourHours) {
        setHasSeenAnimation(true);
      } else {
        // Enable animations on client if not seen recently
        setHasSeenAnimation(false);
        // Save after animations complete
        setTimeout(() => {
          localStorage.setItem("menu-animation-seen", now.toString());
        }, 2000);
      }
    }
  }, [disableAnimations]);

  // Selected categories for multi-select filtering (chips mode)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Single tab selection (tabs mode)
  const [tab, setTab] = useState(categories[0]._id);

  // Ref for scrollable div
  const scrollRef = useRef<HTMLDivElement>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("scrollRef.current:", scrollRef.current);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [selectedCategories, tab]);

  // Get the menu list based on mode
  const menus_list = useMemo(() => {
    if (useChips) {
      // Chips mode: multi-select filtering
      if (selectedCategories.length === 0) {
        return categories.flatMap((category) => [
          ...(category.sub_categories ?? []),
          ...(category.menu_list ?? []),
        ]);
      }

      const filteredCategories = categories.filter(({ _id }) =>
        selectedCategories.includes(_id),
      );

      // Instead of flatMap, return categories with their structure intact
      // This allows us to show category headers
      return filteredCategories;
    } else {
      // Tabs mode: single category selection
      const filteredList = categories.find(({ _id }) => tab === _id);
      if (filteredList)
        return [
          ...(filteredList.sub_categories ?? []),
          ...(filteredList.menu_list ?? []),
        ];
      else return [];
    }
  }, [useChips, selectedCategories, tab, categories]);

  // Get category for description display
  const getCategory = useMemo(() => {
    if (useChips) {
      if (selectedCategories.length === 0) return null;
      return categories.find((category) =>
        selectedCategories.includes(category._id),
      );
    } else {
      return categories.find((category) => tab === category._id);
    }
  }, [useChips, categories, selectedCategories, tab]);

  // Handler functions for chips
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
  };

  // Conditional wrapper for animations
  const AnimWrapper = ({ children, id, ...props }: any) => {
    // Always ensure the id is passed through
    const elementProps = {
      ...props,
      ...(id ? { id } : {}),
    };

    if (disableAnimations || hasSeenAnimation) {
      // Return children with all props including id
      return <div {...elementProps}>{children}</div>;
    }
    return <FadeUp {...elementProps}>{children}</FadeUp>;
  };

  return (
    <div className="border-image w-full">
      <AnimWrapper
        delay={0}
        duration={0.5}
        variants={{ initial: { scaleY: 0 }, animate: { scaleY: 1 } }}
        className="w-full rounded border-4 bg-white dark:bg-card sm:border-8 md:border-[12px]"
        id="menu"
        data-scroll-target="menu"
      >
        <AnimWrapper
          delay={0.5}
          style={{
            boxShadow: "inset 0 0 6px 1px rgba(0, 0, 0, 0.2)",
          }}
          className="flex h-[90vh] flex-col gap-5 px-3 pb-4 pt-6 sm:h-[80vh] sm:px-5 sm:pb-8 sm:pt-8 md:flex-row md:px-10 lg:gap-10 lg:px-20"
        >
          <div className="flex flex-col" ref={wrapperRef}>
            {useChips ? (
              <MenuChips
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                onClearAll={handleClearAll}
                scrollContainerRef={scrollRef}
              />
            ) : (
              <MenuTabs
                tabs={categories}
                selectedTab={tab}
                setSelectedTab={setTab}
              />
            )}
          </div>
          <div
            className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border sticky top-0 mb-1 mt-6 w-full overflow-y-scroll text-center md:mt-8"
            ref={scrollRef}
            data-scroll-container="menu-items"
          >
            <div className="sticky top-0 z-10 mx-auto hidden max-w-md items-center bg-white dark:bg-card md:flex">
              {!useChips &&
              menus_list.some((item) =>
                "menu_list" in item
                  ? item.menu_list?.some(
                      (menuItem) =>
                        "takeawayPrice" in menuItem.priceSection &&
                        menuItem.priceSection.takeawayPrice,
                    )
                  : "priceSection" in item &&
                    "takeawayPrice" in item.priceSection &&
                    item.priceSection.takeawayPrice,
              ) ? (
                <>
                  <p className="sticky top-0 w-full whitespace-nowrap text-right font-medium text-primary">
                    {t("dineIn")}
                  </p>
                  <SlashIcon className="h-6 text-primary" />{" "}
                  {/* Updated to use text-primary */}
                  {t("takeAway.full") ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="whitespace-nowrap font-medium text-primary">
                            {t("takeAway.short")}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>{t("takeAway.full")}</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <p className="whitespace-nowrap font-medium text-primary">
                      {t("takeAway.short")}
                    </p>
                  )}
                </>
              ) : null}
              {!useChips &&
              menus_list.some((item) =>
                "menu_list" in item
                  ? item.menu_list?.some(
                      (menuItem) =>
                        "glassPrice" in menuItem.priceSection &&
                        menuItem.priceSection.glassPrice,
                    )
                  : "priceSection" in item &&
                    "glassPrice" in item.priceSection &&
                    item.priceSection.glassPrice,
              ) ? (
                <TooltipProvider>
                  <Tooltip>
                    <div className="relative z-50 flex w-full justify-end">
                      <TooltipTrigger asChild>
                        <p className="whitespace-nowrap font-medium text-primary">
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
                      <p className="whitespace-nowrap font-medium text-primary">
                        {t("bottle.short")}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>{t("bottle.full")}</span>
                    </TooltipContent>
                  </Tooltip>
                  <SlashIcon className="h-6 text-primary" />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="whitespace-nowrap font-medium text-primary">
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
            <div className="h-full w-full">
              <MenuItems
                data={menus_list}
                showCategoryHeaders={
                  !!useChips && selectedCategories.length > 1
                }
              />
            </div>
          </div>
        </AnimWrapper>
        <AnimWrapper delay={0.2}>
          <hr />
        </AnimWrapper>
      </AnimWrapper>
    </div>
  );
};
