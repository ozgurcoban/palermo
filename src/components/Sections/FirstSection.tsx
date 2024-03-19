import Image from "next/image";
import React from "react";
import MaskText from "../ui/MaskText";
import FadeUp from "../ui/FadeUp";
import { useGetLocale } from "@/config";
import urlFor from "@/lib/urlFor";

export const FirstSection = ({ section }: { section: AboutSection }) => {
  const locale = useGetLocale();

  const { image, title, description } = section;

  return (
    <section className="w-screen min-h-screen overflow-hidden relative">
      <div className="max-w-full">
        <Image
          src={urlFor(image).url()}
          alt={image.alt ?? title[locale]}
          width={1920}
          height={1280}
          className="object-cover min-h-screen"
        />
      </div>
      <div className="w-full h-full absolute inset-0 flex justify-end">
        <div className=" lg:w-1/2 md:w-2/3 sm:w-11/12 w-full h-full bg-dark/90 2xl:p-36 md:p-24 sm:p-14 p-4 flex items-center justify-center sm:justify-normal flex-col gap-5 text-light">
          <h2 className="md:text-[4vw] lg:text-[3vw] text-[8vw] w-full">
            <MaskText
              delay={0.2}
              phrases={[title[locale]]}
              className="font-recoleta leading-tight font-semibold"
            />
          </h2>
          <FadeUp delay={0.5}>
            <p className="text-body">{description[locale]}</p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};
