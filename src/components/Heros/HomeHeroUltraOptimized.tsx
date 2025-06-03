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
      {/* Hero image with inline critical CSS */}
      <div 
        className="relative h-full w-full overflow-hidden"
        style={{
          backgroundColor: '#1a1a1a', // Fallback color matching image
        }}
      >
        <div className="absolute z-10 h-full w-full bg-black/40" />
        <Image
          src={heroImage}
          alt="hero"
          priority
          placeholder="blur"
          quality={85}
          sizes="100vw"
          style={{ 
            objectFit: "cover",
            width: '100%',
            height: '100%',
          }}
          className="h-full w-full"
        />
      </div>

      {/* Content - all inline for fastest render */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center sm:px-8">
        <div 
          className="pointer-events-none mb-4 rounded-sm bg-muted-foreground/70 px-4 py-2 font-medium text-secondary backdrop-blur-sm"
          style={{ display: 'inline-block' }}
        >
          <span className="uppercase">{t("HomeHero.badge.main")}</span>
          <span>{t("HomeHero.badge.suffix")}</span>
        </div>

        <h1 
          className="hero-title mb-4"
          style={{ 
            fontSize: 'clamp(2.5rem, 10vw, 6rem)',
            lineHeight: 1.1,
            fontWeight: 700,
          }}
        >
          {t("HomeHero.title")}
        </h1>

        <p 
          className="break-words font-lato text-light opacity-70 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]"
          style={{
            fontSize: 'clamp(1rem, 4vw, 1.625rem)',
            maxWidth: '48rem',
          }}
        >
          {t("HomeHero.description")}
        </p>
      </div>

      {/* CTAs - inline without dynamic imports */}
      <div className="absolute bottom-6 z-20 flex flex-col items-center gap-3">
        {/* Lunch button */}
        <div className="lg:hidden">
          <Link 
            href="/lunch" 
            className="group inline-flex items-center gap-2 rounded-md border-2 border-white bg-white/20 px-6 py-3 font-medium uppercase tracking-wide text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:text-white"
          >
            <Utensils className="h-4 w-4" />
            {tNav("lunch")}
          </Link>
        </div>

        {/* Main CTA - server rendered */}
        <Link
          href="#menu"
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-medium text-accent-foreground transition-all hover:bg-accent/90"
          style={{ scrollBehavior: 'smooth' }}
        >
          {t("HomeHero.cta")}
        </Link>
      </div>
    </div>
  );
}