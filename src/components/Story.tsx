import Image from "next/image";
import React from "react";
import Beer from "../../public/images/beer.png";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import FadeUp from "./ui/FadeUp";
import MotionDiv from "./ui/MotionDiv";
import { useGetLocale } from "@/config";
import urlFor from "@/lib/urlFor";
import { Link } from "@/navigation";
import Localization from "./localization";

const Story = ({ data }: { data?: StorySection }) => {
  const locale = useGetLocale();

  if (!data) return;

  const { title, description, image } = data;

  return (
    <section className="w-screen h-screen relative py-16 border-t">
      <MotionDiv
        initial={{ rotateZ: 4 }}
        animate={{ rotateZ: -3 }}
        style={{ rotateY: 0, rotateX: 0 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
        className="absolute lg:z-[-1] bottom-0 left-0 origin-bottom-left w-40 md:w-[17rem]"
      >
        <Image src={Beer} alt="Palermo beer" width={285} height={185} />
      </MotionDiv>
      <div className="container h-full flex lg:flex-row flex-col items-center gap-5">
        <div className="flex-1 lg:text-left text-center">
          <FadeUp>
            <h2 className="title-secondary !normal-case">{title[locale]}</h2>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mt-4 text-body opacity-85">{description[locale]}</p>
          </FadeUp>
          <FadeUp delay={0.5}>
            <Link
              href={"/about"}
              className="flex items-center gap-2 mt-16 lg:mx-0 mx-auto hover:tracking-wider transition-all duration-300 text-primary"
            >
              <span className="uppercase font-recoleta text-md font-medium">
                <Localization text="Buttons.readMore" />
              </span>
              <ArrowRightIcon width={24} height={24} />
            </Link>
          </FadeUp>
        </div>
        <div className="flex-1">
          <FadeUp delay={0.3}>
            <Image
              src={urlFor(image).url()}
              alt={image.alt ?? title[locale]}
              width={1920}
              height={1080}
              className="rounded hover:scale-105 transition-all duration-500 object-cover shadow-xl shadow-dark/30"
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default Story;
