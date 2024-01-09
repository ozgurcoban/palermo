import React from "react";
import FadeUp from "./ui/FadeUp";

const Gallery = () => {
  return (
    <section className="w-screen py-40 h-full ">
      <div className="container flex flex-col items-center">
        <FadeUp>
          <h2 className="title-secondary">Beautiful moments in palermo</h2>
        </FadeUp>
        <FadeUp>
          <p className="font-lato text-center mx-auto text-dark/80 w-1/2">
            Figma ipsum component variant main layer. Component export bullet
            union vertical font asset union. Edit layout bullet align frame
            component move link reesizing.
          </p>
        </FadeUp>
        <div className="relative w-full">
          <div className="mt-36 w-full grid auto-rows-[250px] grid-cols-3 gap-4">
            {[...Array(10)].map((_, i) => {
              const index = i % 10;
              return (
                <FadeUp
                  key={i}
                  delay={0.05 * i}
                  className={`row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900 ${
                    index === 3 || index === 6 ? "col-span-2" : ""
                  }`}
                ></FadeUp>
              );
            })}
          </div>
          <div className="absolute border z-10 bottom-0 left-0 w-full h-20 backdrop-blur-sm bg-light/30 rounded-xl overflow-hidden flex items-center justify-center">
            <span className="capitalize font-teko text-3xl">see more</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
