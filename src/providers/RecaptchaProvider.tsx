"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

interface RecaptchaProviderProps {
  children: React.ReactNode;
}

export function RecaptchaProvider({ children }: RecaptchaProviderProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const isDev = process.env.NODE_ENV === 'development';
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  // Skip reCAPTCHA in development or localhost
  if (isDev || isLocalhost) {
    return <>{children}</>;
  }

  if (!siteKey) {
    console.warn("reCAPTCHA site key not found");
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      language="sv"
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}