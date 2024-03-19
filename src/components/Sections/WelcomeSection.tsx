import React from "react";
import MaskText from "../ui/MaskText";
import Image from "next/image";
import MotionDiv from "../ui/MotionDiv";

export const WelcomeSection = () => {
  return (
    <section className="w-screen h-full my-56 relative">
      <div className="container">
        <h2 className="md:text-4xl lg:text-6xl text-4xl w-full">
          <MaskText
            delay={0.2}
            phrases={[
              "Welcome to Palermo - your place for",
              "community, joy, and unforgettable",
              "moments.",
            ]}
            className="font-recoleta leading-tight text-center font-semibold"
          />
        </h2>
      </div>
      <MotionDiv
        variants={{ initial: { y: 0, rotateX: 0 }, animate: { y: 10, rotateZ: -12 } }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
        initial="initial"
        animate="animate"
        className="absolute right-2 top-0 z-[-1] w-56 h-56 overflow-hidden md:opacity-100 opacity-50"
      >
        <Image
          src={"/images/about/glass-beer.png"}
          alt="glass beer"
          width={360}
          height={722}
          className="object-contain h-full blur-[1px]"
        />
      </MotionDiv>
      <MotionDiv
        variants={{ initial: { y: 0, rotateX: 0 }, animate: { y: 10, rotateZ: 12 } }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
        initial="initial"
        animate="animate"
        className="absolute left-2 bottom-0 z-[-1] w-56 h-56 overflow-hidden md:opacity-100 opacity-50"
      >
        <Image
          src={"/images/about/cask-beer.png"}
          alt="cask beer"
          width={360}
          height={722}
          className="object-contain h-full blur-[1px]"
        />
      </MotionDiv>
    </section>
  );
};
