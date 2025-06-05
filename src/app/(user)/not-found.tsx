"use client";

import Error from "next/error";
import { useEffect, useState } from "react";

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default function NotFound() {
  const [locale, setLocale] = useState('sv');
  
  useEffect(() => {
    // Try to detect locale from URL
    const pathname = window.location.pathname;
    if (pathname.startsWith('/en')) {
      setLocale('en');
    }
  }, []);
  
  return (
    <html lang={locale}>
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}
