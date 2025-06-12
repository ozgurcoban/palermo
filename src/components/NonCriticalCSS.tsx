"use client";

import Script from "next/script";

export function NonCriticalCSS() {
  return (
    <Script
      id="load-non-critical-css"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/non-critical.css';
          document.head.appendChild(link);
        `,
      }}
    />
  );
}