"use client";

import Image from "next/image";
import MotionDiv from "@/components/ui/MotionDiv";
import FadeUp from "@/components/ui/FadeUp";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

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
  overlayGradient?: string;
  badge?: ReactNode;
  title: string;
  description: string;
  badgeDelay?: number;
  titleDelay?: number;
  descriptionDelay?: number;
  ctaText?: string;
  ctaAction?: () => void;
  ctaDelay?: number;
}

export function PageHero({
  imageUrl,
  imageAlt,
  height = "h-[50vh]",
  overlayGradient = "from-black/30 via-black/40 to-black/50",
  badge,
  title,
  description,
  badgeDelay = 0.3,
  titleDelay = 0.5,
  descriptionDelay = 0.7,
  ctaText,
  ctaAction,
  ctaDelay = 0.9,
}: HeroProps) {
  return (
    <div
      className={`relative flex w-screen items-center justify-center ${height}`}
    >
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
        <div
          className={`absolute z-10 h-full w-full bg-gradient-to-b ${overlayGradient}`}
        />
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={1920}
          height={1080}
          style={{ objectFit: "cover" }}
          className="h-full w-full object-[50%_50%] lg:object-[50%_60%] xl:object-[50%_75%]"
          priority
        />
      </MotionDiv>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center sm:px-8">
        {badge && <FadeUp delay={badgeDelay}>{badge}</FadeUp>}

        <FadeUp delay={titleDelay}>
          <h1 className="hero-title-simple mb-3 sm:mb-4">{title}</h1>
        </FadeUp>

        <FadeUp delay={descriptionDelay}>
          <p className="hero-description">{description}</p>
        </FadeUp>
      </div>
      
      {/* Mobile CTA button */}
      {ctaText && ctaAction && (
        <FadeUp delay={ctaDelay} className="absolute bottom-6 z-20 flex flex-col items-center lg:hidden">
          <Button
            onClick={ctaAction}
            className="group flex items-center gap-2 bg-secondary transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            size="lg"
            type="button"
          >
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            <span>{ctaText}</span>
          </Button>
        </FadeUp>
      )}
    </div>
  );
}
