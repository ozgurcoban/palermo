// "ues client";
import Image from "next/image";
import MotionDiv from "./ui/MotionDiv";
import FadeUp from "./ui/FadeUp";

const variants = {
  initial: {
    scale: 0.5,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
};

export default function Hero() {
  return (
    <div className="relative h-screen w-screen container">
      <MotionDiv
        className="relative max-h-[calc(100vh-132px)] h-full overflow-hidden"
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 0.2,
          ease: "linear",
          type: "spring",
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
        <FadeUp delay={0.3} duration={0.3}>
          <p className="title-secondary !normal-case text-gray-200 max-w-[600px] !font-normal">
            At <u>Palermo</u> where tasty dishes and a fine selection of beers
          </p>
        </FadeUp>
        <FadeUp delay={0.5} duration={0.5}>
          <h1 className="text-light lg:text-[180px] sm:text-[160px] text-[20vw] leading-[120px] sm:leading-[135px]  font-lobster break-words">
            Welcome everyone
          </h1>
        </FadeUp>
      </div>
    </div>
  );
}
