"use client";
import { Link } from "@/navigation";
import { usePathname } from "@/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <nav className="hidden list-none gap-10 whitespace-nowrap font-lato text-base uppercase md:flex">
      {navbarLinks.map(({ href, title }) => (
        <li key={title} className="relative">
          <Link
            className={cn(
              "group relative flex flex-col items-center justify-center transition-colors duration-200",
              "text-foreground/80 hover:text-foreground",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-0",
              isPathname(href) && "text-foreground"
            )}
            href={href}
          >
            <span className="relative py-2">
              {title}
              {/* Combined hover and active underline */}
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-foreground/20"
                initial={false}
                animate={{
                  width: isPathname(href) ? "100%" : "0%",
                  backgroundColor: isPathname(href) 
                    ? "hsl(var(--foreground))" 
                    : "hsl(var(--foreground) / 0.2)",
                }}
                whileHover={{
                  width: "100%",
                  backgroundColor: isPathname(href) 
                    ? "hsl(var(--foreground))" 
                    : "hsl(var(--foreground) / 0.5)",
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
            </span>
          </Link>
        </li>
      ))}
    </nav>
  );
};

export default NavLinks;
