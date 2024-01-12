import React from "react";
import FadeUp from "../ui/FadeUp";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const news = [
  {
    id: "new-1",
    cover_image: "",
    date: "Jan 12, 2024",
    title: "Figma ipsum component variant",
    description:
      "Figma ipsum component variant main layer. Rotate component text shadow share pen pen shadow Rotate component text shadow share pen pen shadow",
    href: "/",
  },
  {
    id: "new-2",
    cover_image: "",
    date: "Jan 12, 2024",
    title: "Figma ipsum component variant",
    description:
      "Figma ipsum component variant main layer. Rotate component text shadow share pen pen shadow Rotate component text shadow share pen pen shadow ",
    href: "/",
  },
  {
    id: "new-3",
    cover_image: "",
    date: "Jan 12, 2024",
    title: "Figma ipsum component variant",
    description:
      "Figma ipsum component variant main layer. Rotate component text shadow share pen pen shadow Rotate component text shadow share pen pen shadow",
    href: "/",
  },
];

const RecentNews = () => {
  return (
    <section className="w-screen py-40 h-full bg-[#f9f9f9]">
      <div className="container flex flex-col items-center">
        <FadeUp>
          <h2 className="title-secondary">Be first who read news</h2>
        </FadeUp>
        <div className="relative w-full pb-16">
          <div className="mt-36 w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {news
              .slice(0, 3)
              .map(({ id, cover_image, date, description, href, title }, i) => (
                <FadeUp
                  className={`rounded-xl p-4 overflow-hidden flex flex-col border gap-11`}
                  key={id}
                  delay={0.05 * i}
                >
                  {/* <Image src={cover_image} alt={title} width={1920} height={256} className="object-cover" /> */}
                  <div className="border-2 border-slate-400/10 bg-neutral-100 h-64 w-full rounded-lg" />
                  <div>
                    <span className="text-base opacity-80">{date}</span>
                    <h3 className="font-recoleta text-3xl">{title}</h3>
                    <p className="line-clamp-2 text-base leading-normal mt-4">
                      {description}
                    </p>
                  </div>
                  <Link href={href}>
                    <button
                      title="Read more"
                      aria-live="polite"
                      className="flex items-center gap-2 lg:mx-0 hover:tracking-wider transition-all duration-300 text-primary"
                    >
                      <span className="uppercase font-recoleta text-base font-medium">
                        Read more
                      </span>
                      <ArrowRightIcon width={24} height={24} />
                    </button>
                  </Link>
                </FadeUp>
              ))}
          </div>
          <FadeUp
            delay={0.05 * news.length}
            className="absolute z-10 bottom-0 left-0 w-full h-20 pt-4  overflow-hidden flex items-center justify-center"
          >
            <Button
              title="See more"
              aria-live="polite"
              className="flex items-center gap-2 px-6 hover:bg-accent"
            >
              <span className="font-lato text-base capitalize">See More</span>
              {/* <HeartFilledIcon width={16} height={16} /> */}
            </Button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default RecentNews;
