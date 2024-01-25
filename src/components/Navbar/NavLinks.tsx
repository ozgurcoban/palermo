"use client";
import clsx from "clsx";
import { Link } from "@/navigation";
import { usePathname } from "@/navigation";
import React from "react";

type NavLinks = {
  navbarLinks: {
    title: string;
    href: any;
  }[];
};

const NavLinks = ({ navbarLinks }: NavLinks) => {
  const pathname = usePathname();

  const isPathname = (href: string) => pathname === href;

  return (
    <nav className="gap-10 uppercase font-lato text-base whitespace-nowrap hidden md:flex list-none">
      {navbarLinks.map(({ href, title }) => (
        <li key={title}>
          <Link
            className={clsx(
              "hover:text-accent active:text-accent focus:outline-none focus:ring-violet-300",
              isPathname(href) &&
                "text-accent flex flex-col items-center justify-center"
            )}
            href={href}
          >
            <p>{title}</p>
            {isPathname(href) && (
              <div className="w-full h-[2px] bg-accent mt-[1px]" />
            )}
          </Link>
        </li>
      ))}
    </nav>
  );
};

export default NavLinks;
