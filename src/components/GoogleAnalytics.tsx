"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    testGA?: () => void;
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
        const analyticsEnabled = consentData.analytics === true;
        setShouldLoadGA(analyticsEnabled);
        
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
      
      // Send page view event
      window.gtag("event", "page_view", {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title
      });
    }
  }, [pathname, searchParams, shouldLoadGA]);


  // Check if GA ID is set
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  if (!GA_ID) {
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      console.warn('[GA] No GA measurement ID found - check Vercel environment variables');
    }
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
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        onLoad={() => {
        }}
        onError={(e) => {
          console.error('[GA] Failed to load Google Analytics:', e);
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        onReady={() => {
        }}
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Check current consent status
            const consent = localStorage.getItem("cookie-consent");
            const analyticsConsent = consent ? JSON.parse(consent).analytics : false;
            
            gtag('consent', 'default', {
              analytics_storage: analyticsConsent ? 'granted' : 'denied'
            });
            
            // Update consent to granted since this script only loads when consent is given
            gtag('consent', 'update', {
              analytics_storage: 'granted'
            });
            
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
            
            // Test function for debugging
            window.testGA = function() {
              gtag('event', 'test_event', {
                event_category: 'engagement',
                event_label: 'test',
                value: 1
              });
              return 'Test event sent! Check GA Real-Time reports.';
            };
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