import React from "react";
import FadeUp from "../ui/FadeUp";
import Image from "next/image";
import MaskText from "../ui/MaskText";
import urlFor from "@/lib/urlFor";

export const AboutHero = ({ images }: { images?: Image[] }) => {
  return (
    <section className="relative min-h-[calc(100vh-132px)] w-screen dark-border-image text-light">
      <div className="container flex flex-col gap-12 py-10 pt-20 h-full items-center">
        <div className="lg:text-[4vw] md:text-[5vw] text-[8vw]">
          <MaskText
            delay={0.3}
            phrases={["Palermo - Uppsala's Most Natural", "Meeting Place."]}
            className="font-recoleta uppercase text-center font-semibold"
          />
        </div>
        {images && (
          <div className="grid grid-cols-2 lg:grid-cols-3 sm:gap-5 gap-2 w-full h-full overflow-hidden">
            {images.map((image, i) => (
              <FadeUp
                duration={0.4}
                delay={i * 0.1 + 0.8}
                key={image._key}
                className="overflow-hidden"
              >
                <Image
                  src={urlFor(image).url()}
                  alt={image.alt ?? urlFor(image).url()}
                  width={640}
                  height={1137}
                  className="object-cover flex-1 cursor-pointer transition-all duration-300 hover:scale-105 h-full"
                />
              </FadeUp>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
