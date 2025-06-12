import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ScrollToMenu from "../ScrollToMenu";
import { Badge } from "../ui/badge";

export async function HomeHero() {
  const t = await getTranslations("Home");

  return (
    <div className="relative flex h-[70vh] w-screen items-center justify-center">
      <div className="relative h-full overflow-hidden hero-image-container">
        <div className="absolute z-10 h-full w-full bg-black/40" />
        <Image
          src="/hero.webp"
          alt="hero"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center sm:px-8">
        <Badge
          variant="secondary"
          className="pointer-events-none mb-4 rounded-sm bg-muted-foreground/70 px-4 py-2 font-medium text-secondary backdrop-blur-sm animate-fadeUp"
          style={{ animationDelay: '0.5s' }}
        >
          <span className="uppercase">
            {t("HomeHero.badge.main")}
          </span>
          <span>
            {t("HomeHero.badge.suffix")}
          </span>
        </Badge>

        <h1 className="hero-title mb-4 animate-fadeUp" style={{ animationDelay: '0.8s' }}>
          {t("HomeHero.title")}
        </h1>
        
        {/* Hero description */}
        <p className="break-words font-lato text-[4vw] text-light opacity-70 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] sm:text-[22px] lg:text-[26px] lg:leading-[85px] animate-fadeUp" style={{ animationDelay: '1.1s' }}>
          {t("HomeHero.description")}
        </p>
      </div>
      
      <div className="absolute bottom-6 z-20 flex items-center justify-center">
        {/* Main CTA button */}
        <div className="animate-fadeUp" style={{ animationDelay: '1.4s' }}>
          <ScrollToMenu>{t("HomeHero.cta")}</ScrollToMenu>
        </div>
      </div>
    </div>
  );
}