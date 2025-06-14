import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ScrollToMenu from "../ScrollToMenu";
import { Badge } from "../ui/badge";

export async function HomeHero() {
  const t = await getTranslations("Home");

  return (
    <div className="relative flex h-[70vh] w-screen items-center justify-center">
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute z-10 h-full w-full bg-black/40" />
        <Image
          src="/hero.webp"
          alt="hero"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          blurDataURL="data:image/webp;base64,UklGRioDAABXRUJQVlA4WAoAAAAgAAAAmwAAcAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggPAEAADANAJ0BKpwAcQA+7XCvUa04JKKnuGrjAB2JZwDQ7n3/uBSCwOalv7guM8LHptR4H/Xyj/wNVx1CQMj9POJluDkR+Wc53vEBUXkwrxGj5smO3eUeIQNVA0EX4MKHh5uCK9iL2vFSryUCbZktC4AnPzXy4AD+xhFXN3uvqooo+vH0HU23147cBNZIZ5ZaPN7jPCYsyxSWWjjNOftxtbBar7/5w/5guK2lPA10uN0NvlKdWfWFVzUwFGuA6z/v53lYX+JeAx/VpiFMq7yJrvXIfyB1Dy1BMM5nhjl0H1bcDNmz5Gz3ie4TGnJeXg9REgwGlKGua/hfYW3ORuLqwPTTD58N7+lZ/+FzxeaqhT7aEOEEsj/6g6k6/xhWD8Wfc+MWpiDuA5Ob1oNzl4vMHc8q41bQgABcK1zo4AAAAAA="
          placeholder="blur"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center sm:px-8">
        {/* Content wrapper positioned slightly higher on mobile, centered on lg */}
        <div className="flex flex-col items-center -mt-8 sm:-mt-10 lg:mt-0">
          <Badge
            variant="secondary"
            className="animate-fadeUp pointer-events-none mb-4 rounded-sm bg-muted-foreground/70 px-4 py-2 font-medium text-secondary backdrop-blur-sm"
            style={{ animationDelay: "0.5s" }}
          >
            <span className="uppercase">{t("HomeHero.badge.main")}</span>
            <span>{t("HomeHero.badge.suffix")}</span>
          </Badge>

          <h1
            className="hero-title animate-fadeUp mb-4"
            style={{ animationDelay: "0.8s" }}
          >
            {t("HomeHero.title")}
          </h1>

          {/* Hero description */}
          <p
            className="animate-fadeUp break-words font-lato text-[4vw] text-light opacity-70 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] sm:text-[22px] lg:text-[26px] lg:leading-[85px] mb-16 sm:mb-20 lg:mb-24"
            style={{ animationDelay: "1.1s" }}
          >
            {t("HomeHero.description")}
          </p>

          {/* Main CTA button moved up and integrated with content */}
          <div className="animate-fadeUp" style={{ animationDelay: "1.4s" }}>
            <ScrollToMenu>{t("HomeHero.cta")}</ScrollToMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
