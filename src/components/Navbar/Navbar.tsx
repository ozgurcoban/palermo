"use client";

import LocaleSwitcher from "./LocaleSwitcher";
import { useTranslations } from "next-intl";
import Image from "next/image";
import NavLinks from "./NavLinks";
import { Link } from "@/navigation";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MobileNav from "./MobileNav";
import { background, opacity } from "./anim";
import { Button } from "../ui/button";
import { event } from "@/lib/gtag";
import { cn } from "@/lib/utils";
import ThemeToggle from "../ui/theme-toggle";

export function Navbar() {
  const handleClick = useCallback((clickEvent: React.MouseEvent) => {
    clickEvent.preventDefault();

    // Track the CTA click
    event({
      action: "click",
      category: "navigation",
      label: "hitta_till_oss_cta",
    });

    const contactElement = document.getElementById("contact");
    if (contactElement) {
      window.scrollTo({
        top: scrollY + contactElement.getBoundingClientRect().top,
        behavior: "smooth",
      });
    }
  }, []);

  const t = useTranslations("Navigation");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) body.style.overflowY = isActive ? "hidden" : "auto";
  }, [isActive]);

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
    // {
    //   title: t("about"),
    //   href: "/about",
    //   src: "home.jpg",
    // },
    // {
    //   title: t("news"),
    //   href: "/news",
    //   src: "news.jpg",
    // },
  ];
  return (
    <header className="relative z-30 h-[132px] w-screen" id="navbar">
      <div className="container flex h-full items-center gap-6">
        <Link href={"/"} className="flex-1 cursor-default">
          <div className="h-[90px] w-[90px] sm:h-[100px] sm:w-[100px] md:h-[110px] md:w-[110px]">
            {/* Light mode logo */}
            <Image
              src="/logo.png"
              alt="logo"
              width={110}
              height={110}
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
              alt="logo"
              width={110}
              height={110}
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
            className="transform whitespace-nowrap bg-[#5A4B3A] px-4 py-2 font-lato uppercase text-white transition-all duration-200 dark:bg-primary dark:hover:bg-primary/90"
          >
            {t("contact")}
          </Button>
          <div className="hidden items-center px-4 py-2 lg:inline-flex">
            <LocaleSwitcher />
          </div>
        </div>
        <button
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={
            "flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-4 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:ring-offset-0 lg:hidden"
          }
          aria-label={isActive ? t("closeMenu") : t("openMenu")}
          aria-expanded={isActive}
          aria-controls="mobile-menu"
          type="button"
          role="button"
          tabIndex={0}
        >
          <div
            className={`burger ${isActive ? "burgerActive" : ""}`}
            aria-hidden="true"
          ></div>
          <span className="sr-only">
            {isActive ? t("closeMenu") : t("openMenu")}
          </span>
        </button>
      </div>
      <AnimatePresence mode="wait">
        {isActive && (
          <MobileNav
            onCloseMenu={() => setIsActive(false)}
            links={navbarLinks}
          />
        )}
      </AnimatePresence>

      <div className="relative">
        <motion.div
          variants={background}
          initial="initial"
          animate={isActive ? "open" : "closed"}
          onClick={() => setIsActive(false)}
          className={
            "absolute left-0 top-full z-40 h-full w-full bg-dark opacity-80"
          }
        ></motion.div>
      </div>
    </header>
  );
}
