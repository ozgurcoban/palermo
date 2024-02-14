"use client";
import { Fragment, useRef } from "react";
import FadeUp from "./ui/FadeUp";
import { Separator } from "@/components/ui/separator";
import InfiniteMove from "./ui/InfiniteMove";
import { getLocale } from "@/config";

const Banner = ({ banners }: { banners?: LocalizedText[] }) => {
  const firstList = useRef<HTMLDivElement | null>(null);
  const secondList = useRef<HTMLDivElement | null>(null);

  const locale = getLocale();
  if (!banners) return;
  return (
    <FadeUp delay={0.7}>
      <div className="bg-light h-24 min-w-[100vw] overflow-hidden py-8 mt-5 mb-10 relative">
        <div className="relative w-full">
          <InfiniteMove
            direction={-1}
            firstList={firstList}
            secondList={secondList}
          />
          <div
            ref={firstList}
            className="relative h-full w-max flex flex-nowrap items-center justify-between gap-5 pl-5"
          >
            {banners.map((banner) => (
              <Fragment key={banner[locale]}>
                <div className="flex items-center gap-5 justify-around">
                  <span className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-recoleta tracking-wide font-medium whitespace-nowrap">
                    {banner[locale]}
                  </span>
                </div>
                <Separator orientation="vertical" className="bg-accent py-8" />
              </Fragment>
            ))}
          </div>
          <div
            ref={secondList}
            className="absolute w-max left-full top-0 h-full flex flex-nowrap items-center justify-between gap-5 pl-5"
          >
            {banners.map((banner, i) => (
              <Fragment key={banner[locale] + i}>
                <div className="flex items-center gap-5 justify-around">
                  <span className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-recoleta tracking-wide font-medium whitespace-nowrap">
                    {banner[locale]}
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
