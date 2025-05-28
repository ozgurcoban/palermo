import { useLocale } from "next-intl";
import { Pathnames } from "next-intl/navigation";

export const locales = ["sv", "en"] as const;

export const useGetLocale = () => {
  const locale = useLocale();

  return locale as "en" | "sv";
};

export const pathnames = {
  "/studio": "/studio",
  "/": "/",
  "/menu": {
    en: "/menu",
    sv: "/meny",
  },
  "/about": {
    en: "/about",
    sv: "/om-oss",
  },
  "/lunch": {
    en: "/lunch",
    sv: "/lunch",
  },
  "/news": {
    en: "/news",
    sv: "/nyheter",
  },
  "/news/[...id]": {
    en: "/news/[...id]",
    sv: "/nyheter/[...id]",
  },
} satisfies Pathnames<typeof locales>;

export const localePrefix = "as-needed";

export type AppPathnames = keyof typeof pathnames;
