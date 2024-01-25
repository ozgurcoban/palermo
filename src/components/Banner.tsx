import FadeUp from "./ui/FadeUp";
import MotionDiv from "./ui/MotionDiv";
import { Separator } from "@/components/ui/separator";

const banners = [
  "14th Nation",
  "Your Cozy Corner in Uppsala",
  "Historic Conversations",
  "Lounge Awaits",
  "Where Every Night is Memorable",
];

const Banner = () => {
  return (
    <FadeUp delay={0.7}>
      <div className="bg-light h-24 min-w-[100vw] overflow-hidden py-8 mt-5 mb-10 relative">
        <MotionDiv
          variants={{
            initial: { translateX: "0%" },
            animate: { translateX: "calc(-50% - 80px)" },
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "linear",
          }}
          initial="initial"
          animate={"animate"}
          className="w-screen h-full flex flex-nowrap items-center justify-between gap-5 md:gap-15 lg:gap-18"
        >
          {[...banners, ...banners].map(banner => (
            <>
              <div
                key={banner}
                className="flex items-center gap-5 justify-around"
              >
                <span className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-recoleta tracking-wide font-medium whitespace-nowrap">
                  {banner}
                </span>
              </div>
              <Separator orientation="vertical" className="bg-accent py-8" />
            </>
          ))}
        </MotionDiv>
      </div>
    </FadeUp>
  );
};

export default Banner;
