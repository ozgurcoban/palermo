"use client"
import React, { useEffect, useState } from "react";
import FadeUp from "../ui/FadeUp";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import MaskText from "../ui/MaskText";
import GalleryImage from "./GalleryImage";

export const Gallery = () => {
  const gallery = ["gall1", "gall2", "gall3", "gall4", "gall5"];

  const [favouriteList, setFavouriteList] = useState<string[]>([])

    // Get the list from localStorage
    useEffect(() => {
        const getFavListFromLocal = localStorage.getItem("favList");

        if (getFavListFromLocal) {
            const favList: string[] = JSON.parse(getFavListFromLocal);
            setFavouriteList(favList);
        }
      }, [])

  return (
    <section className="w-screen py-40 h-full bg-[#f9f9f9] relative">
      <div className="container flex flex-col items-center">
        <h2 className="title-secondary">
          <MaskText
            delay={0.2}
            phrases={["Beautiful moments in Palermo"]}
            className="font-recoleta leading-tight font-bold text-center"
          />
        </h2>
        <div className="w-full mt-6">
          <MaskText
            delay={0.4}
            phrases={[
              "From hearty meals to joyful gatherings – browse through our memories and feel at home.",
            ]}
            className="text-body text-center mx-auto opacity-80"
          />
        </div>
        <div className="relative w-full">
          <div className="mt-36 w-full grid auto-rows-[250px] lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {gallery.map((imageId, i) => 
              <GalleryImage key={`gallery-image-${i}`} imageId={imageId} i={i} favouriteList={favouriteList} setFavouriteList={setFavouriteList} />
            )}
          </div>
          <FadeUp
            delay={0.05 * gallery.length}
            className="absolute z-10 bottom-0 left-0 w-full h-28 pt-4 from-neutral-100 bg-gradient-to-t overflow-hidden flex items-center justify-center"
          >
            <Button className="bg-accent" title="See more" aria-live="polite">
              <span className="font-lato text-base capitalize">See More</span>
              <TriangleDownIcon width={16} height={16} />
            </Button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

