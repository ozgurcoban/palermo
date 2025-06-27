"use client";

import Script from "next/script";
import { Suspense } from "react";
import { useConsent } from "@/providers/ConsentProvider";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    testGA?: () => void;
  }
}

function GoogleAnalyticsScript() {
  const { consent } = useConsent();
  const shouldLoadGA = consent.analytics === true;

  // GA4 automatically tracks page views through the config command
  // No need for manual page_view tracking which causes double counting


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
          console.log('[GA] Google Analytics script loaded successfully');
        }}
        onError={(e) => {
          console.error('[GA] Failed to load Google Analytics:', e);
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        onReady={() => {
          console.log('[GA] Google Analytics initialized successfully');
        }}
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Set default consent state to denied for all regions
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'wait_for_update': 500 // Wait up to 500ms for consent update
            });
            
            // Since this script only loads when analytics consent is true,
            // immediately update to granted
            gtag('consent', 'update', {
              'analytics_storage': 'granted'
            });
            
            console.log('[GA] Configuring GA with automatic page view tracking and consent mode');
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true // Extra privacy protection
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