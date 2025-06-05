import Image from "next/image";
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

export function PageHeroOptimized({
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
  return (
    <div
      className={`relative flex w-screen items-center justify-center ${height}`}
    >
      {/* Background image - no animation for instant LCP */}
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
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAADwAwCdASoUAA4APzmEuVOvKKWisAgB4CcJZgCdACIg3bNj60cQSSlcAP6DgxtEsmCbVWOH6sZuItVyjk6VpLuprY1gXUodTrwpbHtG4mRPscq/2jCTKLCUgThfwOCASM7AuGYzAaQAAA=="
        />
      </div>

      {/* Content with CSS animations */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center sm:px-8">
        {badge && (
          <div 
            className="page-hero-fade"
            style={{ animationDelay: `${badgeDelay}s` }}
          >
            {badge}
          </div>
        )}

        <h1 
          className="hero-title-simple page-hero-fade mb-3 sm:mb-4"
          style={{ animationDelay: `${titleDelay}s` }}
        >
          {title}
        </h1>

        <p 
          className="hero-description page-hero-fade"
          style={{ animationDelay: `${descriptionDelay}s` }}
        >
          {description}
        </p>
      </div>
      
      {/* Mobile CTA button */}
      {ctaText && ctaAction && (
        <div 
          className="page-hero-fade absolute bottom-6 z-20 flex flex-col items-center lg:hidden"
          style={{ animationDelay: `${ctaDelay}s` }}
        >
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