"use client";

import { useState, useMemo } from "react";
import { getOptimizedImageUrl, imageSizes } from "@/lib/sanity-image";
import { useImagePreloader } from "@/lib/useImagePreloader";

export function useImageLoading(images: any[], shouldLoadImages: boolean, hasInitialized: boolean) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Prepare optimized image URLs for preloading
  const imageUrls = useMemo(() => {
    if (!shouldLoadImages || !hasInitialized) return [];
    return images.map((image) => 
      getOptimizedImageUrl(image, imageSizes.carousel.desktop.width, imageSizes.carousel.desktop.height)
    );
  }, [images, shouldLoadImages, hasInitialized]);

  // Preload images when conditions are met
  useImagePreloader(hasInitialized && shouldLoadImages ? imageUrls : []);

  const markImageAsLoaded = (imageKey: string) => {
    setLoadedImages(prev => new Set(prev).add(imageKey));
  };

  const isImageLoaded = (imageKey: string) => {
    return loadedImages.has(imageKey);
  };

  return {
    loadedImages,
    markImageAsLoaded,
    isImageLoaded,
  };
}