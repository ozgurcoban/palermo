import React from "react";
import FadeUp from "../ui/FadeUp";
import { INewsItem } from "@/types/generated";
import { Link } from "@/navigation";
import Localization from "../localization";

const NewsItems: React.FC<{ news: INewsItem[] }> = ({ news }) => {
  return (
    <>
      <div className="mt-36 w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {news.map(({ id, media_url, timestamp, caption, media_type }, i) => (
          <FadeUp
            className={`rounded p-4 overflow-hidden flex flex-col border gap-11`}
            key={id}
            delay={0.05 * i}
          >
            {media_type === "VIDEO" ? (
              <video
                id="my-video"
                className="video-js max-h-[350px]"
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
                className="object-cover rounded max-w-[350px] max-h-[350px] w-full h-full"
              />
            )}
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
              <Link className="text-primary" href={`/news/${id}` as any}>
                <Localization text="Buttons.readMore" />
              </Link>
            </div>
          </FadeUp>
        ))}
      </div>
      {news.length === 0 && (
        <div className="w-full text-center">
          <span className="text-xl">- There is no news at the moment!! -</span>
        </div>
      )}
    </>
  );
};

export default NewsItems;
