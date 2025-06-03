"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

function GoogleAnalyticsScript() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [shouldLoadGA, setShouldLoadGA] = useState(false);

  // Check initial consent and listen for updates
  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem("cookie-consent");
      if (consent) {
        const consentData = JSON.parse(consent);
        setShouldLoadGA(consentData.analytics === true);
        
        // Update gtag consent if GA is already loaded
        if (window.gtag) {
          window.gtag('consent', 'update', {
            analytics_storage: consentData.analytics ? 'granted' : 'denied'
          });
        }
      } else {
        setShouldLoadGA(false);
      }
    };

    // Check initial consent
    checkConsent();

    // Listen for consent updates
    const handleConsentUpdate = () => checkConsent();
    window.addEventListener('cookie-consent-updated', handleConsentUpdate);
    window.addEventListener('storage', handleConsentUpdate);

    return () => {
      window.removeEventListener('cookie-consent-updated', handleConsentUpdate);
      window.removeEventListener('storage', handleConsentUpdate);
    };
  }, []);

  // Track page views when pathname changes
  useEffect(() => {
    if (pathname && window.gtag && shouldLoadGA) {
      const url =
        pathname +
        (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, shouldLoadGA]);


  // Check if GA ID is set
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    return null;
  }

  // Only load if consent is given
  if (!shouldLoadGA) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
              analytics_storage: 'granted'
            });
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

export function GoogleAnalytics() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsScript />
    </Suspense>
  );
}