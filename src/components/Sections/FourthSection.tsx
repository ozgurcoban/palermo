import React from "react";
import MaskText from "../ui/MaskText";
import FadeUp from "../ui/FadeUp";
import Image from "next/image";

export const FourthSection = () => {
  return (
    <section className="w-screen h-full my-56">
      <div className="container flex lg:flex-row flex-col items-center gap-5">
        <div className="flex-[0.5] w-full lg:h-max max-h-[450px] overflow-hidden">
          <Image
            src={"/images/about/generations.jpg"}
            alt="palermo pizza section"
            width={640}
            height={570}
            className="object-cover h-full min-w-max w-full"
          />
        </div>
        <div className="flex-[0.5] flex flex-col gap-y-5">
          <h2 className="md:text-[4vw] lg:text-[3vw] text-[8vw] w-full">
            <MaskText
              delay={0.2}
              phrases={["For All Generations", "A Common Love."]}
              className="font-recoleta leading-tight font-semibold"
            />
          </h2>
          <FadeUp delay={0.5}>
            <p className="text-body">
              Whether you're young or young at heart, there's a place for you
              with us. From the exciting sports screenings for the younger crowd
              to the calm hum of the bar for the more seasoned - Palermo unites.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};
