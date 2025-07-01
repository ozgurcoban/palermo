"use client";

import LocaleSwitcher from "./LocaleSwitcher";
import { useTranslations } from "next-intl";
import Image from "next/image";
import NavLinks from "./NavLinks";
import { Link } from "@/navigation";
import { useCallback } from "react";
import { Button } from "../ui/button";
import { trackNavbarContactClick } from "@/lib/gtag";
import ThemeToggle from "../ui/theme-toggle";

export function Navbar() {
  const handleClick = useCallback((clickEvent: React.MouseEvent) => {
    clickEvent.preventDefault();

    // Track the CTA click
    try {
      trackNavbarContactClick();
    } catch (error) {
      console.error('[Navbar] Tracking error:', error);
    }

    const contactElement = document.getElementById("contact");
    if (contactElement) {
      window.scrollTo({
        top: scrollY + contactElement.getBoundingClientRect().top,
        behavior: "smooth",
      });
    }
  }, []);

  const t = useTranslations("Navigation");

  const navbarLinks = [
    {
      title: t("home"),
      href: "/",
      src: "home.jpg",
    },
    {
      title: t("menu"),
      href: "/menu",
      src: "menu.jpg",
    },
    {
      title: t("lunch"),
      href: "/lunch",
      src: "lunch.jpg",
    },
  ];
  return (
    <header className="relative z-30 h-[132px] w-screen" id="navbar">
      <div className="container flex h-full items-center gap-6">
        <Link href={"/"} className="flex-1 cursor-default" aria-label={t("goToHomepage")}>
          <div className="h-[90px] w-[90px] sm:h-[100px] sm:w-[100px] md:h-[110px] md:w-[110px]">
            {/* Light mode logo */}
            <Image
              src="/logo.png"
              alt="Palermo logo"
              width={90}
              height={90}
              sizes="(min-width: 768px) 110px, (min-width: 640px) 100px, 90px"
              style={{
                cursor: "pointer",
                borderRadius: "50%",
                width: "100%",
                height: "100%",
              }}
              priority
              className="block dark:hidden"
            />
            {/* Dark mode logo */}
            <Image
              src="/dark-logo.webp"
              alt="Palermo logo"
              width={90}
              height={90}
              sizes="(min-width: 768px) 110px, (min-width: 640px) 100px, 90px"
              style={{
                cursor: "pointer",
                borderRadius: "50%",
                width: "100%",
                height: "100%",
                border: "2px solid #848E97",
                transform: "scale(1.04)",
              }}
              priority
              className="hidden dark:block"
            />
          </div>
        </Link>
        <div className="hidden flex-1 justify-end md:justify-center lg:flex">
          <NavLinks navbarLinks={navbarLinks} />
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <ThemeToggle />
          <Button
            variant="secondary"
            size="lg"
            onClick={handleClick}
            aria-label={t("scrollToContact")}
            className="transform whitespace-nowrap bg-[#5A4B3A] px-4 py-2 font-lato uppercase text-white transition-all duration-200 dark:bg-primary dark:hover:bg-primary/90"
          >
            {t("contact")}
          </Button>
          <div className="hidden items-center px-4 py-2 lg:inline-flex">
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
