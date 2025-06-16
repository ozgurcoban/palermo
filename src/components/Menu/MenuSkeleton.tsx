"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { MenuTabsSkeleton } from "./MenuTabsSkeleton";
import { MenuChipsSkeleton } from "./MenuChipsSkeleton";
import { MenuItemsSkeleton } from "./MenuItemsSkeleton";
import { useResponsiveHeight } from "@/hooks/menu";

export const MenuSkeleton: React.FC = () => {
  const { isMobile } = useResponsiveHeight();
  const useChips = isMobile;

  return (
    <div className="border-image w-full">
      <div
        className="w-full rounded border-4 bg-white dark:bg-card sm:border-8 md:border-[12px]"
        id="menu"
        data-scroll-target="menu"
      >
        <div
          style={{
            boxShadow: "inset 0 0 6px 1px rgba(0, 0, 0, 0.2)",
          }}
          className="menu-height flex flex-col gap-5 px-3 pb-4 pt-6 sm:px-5 sm:pb-8 sm:pt-8 md:flex-row md:px-10 lg:gap-10 lg:px-20"
        >
          <div className="flex flex-shrink-0 flex-col">
            {useChips ? <MenuChipsSkeleton /> : <MenuTabsSkeleton />}
          </div>
          <div
            className="menu-scroll-container scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border sticky top-0 mb-1 mt-6 w-full text-center md:mt-8"
            tabIndex={0}
            role="region"
            aria-label="Menu items loading"
          >
            {/* Filter dropdown skeleton - full width mobile only */}
            {useChips && (
              <div className="mb-4">
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            )}

            {/* Desktop menu header skeleton */}

            <MenuItemsSkeleton useChips={useChips} />
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};
