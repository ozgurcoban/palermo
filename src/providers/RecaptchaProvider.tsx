"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const GoogleReCaptchaProvider = dynamic(
  () => import("react-google-recaptcha-v3").then((mod) => mod.GoogleReCaptchaProvider),
  { 
    ssr: false,
    loading: () => null
  }
);

interface RecaptchaProviderProps {
  children: React.ReactNode;
}

export function RecaptchaProvider({ children }: RecaptchaProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    let loadTimer: NodeJS.Timeout;
    
    // Only set up listeners after a short delay to avoid impacting initial render
    const setupTimer = setTimeout(() => {
      const loadRecaptcha = () => {
        setIsLoaded(true);
        // Remove event listeners after loading
        window.removeEventListener("scroll", loadRecaptcha);
        window.removeEventListener("mousemove", loadRecaptcha);
        window.removeEventListener("touchstart", loadRecaptcha);
        if (loadTimer) clearTimeout(loadTimer);
      };

      // Load on user interaction
      window.addEventListener("scroll", loadRecaptcha, { once: true, passive: true });
      window.addEventListener("mousemove", loadRecaptcha, { once: true, passive: true });
      window.addEventListener("touchstart", loadRecaptcha, { once: true, passive: true });

      // Or load after 5 seconds if no interaction
      loadTimer = setTimeout(loadRecaptcha, 5000);
    }, 100);

    return () => {
      clearTimeout(setupTimer);
      if (loadTimer) clearTimeout(loadTimer);
      window.removeEventListener("scroll", () => {});
      window.removeEventListener("mousemove", () => {});
      window.removeEventListener("touchstart", () => {});
    };
  }, []);

  if (!siteKey) {
    console.warn("reCAPTCHA site key not found");
    return <>{children}</>;
  }

  if (!isLoaded) {
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