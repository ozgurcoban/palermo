import createMiddleware from 'next-intl/middleware';
import { pathnames, locales, localePrefix } from './config';

import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware({
    defaultLocale: 'sv',
    locales,
    pathnames,
    localePrefix,
  });
  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  matcher: [
    '/', // Required when i18n is enabled, otherwise middleware won't be executed on index route

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(sv|en)/:path*',

    '/((?!api/|_next/|_static/|_vercel|fonts|images/|[\\w-]+\\.\\w+).*)',
  ],
};
