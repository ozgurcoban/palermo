"use client";

import Script from "next/script";
import { Suspense } from "react";
import { useConsent } from "@/providers/ConsentProvider";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    testGA?: () => string;
    gaStatus?: () => {
      gaId: string;
      gtagAvailable: boolean;
      consentGiven: boolean;
      debugMode: boolean;
    };
  }
}

function GoogleAnalyticsScript() {
  const { consent, isLoading } = useConsent();
  const shouldLoadGA = consent.analytics === true;

  // GA4 automatically tracks page views through the config command
  // No need for manual page_view tracking which causes double counting


  // Check if GA ID is set
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  if (!GA_ID) {
    if (typeof window !== 'undefined') {
      console.error('[GA] CRITICAL: No GA measurement ID found!');
      console.error('[GA] Make sure NEXT_PUBLIC_GA_MEASUREMENT_ID is set in Vercel environment variables');
      console.error('[GA] Current environment:', process.env.NODE_ENV);
      console.error('[GA] Vercel environment:', process.env.VERCEL_ENV || 'not set');
    }
    return null;
  }
  
  // Validate GA ID format
  if (!GA_ID.match(/^G-[A-Z0-9]+$/)) {
    console.error('[GA] Invalid GA measurement ID format:', GA_ID);
    console.error('[GA] Expected format: G-XXXXXXXXXX');
    return null;
  }

  // Wait for consent to be loaded before making any decisions
  if (isLoading) {
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
          // Script loaded successfully
        }}
        onError={(e) => {
          console.error('[GA] Failed to load Google Analytics:', e);
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        onReady={() => {
          // GA initialized
        }}
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Since this script only loads when analytics consent is already true,
            // we can directly set consent to granted
            gtag('consent', 'default', {
              'analytics_storage': 'granted',
              'ad_storage': 'denied'
            });
            
            // Configure GA with measurement ID
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true, // Extra privacy protection
              debug_mode: window.location.search.includes('ga_debug=true')
            });
            
            // Test function for debugging
            window.testGA = function() {
              console.info('[GA] Sending test event...');
              gtag('event', 'test_event', {
                event_category: 'engagement',
                event_label: 'test',
                value: 1
              });
              return 'Test event sent! Check GA Real-Time reports.';
            };
            
            // GA status function
            window.gaStatus = function() {
              const consent = localStorage.getItem('cookie-consent');
              const consentData = consent ? JSON.parse(consent) : null;
              
              console.info('=== Google Analytics Status ===');
              console.info('GA ID:', '${GA_ID}');
              console.info('gtag available:', typeof window.gtag !== 'undefined');
              console.info('dataLayer:', window.dataLayer);
              console.info('Consent stored:', consentData);
              console.info('Analytics consent:', consentData?.analytics || false);
              console.info('Debug mode:', window.location.search.includes('ga_debug=true'));
              console.info('==============================');
              
              return {
                gaId: '${GA_ID}',
                gtagAvailable: typeof window.gtag !== 'undefined',
                consentGiven: consentData?.analytics || false,
                debugMode: window.location.search.includes('ga_debug=true')
              };
            };
            
            // GA initialization complete
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