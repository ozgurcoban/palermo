import Image from "next/image";
import MotionDiv from "@/components/ui/MotionDiv";
import FadeUp from "@/components/ui/FadeUp";
import { useTranslations } from "next-intl";
// import { unstable_setRequestLocale } from "next-intl/server";
import { ILocale } from "@/types/generated";
import Localization from "@/components/localization";
import ScrollToMenu from "../ScrollToMenu";
import Text from "@/lib/Text";
import { DynamicMotion } from "../ui/DynamicMotion";

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
    <div className="container relative flex h-[70vh] w-screen items-center justify-center">
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
        <div className="absolute z-10 h-full w-full bg-black/40" />
        <Image
          src="/hero.png"
          alt="hero"
          width={1920}
          height={1080}
          style={{ objectFit: "cover" }}
          className="h-full w-full"
        />
      </MotionDiv>
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center sm:px-8">
        <DynamicMotion>
          <h1 className="text-center font-recoleta text-[8vw] font-bold leading-tight text-secondary drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] md:text-[calc(1rem_+_1vw)] lg:text-[calc(1rem_+_1.8vw)]">
            Palermo – Prisvärd restaurang och pizzeria på Sysslomansgatan
          </h1>

          <h2 className="mt-10 break-words font-lobster text-[12vw] leading-[85px] text-light opacity-70 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] sm:text-[72px] sm:leading-[135px] lg:text-[86px]">
            Uppsalas 14:e Nation
          </h2>
        </DynamicMotion>
        {/* <FadeUp delay={1.3} duration={0.7}>
          <Localization
            className="text-center font-recoleta text-[8vw] font-bold leading-tight text-secondary drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] md:text-[calc(1rem_+_1vw)] lg:text-left lg:text-[calc(1rem_+_1.8vw)]"
            text="Home.HomeHero.description"
            rich
          />
        </FadeUp>
        <FadeUp delay={1.7} duration={0.7}>
          <h1 className="mt-10 break-words font-lobster text-[20vw] leading-[85px] text-light opacity-70 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] sm:text-[160px] sm:leading-[135px] lg:text-[180px]">
            <Localization text="Home.HomeHero.title" />
          </h1>
        </FadeUp> */}
      </div>
      <FadeUp className="absolute bottom-6 z-50" delay={1.9} duration={0.7}>
        <ScrollToMenu />
      </FadeUp>
    </div>
  );
}
