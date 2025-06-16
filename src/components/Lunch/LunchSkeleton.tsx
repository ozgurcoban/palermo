"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const LunchSkeleton: React.FC = () => {
  return (
    <div className="border-image w-full">
      <div
        className="w-full rounded border-4 bg-white dark:bg-card sm:border-8 md:border-[12px]"
        id="lunch"
      >
        <div
          style={{
            boxShadow: "inset 0 0 6px 1px rgba(0, 0, 0, 0.2)",
          }}
          className="flex flex-col gap-6 p-6 sm:p-8 md:p-10 lg:p-12"
        >
          {/* Header skeleton */}
          <div className="text-center">
            <Skeleton className="mx-auto mb-2 h-8 w-full rounded-full" />
          </div>

          {/* Time info skeleton */}

          {/* Daily dishes section */}
          <div className="space-y-4">
            <Skeleton className="mx-auto h-6 w-32 rounded" />
            <div className="flex justify-center">
              <Skeleton className="h-4 w-20 rounded" />
            </div>
            <div className="pt- border-t" />
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-5 w-full rounded" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};
