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
  "/lunch": {
    en: "/lunch",
    sv: "/lunch",
  },
} satisfies Pathnames<typeof locales>;

export const localePrefix = "always";

export type AppPathnames = keyof typeof pathnames;
