"use client";

import { useEffect, useState } from "react";

export const useImagePreloader = (imageUrls: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setIsPreloading(false);
      return;
    }

    const loadImage = (url: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(url);
        img.src = url;
      });
    };

    const preloadImages = async () => {
      setIsPreloading(true);
      const loaded = new Set<string>();

      // Load first 6 images with higher priority
      const priorityImages = imageUrls.slice(0, 6);
      const remainingImages = imageUrls.slice(6);

      try {
        // Load priority images first
        const priorityPromises = priorityImages.map(loadImage);
        const priorityResults = await Promise.allSettled(priorityPromises);
        
        priorityResults.forEach((result, index) => {
          if (result.status === "fulfilled") {
            loaded.add(priorityImages[index]);
          }
        });

        setLoadedImages(new Set(loaded));

        // Then load remaining images
        if (remainingImages.length > 0) {
          const remainingPromises = remainingImages.map(loadImage);
          const remainingResults = await Promise.allSettled(remainingPromises);
          
          remainingResults.forEach((result, index) => {
            if (result.status === "fulfilled") {
              loaded.add(remainingImages[index]);
            }
          });

          setLoadedImages(new Set(loaded));
        }
      } catch (error) {
        console.error("Error preloading images:", error);
      } finally {
        setIsPreloading(false);
      }
    };

    preloadImages();
  }, [imageUrls]);

  return { loadedImages, isPreloading };
};