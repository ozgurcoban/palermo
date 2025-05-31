import React from "react";
import FadeUp from "../ui/FadeUp";
import NewsItems from "./NewsItems";
import Image from "next/image";
import NewsImage from "../../../public/images/news.jpg";
import { INewsItem } from "@/types/generated";

export const News = ({ news }: { news: INewsItem[] }) => {
  return (
    <section className="h-full w-screen bg-[#f9f9f9] py-40">
      <div className="container mb-56">
        <div>
          <FadeUp delay={0.2}>
            <h2 className="text-center font-lobster text-9xl capitalize">
              {"Palermo's News"}
            </h2>
          </FadeUp>
          <FadeUp delay={0.4} className="mx-auto mt-8 max-w-xl">
            <p className="text-center text-xl opacity-85">
              Explore the latest stories about our dishes, offers, events and
              future plans here.
            </p>
          </FadeUp>
        </div>
      </div>
      <FadeUp
        delay={0.6}
        className="relative max-h-[480px] w-screen overflow-hidden"
      >
        <div className="absolute inset-0 z-10">
          <Image
            src={NewsImage}
            alt="Palermo's news"
            width={1920}
            height={1080}
            className="object-cover"
            placeholder="blur"
          />
        </div>
        <div className="h-[480px] w-full bg-neutral-100" />
      </FadeUp>
      <div className="container">
        <NewsItems news={news} />
      </div>
    </section>
  );
};
