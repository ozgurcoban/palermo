import React from "react";
import FadeUp from "./ui/FadeUp";
import { HeartFilledIcon, TriangleDownIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import MaskText from "./ui/MaskText";

const Gallery = () => {
  const gallery = [...Array(5)];

  return (
    <section className="w-screen py-40 h-full bg-[#f9f9f9] relative">
      <div className="container flex flex-col items-center">
        <h2 className="title-secondary">
          <MaskText
            delay={0.2}
            phrases={["Beautiful moments in Palermo"]}
            className="font-recoleta leading-tight font-bold text-center"
          />
        </h2>
        <div className="w-full mt-6">
          <MaskText
            delay={0.4}
            phrases={[
              "From hearty meals to joyful gatherings – browse through our memories and feel at home.",
            ]}
            className="text-body text-center mx-auto opacity-80"
          />
        </div>
        <div className="relative w-full">
          <div className="mt-36 w-full grid auto-rows-[250px] lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {gallery.map((_, i) => {
              const index = i % 10;
              return (
                <FadeUp
                  key={`gallery-image-${i}`}
                  delay={0.05 * i}
                  className={`row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 ${
                    index === 3 || index === 6
                      ? "lg:col-span-2"
                      : index === 2 || index === 5
                      ? "lg:col-span-1 sm:col-span-2"
                      : ""
                  }`}
                />
              );
            })}
          </div>
          <FadeUp
            delay={0.05 * gallery.length}
            className="absolute z-10 bottom-0 left-0 w-full h-28 pt-4 from-neutral-100 bg-gradient-to-t overflow-hidden flex items-center justify-center"
          >
            <Button className="bg-accent" title="See more" aria-live="polite">
              <span className="font-lato text-base capitalize">See More</span>
              <TriangleDownIcon width={16} height={16} />
            </Button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
