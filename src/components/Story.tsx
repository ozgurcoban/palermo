import Image from "next/image";
import React from "react";
import Beer from "../../public/images/beer.png";
import BG from "../../public/images/story.jpg";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import FadeUp from "./ui/FadeUp";

const Story = () => {
  return (
    <section className="w-screen h-screen relative my-16 border-y">
      <div className="absolute lg:z-[-1] bottom-0 left-0">
        <Image
          src={Beer}
          alt="Palermo beer"
          width={385}
          height={385}
          className=""
        />
      </div>
      <div className="container h-full flex lg:flex-row flex-col items-center gap-5">
        <div className="flex-1 lg:text-left text-center">
          <FadeUp>
            <h2 className="title-secondary !normal-case">
              Hear a <span className="text-accent">story</span> from the store
            </h2>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mt-4 text-body">
              Figma ipsum component variant main layer. Component export bullet
              union vertical font asset union. Edit layout bullet align frame
              component move link reesizing.
            </p>
          </FadeUp>
          <FadeUp delay={0.5}>
            <button
              title="Read more"
              aria-live="polite"
              className="flex items-center gap-2 mt-16 lg:mx-0 mx-auto hover:tracking-wider transition-all duration-300"
            >
              <span className="uppercase font-teko text-2xl font-medium">
                Read more
              </span>
              <ArrowRightIcon width={24} height={24} />
            </button>
          </FadeUp>
        </div>
        <div className="flex-1">
          <FadeUp delay={0.3}>
            <Image
              src={BG}
              alt="Palermo background"
              width={1920}
              height={1080}
              className="rounded-3xl hover:scale-105 transition-all duration-500 object-cover shadow-xl shadow-dark/30"
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default Story;
