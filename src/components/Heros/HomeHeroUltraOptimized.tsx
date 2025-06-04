"use client";

import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Utensils } from "lucide-react";
import { useTranslations } from "next-intl";
import ScrollToMenu from "../ScrollToMenu";
import { trackLunchCTAClick } from "@/lib/gtag";

// Import hero image for build-time optimization
import heroImage from "../../../public/hero.webp";

// High-quality LQIP for smooth transition (20px width)
const placeholderBase64 = "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAADwAwCdASoUAA4APzmEuVOvKKWisAgB4CcJZgCdACIg3bNj60cQSSlcAP6DgxtEsmCbVWOH6sZuItVyjk6VpLuprY1gXUodTrwpbHtG4mRPscq/2jCTKLCUgThfwOCASM7AuGYzAaQAAA==";

export function HomeHeroUltraOptimized({ locale }: { locale: string }) {
  const t = useTranslations("Home");
  const tNav = useTranslations("Navigation");

  const handleLunchClick = () => {
    trackLunchCTAClick();
  };

  return (
    <div className="relative flex h-[70vh] w-screen items-center justify-center">
      {/* Hero image - loads immediately, no animation blocking LCP */}
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute z-10 h-full w-full bg-black/40" />
        <Image
          src={heroImage}
          alt="hero"
          quality={60}
          sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, 1920px"
          style={{ objectFit: "cover" }}
          className="h-full w-full"
          priority
          placeholder="blur"
          blurDataURL={placeholderBase64}
        />
      </div>

      {/* Content - rendered server-side with CSS animations */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center sm:px-8">
        <Badge
          variant="secondary"
          className="hero-fade-1 pointer-events-none mb-4 rounded-sm bg-muted-foreground/70 px-4 py-2 font-medium text-secondary backdrop-blur-sm"
        >
          <span className="uppercase">{t("HomeHero.badge.main")}</span>
          <span>{t("HomeHero.badge.suffix")}</span>
        </Badge>

        <h1 className="hero-title hero-fade-2 mb-4">{t("HomeHero.title")}</h1>

        <p className="hero-fade-3 break-words font-lato text-[4vw] text-light opacity-70 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] sm:text-[22px] lg:text-[26px] lg:leading-[85px]">
          {t("HomeHero.description")}
        </p>
      </div>

      <div className="absolute bottom-6 z-20 flex flex-col items-center gap-3">
        {/* Lunch button - server rendered */}
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="hero-fade-4 group border-2 border-white bg-white/20 font-medium uppercase tracking-wide text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:text-white lg:hidden"
        >
          <Link href="/lunch" className="flex items-center gap-2" onClick={handleLunchClick}>
            <Utensils className="h-4 w-4" />
            {tNav("lunch")}
          </Link>
        </Button>

        {/* Main CTA with tracking */}
        <div className="hero-fade-5">
          <ScrollToMenu>{t("HomeHero.cta")}</ScrollToMenu>
        </div>
      </div>
    </div>
  );
}