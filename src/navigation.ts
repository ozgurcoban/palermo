// import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
// import { locales, pathnames, localePrefix } from './config';

// export const { Link, redirect, usePathname, useRouter } =
//   createLocalizedPathnamesNavigation({
//     locales,
//     pathnames,
//     localePrefix,
//   });

import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { locales, pathnames, localePrefix } from './config';

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix,
  });
