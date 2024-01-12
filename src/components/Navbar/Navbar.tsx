import LocaleSwitcher from "./LocaleSwitcher";
import { useTranslations } from "next-intl";
import Image from "next/image";
import NavLinks from "./NavLinks";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Link } from "@/navigation";

export function Navbar() {
  const t = useTranslations("Navigation");

  const navbarLinks = [
    {
      title: t("home"),
      href: "/",
    },
    {
      title: t("menu"),
      href: "/menu",
    },
    {
      title: t("about"),
      href: "/about",
    },
    {
      title: t("news"),
      href: "/news",
    },
  ];
  return (
    <header className="sticky w-screen h-[132px]" id="navbar">
      <div className="container h-full flex gap-4 items-center">
        <Link href={"/"} className="flex-1">
          <Image src="/logo.png" alt="logo" width={80} height={80} />
        </Link>
        <div className="lg:flex hidden flex-1 justify-end md:justify-center">
          <NavLinks navbarLinks={navbarLinks} />
        </div>
        <div className="lg:flex hidden justify-end items-center md:flex-1 gap-2">
          <a
            href={"#contact"}
            className="px-4 py-2 whitespace-nowrap font-lato uppercase font-normal bg-accent text-secondary hover:bg-primary transition-all duration-200"
          >
            where to find us
          </a>
          <div className="hidden px-4 py-2 md:inline-flex items-center ">
            <LocaleSwitcher />
          </div>
        </div>
        <button
          title="menu"
          aria-label="menu"
          aria-live="polite"
          className="lg:hidden block"
        >
          <HamburgerMenuIcon width={30} height={30} />
        </button>
      </div>
    </header>
  );
}
