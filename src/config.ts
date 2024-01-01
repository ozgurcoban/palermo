import { Pathnames } from 'next-intl/navigation';

export const locales = ['sv', 'en'] as const;

export const pathnames = {
  '/': '/',
  '/menu': {
    en: '/menu',
    sv: '/meny',
  },
  '/about': {
    en: '/about',
    sv: '/om-oss',
  },
  '/contact': {
    en: '/blog',
    sv: '/blog',
  },
  '/basement': {
    en: '/menu',
    sv: '/meny',
  },
} satisfies Pathnames<typeof locales>;

export const localePrefix = 'as-needed';

export type AppPathnames = keyof typeof pathnames;
