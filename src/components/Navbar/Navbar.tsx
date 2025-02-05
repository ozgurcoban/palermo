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

export function Navbar() {
  const handleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      window.scrollTo({
        top: scrollY + contactElement.getBoundingClientRect().top + 150,
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
      title: t("about"),
      href: "/about",
      src: "home.jpg",
    },
    // {
    //   title: t("news"),
    //   href: "/news",
    //   src: "news.jpg",
    // },
  ];
  return (
    <header className="relative z-30 h-[132px] w-screen" id="navbar">
      <div className="container flex h-full items-center gap-14">
        <Link href={"/"} className="flex-1 cursor-default">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            style={{ cursor: "pointer" }}
          />
        </Link>
        <div className="hidden flex-1 justify-end md:justify-center lg:flex">
          <NavLinks navbarLinks={navbarLinks} />
        </div>
        <div className="items-center justify-end gap-2 md:flex md:flex-1">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleClick}
            className="transform whitespace-nowrap bg-[#5A4B3A] px-4 py-2 font-lato uppercase text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            {t("contact")}
          </Button>
          <div className="hidden items-center px-4 py-2 lg:inline-flex">
            <LocaleSwitcher />
          </div>
        </div>
        <div
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={
            "flex cursor-pointer items-center justify-center gap-2 p-2 lg:hidden"
          }
        >
          <div className={`burger ${isActive ? "burgerActive" : ""}`}></div>
        </div>
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
