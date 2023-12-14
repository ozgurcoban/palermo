import { Pathnames } from 'next-intl/navigation';

export const locales = ['sv', 'en'] as const;

export const pathnames = {
  '/': '/',
  '/om-oss': {
    en: '/about-us',
    sv: '/om-oss',
  },
} satisfies Pathnames<typeof locales>;

export const localePrefix = 'as-needed';

export type AppPathnames = keyof typeof pathnames;
