/// <reference path="../../../typing.d.ts" />
"use client";

import { GalleryCarousel } from "./GalleryCarousel";

export const Gallery = ({ data }: { data?: GallerySection }) => {
  if (!data || !data.images || data.images.length === 0) return null;

  return <GalleryCarousel galleryData={data} />;
};