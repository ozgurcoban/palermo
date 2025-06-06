"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";


interface HeroProps {
  imageUrl: string;
  imageAlt: string;
  height?: string;
  overlayGradient?: string;
  badge?: ReactNode;
  title: string;
  description: string;
  badgeDelay?: number;
  titleDelay?: number;
  descriptionDelay?: number;
  ctaText?: string;
  ctaAction?: () => void;
  ctaDelay?: number;
}

export function PageHero({
  imageUrl,
  imageAlt,
  height = "h-[50vh]",
  overlayGradient = "from-black/30 via-black/40 to-black/50",
  badge,
  title,
  description,
  badgeDelay = 0.3,
  titleDelay = 0.5,
  descriptionDelay = 0.7,
  ctaText,
  ctaAction,
  ctaDelay = 0.9,
}: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 50);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={heroRef}
      className={`relative flex w-screen items-center justify-center ${height}`}
    >
      <div className="relative h-full w-full overflow-hidden">
        <div
          className={`absolute z-10 h-full w-full bg-gradient-to-b ${overlayGradient}`}
        />
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={1920}
          height={1080}
          style={{ objectFit: "cover" }}
          className="h-full w-full object-[50%_50%] lg:object-[50%_60%] xl:object-[50%_75%]"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center sm:px-8">
        {badge && (
          <div className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {badge}
          </div>
        )}

        <h1 className={`hero-title-simple mb-3 sm:mb-4 transition-all duration-700 ease-out transform delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {title}
        </h1>

        <p className={`hero-description transition-all duration-700 ease-out transform delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {description}
        </p>
      </div>
      
      {/* Mobile CTA button */}
      {ctaText && ctaAction && (
        <div className={`absolute bottom-6 z-20 flex flex-col items-center lg:hidden transition-all duration-500 ease-out delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <Button
            onClick={ctaAction}
            className="group flex items-center gap-2 bg-secondary transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            size="lg"
            type="button"
          >
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            <span>{ctaText}</span>
          </Button>
        </div>
      )}
    </div>
  );
}
