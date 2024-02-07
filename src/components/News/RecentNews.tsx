import React from "react";
import FadeUp from "../ui/FadeUp";
import { Button } from "../ui/button";
import NewsItems from "./NewsItems";
import { Link } from "@/navigation";
import { INewsItem } from "@/types/generated";

const RecentNews = async () => {
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type&access_token=${process.env.INSTAGRAM_KEY}`;

  const data = await fetch(url);
  const feed = await data.json();

  const news: INewsItem[] = feed?.data;

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
                <span className="font-lato text-base capitalize font-semibold">
                  See More
                </span>
              </Button>
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default RecentNews;
