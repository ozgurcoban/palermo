import Image from "next/image";
import React from "react";
import MaskText from "../ui/MaskText";
import FadeUp from "../ui/FadeUp";
import { useGetLocale } from "@/config";
import urlFor from "@/lib/urlFor";

export const ThirdSection = ({ section }: { section: AboutSection }) => {
  const locale = useGetLocale();

  const { image, title, description } = section;
  return (
    <section className="w-screen h-full green-bg text-light py-20">
      <div className="container flex flex-col gap-5">
        <div className="flex overflow-hidden max-h-[450px] w-full">
          <Image
            src={urlFor(image).url()}
            alt={image.alt ?? title[locale]}
            width={1920}
            height={1280}
            className="object-cover w-full"
          />
        </div>
        <div className="flex flex-col gap-y-5">
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
