import React from "react";
import FadeUp from "../ui/FadeUp";
import { Button } from "../ui/button";
import NewsItems from "./NewsItems";
import { Link } from "@/navigation";

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
          <NewsItems news={news.slice(0, 3)} />
          <FadeUp
            delay={0.05 * news.length}
            className="absolute z-10 bottom-0 left-0 w-full h-20 pt-4  overflow-hidden flex items-center justify-center"
          >
            <Link href={"/news"}>
              <Button
                title="See more"
                aria-live="polite"
                className="flex items-center gap-2 px-6 border-image bg-transparent py-7 hover:text-primary hover:bg-transparent text-dark hover:scale-105"
              >
                <span className="font-lato text-base capitalize font-semibold">See More</span>
              </Button>
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default RecentNews;
