/// <reference path="../../../typing.d.ts" />
"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { getOptimizedImageUrl, getBlurDataUrl, imageSizes } from "@/lib/sanity-image";
import FadeUp from "@/components/ui/FadeUp";
import MaskText from "@/components/ui/MaskText";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetLocale } from "@/config";
import Autoplay from "embla-carousel-autoplay";
import { useImagePreloader } from "@/lib/useImagePreloader";

/// <reference path="../../../typing.d.ts" />

interface GalleryCarouselProps {
  galleryData: GallerySection;
}

export const GalleryCarousel: React.FC<GalleryCarouselProps> = ({
  galleryData,
}) => {
  const locale = useGetLocale();
  const title = galleryData.title[locale];
  const description = galleryData.description?.[locale];
  const plugin = useRef(Autoplay({ 
    delay: 4000, 
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    playOnInit: false // Don't start automatically
  }));

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  // Prepare optimized image URLs for preloading
  const imageUrls = useMemo(() => {
    // Preload first image with the same size as we use in the component
    return galleryData.images.slice(0, 1).map((image) => 
      getOptimizedImageUrl(image, 900, 450, 90)
    );
  }, [galleryData.images]);

  // Preload images
  useImagePreloader(imageUrls);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Intersection Observer to start autoplay when in view
  useEffect(() => {
    const currentRef = carouselRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true);
            plugin.current.play();
          } else if (!entry.isIntersecting && isInView) {
            setIsInView(false);
            plugin.current.stop();
          }
        });
      },
      {
        threshold: 0.4, // Trigger when 40% of carousel is visible
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isInView]);

  return (
    <section className="relative h-full w-screen bg-accent-soft-apricot py-40">
      <div className="container flex flex-col items-center">
        <MaskText
          delay={0.2}
          phrases={[title]}
          className="title-secondary text-center font-recoleta font-bold leading-tight"
          as="h2"
        />

        {description && (
          <div className="mt-6 w-full">
            <MaskText
              delay={0.4}
              phrases={[description]}
              className="text-body mx-auto max-w-md text-justify opacity-80"
            />
          </div>
        )}

        <FadeUp delay={0.3} className="relative mt-36 w-full">
          <div ref={carouselRef}>
            <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            className="relative w-full overflow-hidden"
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
          >
            <CarouselContent className="-ml-4">
              {galleryData.images.map((image, index) => (
                <CarouselItem key={image._key} className="basis-full pl-4">
                  <div className="group relative h-[400px] w-full overflow-hidden rounded-lg md:h-[500px] lg:h-[600px]">
                    <div className="relative h-full w-full">
                      <Image
                        src={getOptimizedImageUrl(image, 900, 450, 90)}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                        placeholder="blur"
                        blurDataURL={getBlurDataUrl(image)}
                        sizes="(max-width: 640px) 531px, (max-width: 1024px) 711px, 1200px"
                        className="object-cover transition-all duration-300 group-hover:scale-105"
                        quality={90}
                        onLoad={() => {
                          setLoadingStates(prev => ({ ...prev, [image._key]: false }));
                        }}
                        onError={() => {
                          setLoadingStates(prev => ({ ...prev, [image._key]: false }));
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-6 flex items-center justify-center gap-4">
              <CarouselPrevious className="position-static relative left-auto top-auto translate-x-0 translate-y-0" />
              <div className="flex gap-2">
                {Array.from({ length: count }).map((_, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-2 rounded-full p-0 transition-all",
                      current === index + 1
                        ? "w-6 bg-primary hover:bg-primary/80"
                        : "w-2 bg-primary/30 hover:bg-primary/50"
                    )}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <CarouselNext className="position-static relative right-auto top-auto translate-x-0 translate-y-0" />
            </div>
            </Carousel>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
