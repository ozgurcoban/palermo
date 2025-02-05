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
    <section className="relative h-screen w-screen border-t py-16">
      <MotionDiv
        initial={{ rotateZ: 4 }}
        animate={{ rotateZ: -3 }}
        style={{ rotateY: 0, rotateX: 0 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
        className="absolute bottom-0 left-0 w-40 origin-bottom-left md:w-[17rem] lg:z-[-1]"
      >
        <Image src={Beer} alt="Palermo beer" width={285} height={185} />
      </MotionDiv>
      <div className="container grid h-full grid-rows-[1.5fr_3fr] gap-5">
        <div className="flex-1 text-center lg:text-left">
          <FadeUp>
            <h2 className="title-secondary !normal-case">{title[locale]}</h2>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body mt-4 max-w-md text-justify opacity-85">
              {description[locale]}
            </p>
          </FadeUp>
          <FadeUp delay={0.5}>
            <Link
              href={"/about"}
              className="mx-auto mt-16 flex items-center gap-2 text-accent transition-all duration-300 hover:tracking-wider lg:mx-0"
            >
              <span className="text-md font-recoleta font-medium uppercase">
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
              className="rounded object-cover shadow-xl shadow-dark/30 transition-all duration-500 hover:scale-105"
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default Story;
