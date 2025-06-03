import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Utensils } from "lucide-react";
import { getTranslations } from "next-intl/server";

// Import hero image for build-time optimization
import heroImage from "../../../public/hero.webp";

export async function HomeHeroUltraOptimized({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Home" });
  const tNav = await getTranslations({ locale, namespace: "Navigation" });

  return (
    <div className="relative flex h-[70vh] w-screen items-center justify-center">
      {/* Hero image - loads immediately, no animation blocking LCP */}
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute z-10 h-full w-full bg-black/40" />
        <Image
          src={heroImage}
          alt="hero"
          quality={75}
          sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, (max-width: 1920px) 1920px, 2560px"
          style={{ objectFit: "cover" }}
          className="h-full w-full"
          loading="eager"
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
          <Link href="/lunch" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            {tNav("lunch")}
          </Link>
        </Button>

        {/* Main CTA - matching ScrollToMenu design */}
        <Button
          asChild
          className="hero-fade-5 relative flex items-center gap-1 bg-secondary transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          <a href="#menu" className="flex items-center gap-1">
            <svg
              className="size-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <span className="pointer-events-none">{t("HomeHero.cta")}</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
