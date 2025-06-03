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
        
        // Debug logging disabled - uncomment for troubleshooting
        // if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
        //   console.info('[GA] Consent data:', consentData);
        //   console.info('[GA] Analytics enabled:', analyticsEnabled);
        // }
        
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
      
      // Debug logging disabled - uncomment for troubleshooting
      // if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      //   console.info('[GA] Tracking pageview:', url);
      //   console.info('[GA] gtag function exists:', typeof window.gtag === 'function');
      //   console.info('[GA] GA ID:', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
      // }
      
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
  
  // Hardcoded fallback for debugging - REMOVE THIS IN PRODUCTION
  // const GA_ID_FALLBACK = 'G-QJK285TFJ0';
  
  // Debug logging disabled - uncomment for troubleshooting
  // if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  //   console.info('[GA] Environment check:', {
  //     GA_ID: GA_ID || 'NOT_FOUND',
  //     NODE_ENV: process.env.NODE_ENV,
  //     shouldLoadGA,
  //     hasWindow: typeof window !== 'undefined',
  //     protocol: window.location.protocol,
  //     hostname: window.location.hostname
  //   });
  // }
  
  if (!GA_ID) {
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      console.warn('[GA] No GA measurement ID found - check Vercel environment variables');
    }
    return null;
  }

  // Only load if consent is given
  if (!shouldLoadGA) {
    // Debug logging disabled
    // if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    //   console.info('[GA] Not loading - consent not given');
    // }
    return null;
  }
  
  // Debug logging disabled
  // if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
  //   console.info('[GA] Loading Google Analytics with ID:', GA_ID);
  // }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        onLoad={() => {
          // Debug logging disabled
          // if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
          //   console.info('[GA] Google Analytics script loaded successfully');
          // }
        }}
        onError={(e) => {
          console.error('[GA] Failed to load Google Analytics:', e);
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        onReady={() => {
          // Debug logging disabled
          // if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
          //   console.info('[GA] Google Analytics initialized, gtag available:', typeof window.gtag !== 'undefined');
          // }
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
            
            // Debug logging disabled - uncomment for troubleshooting
            // if ('${process.env.NODE_ENV}' === 'production') {
            //   console.info('[GA] gtag initialized with ID:', '${GA_ID}');
            //   console.info('[GA] Consent set to granted');
            // }
            
            // Test function for debugging - uncomment console logs if needed
            window.testGA = function() {
              // console.info('[GA Test] Testing Google Analytics...');
              // console.info('[GA Test] gtag exists:', typeof gtag === 'function');
              // console.info('[GA Test] dataLayer:', window.dataLayer);
              
              // Send test event
              gtag('event', 'test_event', {
                event_category: 'engagement',
                event_label: 'test',
                value: 1
              });
              
              // console.info('[GA Test] Test event sent!');
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