import { INewsItem } from "@/types/generated";
import React from "react";
import NewsItems from "../NewsItems";

export const NewsDetails = ({
  allNews,
  newsDetails: { id, caption, media_url, timestamp, media_type },
}: {
  allNews: INewsItem[];
  newsDetails: INewsItem;
}) => {
  const news = allNews.filter((news) => id !== news.id);

  return (
    <section className="w-screen py-40 h-full bg-[#f9f9f9]">
      <div className="flex flex-col gap-5 container">
        <div className="flex gap-3">
          {media_type === "VIDEO" ? (
            <video
              id="my-video"
              className="video-js max-h-[600px]"
              controls
              preload="auto"
              width="640"
              height="264"
              // poster="MY_VIDEO_POSTER.jpg"
              data-setup="{}"
            >
              <source src={media_url} type="video/mp4" />
            </video>
          ) : (
            <img
              src={media_url}
              alt={caption}
              width={1920}
              height={256}
              className="object-cover max-w-[600px] max-h-[600px] w-full h-full"
            />
          )}
          <div className="flex flex-col gap-3">
            <span className="text-base opacity-80">
              {new Date(timestamp).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <p className="text-xl leading-normal">{caption}</p>
          </div>
        </div>
        <hr className="mt-5" />
        <span>More posts from Palermo</span>
        <NewsItems news={news} />
      </div>
    </section>
  );
};
