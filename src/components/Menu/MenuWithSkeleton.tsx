"use client";

import React, { useState, useEffect } from "react";
import { MenuResponsive } from "./MenuResponsive";
import { MenuSkeleton } from "./MenuSkeleton";
import { useIsMounted } from "@/hooks/useIsMounted";

type Props = {
  categories: Category[];
  disableAnimations?: boolean;
};

export const MenuWithSkeleton: React.FC<Props> = ({ categories, disableAnimations }) => {
  const isMounted = useIsMounted();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (isMounted) {
      // Small delay to ensure CSS is loaded
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isMounted]);

  // Always show skeleton initially to prevent FOUC
  if (showSkeleton) {
    return <MenuSkeleton />;
  }

  return <MenuResponsive categories={categories} disableAnimations={disableAnimations} />;
};