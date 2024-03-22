import Image from "next/image";
import MotionDiv from "@/components/ui/MotionDiv";
import FadeUp from "@/components/ui/FadeUp";
import { useTranslations } from "next-intl";
// import { unstable_setRequestLocale } from "next-intl/server";
import { ILocale } from "@/types/generated";
import Localization from "@/components/localization";

const variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    scale: [0.5, 1.1, 1.1, 1],
    width: ["0%", "100%", "100%", "100%", "100%"],
    height: ["30%", "30%", "80%", "100%"],
    opacity: [1, 1, 1],
  },
};

export function HomeHero() {
  // unstable_setRequestLocale(locale)

  return (
    <div className="relative h-[70vh] w-screen container flex items-center justify-center">
      <MotionDiv
        className="relative h-full overflow-hidden"
        variants={variants}
        initial="initial"
        whileInView={"animate"}
        viewport={{ once: true }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.3, 0.6, 1],
          damping: 16,
          stiffness: 100,
        }}
      >
        <div className="absolute z-10 w-full h-full bg-black/40" />
        <Image
          src="/hero.jpeg"
          alt="hero"
          width={1920}
          height={1080}
          style={{ objectFit: "cover" }}
          className="h-full w-full"
        />
      </MotionDiv>
      <div className="absolute sm:px-8 px-4 text-center inset-0 flex flex-col items-center justify-center z-20">
        <FadeUp delay={1.3} duration={0.7}>
          <Localization text="Home.HomeHero.description" rich />
        </FadeUp>
        <FadeUp delay={1.7} duration={0.7}>
          <h1 className="text-light mt-10 lg:text-[180px] opacity-70 sm:text-[160px] text-[20vw] leading-[85px] sm:leading-[135px] font-lobster break-words">
            <Localization text="Home.HomeHero.title" />
          </h1>
        </FadeUp>
      </div>
    </div>
  );
}
