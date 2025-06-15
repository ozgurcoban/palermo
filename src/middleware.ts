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
  
  // Platform detection for robots control
  const hostname = request.headers.get('host') || '';
  
  // Netlify domains are ALWAYS noindex (used as preview)
  const isNetlifyDomain = 
    hostname.includes('netlify.app') || 
    hostname.includes('netlify.com');
  
  // Only Vercel production with correct domain should be indexed
  const isVercelProduction = 
    (hostname === 'palermo-uppsala.se' || 
     hostname === 'www.palermo-uppsala.se') &&
    !isNetlifyDomain;
  
  // Set noindex for everything except Vercel production
  if (!isVercelProduction) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
    // Also set cache control to prevent caching of preview builds
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|studio).*)',
  ],
};
