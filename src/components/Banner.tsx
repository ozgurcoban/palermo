"use client"
import { Fragment, useRef } from "react";
import FadeUp from "./ui/FadeUp";
import { Separator } from "@/components/ui/separator";
import InfiniteMove from "./ui/InfiniteMove";

const banners = [
  "14th Nation",
  "Your Cozy Corner in Uppsala",
  "Historic Conversations",
  "Lounge Awaits",
  "Where Every Night is Memorable",
];

const Banner = () => {
  const firstList = useRef<HTMLDivElement | null>(null)
  const secondList = useRef<HTMLDivElement | null>(null)
  return (
    <FadeUp delay={0.7}>
      <div className="bg-light h-24 min-w-[100vw] overflow-hidden py-8 mt-5 mb-10 relative">
        <div className="relative w-full">
          <InfiniteMove direction={-1} firstList={firstList} secondList={secondList} />
          <div
            ref={firstList}
            className="relative h-full w-max flex flex-nowrap items-center justify-between gap-5 md:gap-15 lg:gap-18"
          >
            {banners.map(banner => (
              <Fragment key={banner}>
                <div
                  className="flex items-center gap-5 justify-around"
                >
                  <span className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-recoleta tracking-wide font-medium whitespace-nowrap">
                    {banner}
                  </span>
                </div>
                <Separator orientation="vertical" className="bg-accent py-8" />
              </Fragment>
            ))}

          </div>
          <div
            ref={secondList}
            className="absolute w-max left-full top-0 h-full flex flex-nowrap items-center justify-between gap-5 md:gap-15 lg:gap-18"
          >
            {banners.map((banner, i) => (
              <Fragment key={banner + i}>
                <div
                  className="flex items-center gap-5 justify-around"
                >
                  <span className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-recoleta tracking-wide font-medium whitespace-nowrap">
                    {banner}
                  </span>
                </div>
                <Separator orientation="vertical" className="bg-accent py-8" />
              </Fragment>
            ))}

          </div>
        </div>
      </div>
    </FadeUp>
  );
};

export default Banner;
