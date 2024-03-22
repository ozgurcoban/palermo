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

export function Navbar() {
  const handleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      window.scrollTo({
        top: scrollY + contactElement.getBoundingClientRect().top + 100,
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
    {
      title: t("news"),
      href: "/news",
      src: "news.jpg",
    },
  ];
  return (
    <header className="relative bg-light h-[132px] z-30 w-screen " id="navbar">
      <div className="container h-full flex gap-14 items-center">
        <Link href={"/"} className="flex-1 cursor-default">
          <Image
            src="/logo.png"
            alt="logo"
            width={80}
            height={80}
            style={{ cursor: "pointer" }}
          />
        </Link>
        <div className="lg:flex hidden flex-1 justify-end md:justify-center">
          <NavLinks navbarLinks={navbarLinks} />
        </div>
        <div className="md:flex justify-end items-center md:flex-1 gap-2">
          <a
            onClick={handleClick}
            className="px-4 py-2 whitespace-nowrap font-lato uppercase font-normal bg-accent text-secondary hover:bg-primary transition-all duration-200 rounded"
          >
            {t("contact")}
          </a>
          <div className="hidden px-4 py-2 lg:inline-flex items-center ">
            <LocaleSwitcher />
          </div>
        </div>
        <div
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={
            "flex p-2 lg:hidden items-center justify-center gap-2 cursor-pointer"
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
            "bg-dark opacity-80 h-full w-full absolute left-0 top-full z-40"
          }
        ></motion.div>
      </div>
    </header>
  );
}
