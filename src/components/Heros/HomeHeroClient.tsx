"use client";

import { useState } from "react";
import Image from "next/image";
import heroImage from "../../../public/hero.webp";

// Base64 placeholder for instant loading
const placeholderBase64 = "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAAAQAgCdASoKAAoABUB8JZgCdAEegWSq3bAAAMyiHAXuOJAZjTSPXcvD4uBH8x1+r3bsTNTk4NWBvDKrngAAAA==";

interface HomeHeroClientImageProps {
  alt: string;
}

export function HomeHeroClientImage({ alt }: HomeHeroClientImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Blurred placeholder - visible until image loads */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${placeholderBase64})`,
          filter: "blur(20px)",
          transform: "scale(1.1)",
        }}
      />
      
      {/* Main image with progressive enhancement */}
      <Image
        src={heroImage}
        alt={alt}
        quality={60}
        sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, 1920px"
        style={{ objectFit: "cover" }}
        className={`h-full w-full transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        priority
        onLoad={() => setIsLoaded(true)}
        placeholder="blur"
        blurDataURL={placeholderBase64}
      />
    </>
  );
}