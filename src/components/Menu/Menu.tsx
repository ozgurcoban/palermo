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

  // The tab category index and its value
  const [tab, setTab] = useState(categories[0]._id);

  // Ref for scrollable div
  const scrollRef = useRef<HTMLDivElement>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Removed debug log
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [tab]);

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
        className="w-full rounded border-4 bg-white sm:border-8 md:border-[12px]"
        id="menu"
        data-scroll-target="menu"
      >
        <AnimWrapper
          delay={0.5}
          style={{
            boxShadow: "inset 0 0 6px 1px rgba(0, 0, 0, 0.2)",
          }}
          className="flex h-[80vh] gap-5 px-3 pb-4 pt-6 sm:px-5 sm:pb-8 sm:pt-8 md:flex-row md:px-10 lg:gap-10 lg:px-20"
        >
          <div className="flex flex-col" ref={wrapperRef}>
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
                  {t("takeAway.full") ? (
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
                  ) : (
                    <p className="whitespace-nowrap text-primary">
                      {t("takeAway.short")}
                    </p>
                  )}
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
                    <div className="relative z-50 flex w-full justify-end">
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
            <div className="h-full w-full">
              <MenuItems data={menus_list} />
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
