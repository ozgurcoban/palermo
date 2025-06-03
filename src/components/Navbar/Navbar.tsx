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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) body.style.overflowY = isActive ? "hidden" : "auto";
  }, [isActive]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={cn(
        "relative z-30 h-[132px] w-screen border-b transition-all duration-300",
        isScrolled
          ? "border-border bg-background/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "border-transparent bg-background",
      )}
      id="navbar"
    >
      <div className="container flex h-full items-center gap-14">
        <Link
          href={"/"}
          className="flex-1 cursor-pointer transition-transform duration-200 hover:scale-105"
        >
          <Image src="/logo.png" alt="logo" width={100} height={100} priority />
        </Link>
        <div className="hidden flex-1 justify-end md:justify-center lg:flex">
          <NavLinks navbarLinks={navbarLinks} />
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button
            variant="default"
            size="lg"
            onClick={handleClick}
            className="whitespace-nowrap px-3 font-lato text-xs uppercase shadow-sm transition-all duration-200 hover:shadow-md lg:px-4 lg:text-base"
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
          className={cn(
            "cursor-pointer items-center justify-center gap-2 rounded-md p-2",
            "transition-colors duration-200 hover:bg-accent/10",
            "focus:outline-none focus:ring-2 focus:ring-accent/50",
            "flex lg:hidden",
          )}
          aria-label={isActive ? t("closeMenu") : t("openMenu")}
          aria-expanded={isActive}
          aria-controls="mobile-menu"
        >
          <div
            className={`burger ${isActive ? "burgerActive" : ""}`}
            aria-hidden="true"
          ></div>
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
