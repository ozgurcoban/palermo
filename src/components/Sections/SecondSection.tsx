import React from "react";
import MaskText from "../ui/MaskText";
import FadeUp from "../ui/FadeUp";
import Image from "next/image";

export const SecondSection = () => {
  return (
    <section className="w-screen h-full my-56">
      <div className="container flex lg:flex-row flex-col-reverse items-center gap-5">
        <div className="flex-[0.5] flex flex-col gap-y-5">
          <h2 className="md:text-[4vw] lg:text-[3vw] text-[8vw] w-full">
            <MaskText
              delay={0.2}
              phrases={["Our Secret?", "Simple - Pizzas and Passion."]}
              className="font-recoleta leading-tight font-semibold"
            />
          </h2>
          <FadeUp delay={0.5}>
            <p className="text-body">
              Renowned for our crisp pizzas and hearty drinks, Palermo has been
              a haven for food lovers and thirsty souls. But we don't stop
              there. Our curiosity compels us to continually expand our menu
              with exciting dishes, while still retaining a cozy, homely feel.
            </p>
          </FadeUp>
        </div>
        <div className="flex-[0.5] w-full lg:h-max max-h-[450px] overflow-hidden">
          <Image
            src={"/images/about/pizza.jpg"}
            alt="palermo pizza section"
            width={640}
            height={426}
            className="object-cover h-full min-w-max w-full"
          />
        </div>
      </div>
    </section>
  );
};
