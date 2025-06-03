import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Utensils } from "lucide-react";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";

// Lazy load heavy client components
const ScrollToMenu = dynamic(() => import("../ScrollToMenu"), { ssr: false });
const ClientAnimations = dynamic(() => import("./ClientAnimations"), {
  ssr: false,
});

export async function HomeHeroOptimized({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Home" });
  const tNav = await getTranslations({ locale, namespace: "Navigation" });

  return (
    <div className="relative flex h-[70vh] w-screen items-center justify-center">
      {/* Hero image - loads immediately, no animation blocking LCP */}
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute z-10 h-full w-full bg-black/40" />
        <Image
          src="/hero.webp"
          alt="hero"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
          className="h-full w-full"
        />
      </div>

      {/* Content - rendered server-side for instant LCP */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center sm:px-8">
        <Badge
          variant="secondary"
          className="pointer-events-none mb-4 rounded-sm bg-muted-foreground/70 px-4 py-2 font-medium text-secondary backdrop-blur-sm"
        >
          <span className="uppercase">{t("HomeHero.badge.main")}</span>
          <span>{t("HomeHero.badge.suffix")}</span>
        </Badge>

        <h1 className="hero-title mb-4">{t("HomeHero.title")}</h1>

        <p className="break-words font-lato text-[4vw] text-light opacity-70 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] sm:text-[22px] lg:text-[26px] lg:leading-[85px]">
          {t("HomeHero.description")}
        </p>
      </div>

      <div className="absolute bottom-6 z-20 flex flex-col items-center gap-3">
        {/* Lunch button - server rendered */}
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="group border-2 border-white bg-white/20 font-medium uppercase tracking-wide text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:text-white lg:hidden"
        >
          <Link href="/lunch" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            {tNav("lunch")}
          </Link>
        </Button>

        {/* Main CTA - lazy loaded */}
        <ScrollToMenu>{t("HomeHero.cta")}</ScrollToMenu>
      </div>

      {/* Add animations after content is loaded */}
      <ClientAnimations />
    </div>
  );
}
