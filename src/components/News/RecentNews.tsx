import React from "react";
import FadeUp from "../ui/FadeUp";
import { Button } from "../ui/button";
import NewsItems from "./NewsItems";
import { Link } from "@/navigation";
import { INewsItem } from "@/types/generated";
import Localization from "../localization";

const RecentNews = ({ news }: { news: INewsItem[] }) => {
  return (
    <section className="w-screen py-40 h-full bg-[#f9f9f9]">
      <div className="container flex flex-col items-center">
        <FadeUp>
          <h2 className="title-secondary text-dark">
            <Localization text="Home.News.title" />
          </h2>
        </FadeUp>
        <div className="relative w-full pb-16">
          <NewsItems news={news} />
          {news.length > 0 && (
            <FadeUp
              delay={0.05 * news.length}
              className="absolute z-10 bottom-0 left-0 w-full h-20 pt-4  overflow-hidden flex items-center justify-center"
            >
              <Link href={"/news"}>
                <Button
                  title="See more"
                  aria-live="polite"
                  className="bg-accent"
                >
                  <span className="font-lato text-base capitalize font-semibold">
                    <Localization text="Buttons.seeMore" />
                  </span>
                </Button>
              </Link>
            </FadeUp>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentNews;
