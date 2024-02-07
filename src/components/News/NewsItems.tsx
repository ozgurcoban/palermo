import React from "react";
import FadeUp from "../ui/FadeUp";
import { INewsItem } from "@/types/generated";

const NewsItems: React.FC<{ news: INewsItem[] }> = ({ news }) => {
  return (
    <>
      <div className="mt-36 w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {news.map(({ id, media_url, timestamp, caption }, i) => (
          <FadeUp
            className={`rounded-xl p-4 overflow-hidden flex flex-col border gap-11`}
            key={id}
            delay={0.05 * i}
          >
            <img
              src={media_url}
              alt={caption}
              width={1920}
              height={256}
              className="object-cover w-full rounded-lg"
            />
            <div>
              <span className="text-base opacity-80">
                {new Date(timestamp).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <p className="line-clamp-2 text-2xl leading-normal mt-4">
                {caption}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
      {news.length === 0 && (
        <div className="w-full text-center">
          <span className="text-xl">
            - There is no news at the moment!! -
          </span>
        </div>
      )}
    </>
  );
};

export default NewsItems;
