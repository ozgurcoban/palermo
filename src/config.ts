import { Pathnames } from 'next-intl/navigation';

export const locales = ['sv', 'en'] as const;

export const pathnames = {
  '/studio': '/studio',
  '/': '/',
  '/menu': {
    en: '/menu',
    sv: '/meny',
  },
  '/about': {
    en: '/about',
    sv: '/om-oss',
  },
  '/news': {
    en: '/news',
    sv: '/nyheter',
  },
} satisfies Pathnames<typeof locales>;

export const localePrefix = 'as-needed';

export type AppPathnames = keyof typeof pathnames;
