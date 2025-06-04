"use client";

import { useScrollDepth } from "@/lib/useScrollDepth";

interface ScrollTrackerProps {
  pageName: string;
  children: React.ReactNode;
}

export default function ScrollTracker({ pageName, children }: ScrollTrackerProps) {
  useScrollDepth(pageName);
  
  return <>{children}</>;
}