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
    <section className="relative h-full w-screen bg-accent-soft-apricot py-40">
      <div className="container flex flex-col items-center">
        <MaskText
          delay={0.2}
          phrases={[title[locale]]}
          className="title-secondary text-center font-recoleta font-bold leading-tight"
          as="h2"
        />

        {description && (
          <div className="mt-6 w-full">
            <MaskText
              delay={0.4}
              phrases={[description[locale]]}
              className="text-body mx-auto max-w-md text-justify opacity-80"
            />
          </div>
        )}
        <div className="relative w-full">
          <div className="mt-36 grid w-full auto-rows-[250px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              className="absolute bottom-0 left-0 z-10 flex h-28 w-full items-center justify-center overflow-hidden bg-gradient-to-t from-neutral-100 pt-4"
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
