import Image from "next/image";
import React from "react";
import MaskText from "../ui/MaskText";
import FadeUp from "../ui/FadeUp";

export const FirstSection = () => {
  return (
    <section className="w-screen min-h-screen overflow-hidden relative">
      <div className="max-w-full">
        <Image
          src={"/images/about/restaurant.jpg"}
          alt="palermo restaurant"
          width={1920}
          height={1280}
          className="object-cover min-h-screen"
        />
      </div>
      <div className="w-full h-full absolute inset-0 flex justify-end">
        <div className=" lg:w-1/2 md:w-2/3 sm:w-11/12 w-full h-full bg-dark/90 2xl:p-36 md:p-24 sm:p-14 p-4 flex items-center justify-center sm:justify-normal flex-col gap-5 text-light">
          <h2 className="md:text-[4vw] lg:text-[3vw] text-[8vw] w-full">
            <MaskText
              delay={0.2}
              phrases={[
                "Welcome to the World of",
                "Palermo - A Timeless",
                "Gathering Place in the",
                "Heart of Uppsala.",
              ]}
              className="font-recoleta leading-tight font-semibold"
            />
          </h2>
          <FadeUp delay={0.5}>
            <p className="text-body">
              For as long as memory serves, Palermo has been more than just a
              pub; it's an institution of camaraderie and the finer things in
              life. A place where generations of academics, from budding
              students to worldly professors, have conversed over a glass. Here,
              on Sysslomansgatan, you'll find our living room where each evening
              writes its own story.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};
