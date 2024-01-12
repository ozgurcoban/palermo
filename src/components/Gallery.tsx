import React from "react";
import FadeUp from "./ui/FadeUp";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

const Gallery = () => {
  const gallery = [...Array(10)];

  return (
    <section className="w-screen py-40 h-full bg-[#f9f9f9]">
      <div className="container flex flex-col items-center">
        <FadeUp>
          <h2 className="title-secondary">Beautiful moments in Palermo</h2>
        </FadeUp>
        <FadeUp>
          <p className="font-lato text-center mx-auto opacity-80 text-lg lg:w-1/2 md:w-2/3 w-11/12">
            Figma ipsum component variant main layer. Component export bullet
            union vertical font asset union. Edit layout bullet align frame
            component move link reesizing.
          </p>
        </FadeUp>
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
            <Button
              title="See more"
              aria-live="polite"
              className="flex items-center gap-2 px-6 hover:bg-accent"
            >
              <span className="font-lato text-base capitalize">See More</span>
              <HeartFilledIcon width={16} height={16} />
            </Button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
