import React from "react";
import FadeUp from "../ui/FadeUp";
import Image1 from "../../../public/images/about/image-1.jpg";
import Image2 from "../../../public/images/about/image-2.jpg";
import Image3 from "../../../public/images/about/image-3.jpg";
import Image from "next/image";
import MaskText from "../ui/MaskText";

const images = [Image1, Image2, Image3];

export const AboutHero = () => {
  return (
    <section className="relative min-h-[calc(100vh-132px)] w-screen dark-border-image text-light">
      <div className="container flex flex-col gap-12 py-10 pt-20 h-full items-center">
        <div className="lg:text-[4vw] md:text-[5vw] text-[8vw]">
          <MaskText delay={0.3} phrases={["Palermo - Uppsala's Most Natural", "Meeting Place."]} className="font-recoleta uppercase text-center font-semibold" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 sm:gap-5 gap-2 w-full h-full overflow-hidden">
          {images.map((image, i) => (
            <FadeUp duration={0.4} delay={i * 0.1 + 0.8} key={`palermo image-${i}`} className="overflow-hidden">
              <Image
                src={image}
                alt={`Palermo image ${i + 1}`}
                width={640}
                height={1137}
                className="object-cover flex-1 cursor-pointer transition-all duration-300 hover:scale-105 h-full"
              />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};
