"use client";
import React, { useRef } from "react";
import InfiniteMove from "../ui/InfiniteMove";
import Image from "next/image";
import urlFor from "@/lib/urlFor";

type Props = {
  images: Image[];
  IMAGE_BY_ROW: number;
  direction: number;
};

const WallItem: React.FC<Props> = ({ IMAGE_BY_ROW, images, direction }) => {
  const firstList = useRef<HTMLDivElement | null>(null);
  const secondList = useRef<HTMLDivElement | null>(null);
  return (
    <div className={`relative w-full`}>
      <InfiniteMove
        direction={direction}
        firstList={firstList}
        secondList={secondList}
      />
      <div
        ref={firstList}
        style={{
          gridTemplateColumns: `repeat(${IMAGE_BY_ROW}, minmax(0, 1fr))`,
        }}
        className="relative grid w-max gap-8"
      >
        {images.map(image => {
          return (
            <div
              key={image._key}
              className={`relative rounded overflow-hidden w-72 h-72 xl:w-96 xl:h-96`}
            >
              <Image
                src={urlFor(image).url()}
                alt={urlFor(image).url()}
                fill
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
      <div
        ref={secondList}
        style={{
          gridTemplateColumns: `repeat(${IMAGE_BY_ROW}, minmax(0, 1fr))`,
        }}
        className="absolute left-full top-0 grid w-max gap-8 pl-8"
      >
        {images.map(image => {
          return (
            <div
              key={image._key}
              className={`relative rounded overflow-hidden w-72 h-72 xl:w-96 xl:h-96`}
            >
              <Image
                src={urlFor(image).url()}
                alt={urlFor(image).url()}
                fill
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WallItem;
