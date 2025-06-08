"use client";
import { Fragment, useRef } from "react";
import FadeUp from "./ui/FadeUp";
import { Separator } from "@/components/ui/separator";
import InfiniteMove from "./ui/InfiniteMove";
import { useGetLocale } from "@/config";

const Banner = ({ banners }: { banners: LocalizedText[] }) => {
  const firstList = useRef<HTMLDivElement | null>(null);
  const secondList = useRef<HTMLDivElement | null>(null);

  const locale = useGetLocale();
  return (
    <FadeUp delay={1.8}>
      <div className="relative mb-10 mt-5 h-24 min-w-[100vw] overflow-hidden py-8">
        <div className="relative w-full">
          <InfiniteMove
            direction={-1}
            firstList={firstList}
            secondList={secondList}
          />
          <div
            ref={firstList}
            className="relative flex h-full w-max flex-nowrap items-center justify-between gap-5 pl-5"
          >
            {banners.map((banner, index) => (
              <Fragment key={`${banner[locale]}-${index}`}>
                <div className="flex items-center justify-around gap-5">
                  <span className="whitespace-nowrap font-recoleta text-3xl font-medium tracking-wide sm:text-4xl md:text-5xl lg:text-6xl">
                    {banner[locale]}
                  </span>
                </div>
                <Separator orientation="vertical" className="bg-accent py-8" />
              </Fragment>
            ))}
          </div>
          <div
            ref={secondList}
            className="absolute left-full top-0 flex h-full w-max flex-nowrap items-center justify-between gap-5 pl-5"
          >
            {banners.map((banner, i) => (
              <Fragment key={banner[locale] + i}>
                <div className="flex items-center justify-around gap-5">
                  <span className="whitespace-nowrap font-recoleta text-3xl font-medium tracking-wide sm:text-4xl md:text-5xl lg:text-6xl">
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
