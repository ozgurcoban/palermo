"use client";

import React from "react";
import MenuTabs from "./MenuTabs";
import MenuChips from "./MenuChips";
import MenuItems from "./MenuItems";
import { useTranslations } from "next-intl";
import { AnimationWrapper } from "./AnimationWrapper";
import { PriceLabelsHeader } from "./PriceLabelsHeader";
import { MenuHeader } from "./MenuHeader";
import {
  useResponsiveHeight,
  useAnimationState,
  useCategoryFiltering,
  useScrollTracking,
} from "@/hooks/menu";
import { useHysteresis } from "@/hooks/useHysteresis";
import {
  shouldShowTakeawayLabelsBasedOnScroll,
  shouldShowGlassLabelsBasedOnScroll,
} from "./menuUtils";

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

  return null;
};

const MenuContent: React.FC<Props> = ({
  categories,
  disableAnimations = false,
}) => {
  const t = useTranslations("Home.Menu");

  // Custom hooks
  const { isMobile } = useResponsiveHeight();
  const { hasSeenAnimation } = useAnimationState(disableAnimations);
  const {
    selectedCategories,
    tab,
    menus_list,
    getCategory,
    scrollRef,
    handleCategoryToggle,
    handleClearAll,
    setTab,
  } = useCategoryFiltering({ categories, isMobile });

  // Track which category/subcategory is visible in viewport while scrolling
  const { visibleCategoryId, visibleSubcategoryId } = useScrollTracking({
    scrollRef,
    useChips: isMobile,
    menus_list,
    selectedCategories,
  });

  // Calculate what labels to show
  const showTakeawayLabels = shouldShowTakeawayLabelsBasedOnScroll(
    categories,
    isMobile,
    visibleCategoryId,
    getCategory,
    visibleSubcategoryId,
    selectedCategories,
  );

  const shouldShowGlassLabelsRaw = shouldShowGlassLabelsBasedOnScroll(
    categories,
    isMobile,
    visibleCategoryId,
    getCategory,
    visibleSubcategoryId,
    selectedCategories,
  );

  // Apply hysteresis to wine label visibility
  const showGlassLabels = useHysteresis(shouldShowGlassLabelsRaw, 1500);

  return (
    <div className="border-image w-full">
      <AnimationWrapper
        hasSeenAnimation={hasSeenAnimation}
        disableAnimations={disableAnimations}
        delay={0}
        variants={{ initial: { scaleY: 0 }, animate: { scaleY: 1 } }}
        className="w-full rounded border-4 bg-white dark:bg-card sm:border-8 md:border-[12px]"
        id="menu"
        data-scroll-target="menu"
        onlyInitial={true}
      >
        <div
          style={{
            boxShadow: "inset 0 0 6px 1px rgba(0, 0, 0, 0.2)",
          }}
          className="menu-height flex flex-col gap-5 px-3 pb-4 pt-6 sm:px-5 sm:pb-8 sm:pt-8 md:flex-row md:px-10 lg:gap-10 lg:px-20"
        >
          <div className="flex flex-shrink-0 flex-col">
            {isMobile ? (
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
            className="menu-scroll-container scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border sticky top-0 mb-1 mt-6 w-full text-center md:mt-8"
            ref={scrollRef}
            data-scroll-container="menu-items"
            tabIndex={0}
            role="region"
            aria-label={t("menuItemsLabel")}
          >
            {!isMobile && <MenuHeader category={getCategory} />}

            <PriceLabelsHeader
              shouldShowTakeawayLabels={showTakeawayLabels}
              shouldShowGlassLabels={showGlassLabels}
            />

            <div className="h-full w-full pb-24 lg:pb-0">
              <MenuItems
                key={isMobile ? selectedCategories.join("-") : tab}
                data={menus_list}
                showCategoryHeaders={
                  isMobile &&
                  (selectedCategories.length === 0 ||
                    selectedCategories.length >= 1)
                }
              />
            </div>
          </div>
        </div>
        <hr />
      </AnimationWrapper>
    </div>
  );
};
