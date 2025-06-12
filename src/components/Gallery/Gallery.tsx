/// <reference path="../../../typing.d.ts" />
"use client";
import React, { useEffect, useState, useMemo } from "react";
import FadeUp from "../ui/FadeUp";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import MaskText from "../ui/MaskText";
import GalleryImage from "./GalleryImage";
import { useGetLocale } from "@/config";
import { getOptimizedImageUrl, getBlurDataUrl, imageSizes } from "@/lib/sanity-image";
import { useTranslations } from "next-intl";
import { GalleryCarousel } from "./GalleryCarousel";
import { useImagePreloader } from "@/lib/useImagePreloader";

/// <reference path="../../../typing.d.ts" />

export const Gallery = ({
  data,
  mode = "carousel",
}: {
  data?: GallerySection;
  mode?: "grid" | "carousel";
}) => {
  const t = useTranslations("Buttons");
  const locale = useGetLocale();

  const [favouriteList, setFavouriteList] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);

  // Prepare optimized image URLs for preloading
  const imageUrls = useMemo(() => {
    if (!data?.images) return [];
    return data.images.map((image) => 
      getOptimizedImageUrl(image, imageSizes.gallery.desktop.width, imageSizes.gallery.desktop.height)
    );
  }, [data?.images]);

  // Preload images
  const { isPreloading } = useImagePreloader(imageUrls);

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

  // Return carousel mode if selected
  if (mode === "carousel") {
    return <GalleryCarousel galleryData={data} />;
  }

  // Default grid mode
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
                src={getOptimizedImageUrl(image, imageSizes.gallery.desktop.width, imageSizes.gallery.desktop.height)}
                blurDataURL={getBlurDataUrl(image)}
                i={i}
                favouriteList={favouriteList}
                setFavouriteList={setFavouriteList}
              />
            ))}
          </div>
          {!showMore && (
            <FadeUp
              delay={0.55 * images.length}
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
