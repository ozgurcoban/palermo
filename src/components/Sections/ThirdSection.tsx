import Image from "next/image";
import React from "react";
import MaskText from "../ui/MaskText";
import FadeUp from "../ui/FadeUp";

export const ThirdSection = () => {
  return (
    <section className="w-screen h-full green-bg text-light py-20">
      <div className="container flex flex-col gap-5">
        <div className="flex overflow-hidden max-h-[450px] w-full">
          <Image
            src={"/images/about/beer.jpg"}
            alt="palermo beer"
            width={1920}
            height={1280}
            className="object-cover w-full"
          />
        </div>
        <div className="flex flex-col gap-y-5">
          <h2 className="md:text-[4vw] lg:text-[3vw] text-[8vw] w-full">
            <MaskText
              delay={0.2}
              phrases={["At the Bar - Where Time Stands Still."]}
              className="font-recoleta leading-tight font-semibold"
            />
          </h2>
          <FadeUp delay={0.5}>
            <p className="text-body">
              Amongst laughter, nostalgic memories, and lively discussions, time
              stands still at our bar. Here you'll find our regulars - academics
              who have found a second family in the embrace of Palermo. A place
              where each visit feels like coming home.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};
