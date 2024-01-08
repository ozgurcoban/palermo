"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

type NavLinks = {
  navbarLinks: {
    title: string;
    href: string;
  }[];
};

const NavLinks = ({ navbarLinks }: NavLinks) => {
  const pathname = usePathname();

  const isPathname = (href: string) => {
    const path = pathname.slice(3);
    return href === "/" && path === "" ? true : path === href;
  };

  return (
    <nav className="gap-16 uppercase font-teko text-xl whitespace-nowrap hidden md:flex list-none">
      {navbarLinks.map(({ href, title }) => (
        <li key={title}>
          <Link
            className={clsx(
              "hover:text-accent active:text-accent focus:outline-none focus:underline focus:ring-violet-300",
              isPathname(href) && "text-accent underline"
            )}
            href={href}
          >
            {title}
          </Link>
        </li>
      ))}
    </nav>
  );
};

export default NavLinks;
