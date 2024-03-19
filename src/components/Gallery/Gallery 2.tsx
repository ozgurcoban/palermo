"use client";
import React, { useEffect, useState } from "react";
import FadeUp from "../ui/FadeUp";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import MaskText from "../ui/MaskText";
import GalleryImage from "./GalleryImage";
import { useGetLocale } from "@/config";
import urlFor from "@/lib/urlFor";
import { useTranslations } from "next-intl";

export const Gallery = ({ data }: { data?: GallerySection }) => {
  const t = useTranslations("Buttons");
  const locale = useGetLocale();

  const [favouriteList, setFavouriteList] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);

  // Get the list from localStorage
  useEffect(() => {
    const getFavListFromLocal = localStorage.getItem("favList");

    if (getFavListFromLocal) {
      const favList: string[] = JSON.parse(getFavListFromLocal);
      setFavouriteList(favList);
    }
  }, []);

  if (!data) return;

  const { title, description, images } = data;

  return (
    <section className="w-screen py-40 h-full bg-[#f9f9f9] relative">
      <div className="container flex flex-col items-center">
        <h2 className="title-secondary">
          <MaskText
            delay={0.2}
            phrases={[title[locale]]}
            className="font-recoleta leading-tight font-bold text-center"
          />
        </h2>
        {description && (
          <div className="w-full mt-6">
            <MaskText
              delay={0.4}
              phrases={[description[locale]]}
              className="text-body text-center mx-auto opacity-80"
            />
          </div>
        )}
        <div className="relative w-full">
          <div className="mt-36 w-full grid auto-rows-[250px] lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {(showMore ? images : images.slice(0, 7)).map((image, i) => (
              <GalleryImage
                key={image._key}
                imageId={image._key}
                src={urlFor(image).url()}
                i={i}
                favouriteList={favouriteList}
                setFavouriteList={setFavouriteList}
              />
            ))}
          </div>
          {!showMore && (
            <FadeUp
              delay={0.05 * images.length}
              className="absolute z-10 bottom-0 left-0 w-full h-28 pt-4 from-neutral-100 bg-gradient-to-t overflow-hidden flex items-center justify-center"
            >
              <Button
                onClick={() => setShowMore(true)}
                className="bg-accent"
                title="See more"
                aria-live="polite"
              >
                <span className="font-lato text-base capitalize">
                  {t("seeMore")}
                </span>
                <TriangleDownIcon width={16} height={16} />
              </Button>
            </FadeUp>
          )}
        </div>
      </div>
    </section>
  );
};
