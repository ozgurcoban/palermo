import { LightningBoltIcon } from "@radix-ui/react-icons";
import React from "react";
import MotionDiv from "./ui/MotionDiv";

const banners = ["Self Services", "Super Taste", "Best Items", "Fast Delivery"];

const Banner = () => {
  return (
    <div className="bg-[#fb8f2c] h-24 min-w-[100vw] overflow-hidden -mt-2 py-2 relative">
      <MotionDiv
        variants={{
          initial: { translateX: "0%" },
          animate: { translateX: "calc(-50% - 80px)" },
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear"
        }}
        initial="initial"
        animate={"animate"}
        className="w-screen h-full flex flex-nowrap items-center justify-between gap-20"
      >
        {[...banners, ...banners].map((banner) => (
          <div key={banner} className="flex items-center gap-5">
            <LightningBoltIcon width={28} height={28} />
            <span className="md:text-5xl sm:text-4xl text-3xl font-recoleta font-medium whitespace-nowrap">
              {banner}
            </span>
          </div>
        ))}
      </MotionDiv>
    </div>
  );
};

export default Banner;
