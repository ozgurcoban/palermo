"use client";

import Image from "next/image";
import MotionDiv from "@/components/ui/MotionDiv";
import FadeUp from "@/components/ui/FadeUp";
import { ReactNode } from "react";

const fadeVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

interface HeroProps {
  imageUrl: string;
  imageAlt: string;
  height?: string;
  children: ReactNode;
  overlayGradient?: string;
}

export function PageHero({ 
  imageUrl, 
  imageAlt, 
  height = "h-[50vh]",
  children,
  overlayGradient = "from-black/30 via-black/40 to-black/50"
}: HeroProps) {
  return (
    <div className={`container relative flex w-screen items-center justify-center ${height}`}>
      <MotionDiv
        className="relative h-full w-full overflow-hidden"
        variants={fadeVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
        }}
      >
        <div className={`absolute z-10 h-full w-full bg-gradient-to-b ${overlayGradient}`} />
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={1920}
          height={1080}
          style={{ objectFit: "cover" }}
          className="h-full w-full"
          priority
        />
      </MotionDiv>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center sm:px-8">
        {children}
      </div>
    </div>
  );
}