"use client";

import Image from "next/image";
import { getOptimizedImageUrl, getBlurDataUrl, imageSizes } from "@/lib/sanity-image";
import { cn } from "@/lib/utils";
import { ANIMATION_STYLES, IMAGE_CONFIG } from "./constants";

interface GalleryImageProps {
  image: any;
  index: number;
  shouldLoadImages: boolean;
  hasInitialized: boolean;
  isLoaded: boolean;
  onLoad: () => void;
}

export function CarouselImage({ 
  image, 
  index, 
  shouldLoadImages, 
  hasInitialized, 
  isLoaded, 
  onLoad 
}: GalleryImageProps) {
  return (
    <div className="group relative h-[400px] w-full overflow-hidden rounded-lg md:h-[500px] lg:h-[600px]">
      {/* Animated gradient placeholder */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
      >
        {/* Gradient background */}
        <div 
          className="absolute inset-0 animate-gradient bg-gradient-to-br from-accent-soft-apricot/30 via-accent/20 to-accent-soft-apricot/30"
          style={ANIMATION_STYLES.gradient}
        />
        {/* Shimmer effect */}
        <div 
          className="absolute inset-0 animate-shimmer"
          style={ANIMATION_STYLES.shimmer}
        />
      </div>
      
      {shouldLoadImages && hasInitialized ? (
        <Image
          src={getOptimizedImageUrl(image, imageSizes.carousel.desktop.width, imageSizes.carousel.desktop.height)}
          alt={`Gallery image ${index + 1}`}
          width={imageSizes.carousel.desktop.width}
          height={imageSizes.carousel.desktop.height}
          sizes={IMAGE_CONFIG.sizes}
          priority={IMAGE_CONFIG.priority}
          loading={IMAGE_CONFIG.loading}
          placeholder={IMAGE_CONFIG.placeholder}
          blurDataURL={getBlurDataUrl(image)}
          className={cn(
            "h-full w-full object-cover transition-all duration-700",
            "group-hover:scale-105"
          )}
          onLoad={onLoad}
        />
      ) : (
        <div className="h-full w-full bg-accent-soft-apricot/20" />
      )}
    </div>
  );
}