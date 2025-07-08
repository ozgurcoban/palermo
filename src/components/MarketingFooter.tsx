"use client";

import { useTranslations } from "next-intl";
import { event } from "@/lib/gtag";

const AnpassadWebbLogo = () => {
  return (
    <svg
      viewBox="0 0 70 60"
      className="h-5 w-5 opacity-60 transition-all duration-300 group-hover:opacity-100"
    >
      <defs>
        <linearGradient id="logoGradientPro" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        
        <linearGradient id="logoGradientHover" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        
        <filter id="subtleShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1"/>
        </filter>
      </defs>
      
      <path
        d="
          M 5 50
          L 20 10
          L 35 50
          M 11 35
          L 29 35
          M 20 10
          L 35 50
          L 45 20
          L 55 50
          L 66 20
        "
        stroke="url(#logoGradientPro)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-300"
      />
    </svg>
  );
};

export default function MarketingFooter() {
  const t = useTranslations();

  const handleClick = () => {
    event("click_outbound", {
      link_id: "marketing_footer_anpassad_webb",
      link_text: "Anpassad Webb",
      link_url: "https://anpassadwebb.se/?utm_source=palermo&utm_medium=referral&utm_campaign=footer",
      link_classes: "marketing_footer",
      outbound: true,
      custom_parameter: {
        location: "footer",
        purpose: "marketing",
      },
    });
  };

  return (
    <div className="border-t border-border/50 bg-muted/30 pb-32 dark:bg-background/50 md:pb-0">
      <a
        href="https://anpassadwebb.se/?utm_source=palermo&utm_medium=referral&utm_campaign=footer"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="group block py-3 transition-all duration-300 hover:bg-muted/50 dark:hover:bg-muted/20"
      >
        <div className="container">
          <div className="flex items-center justify-center gap-3 text-center">
            {/* Logo - smaller and more subtle */}
            <AnpassadWebbLogo />
            
            {/* Marketing Text - single line, smaller */}
            <p className="text-xs text-muted-foreground/70">
              {t("MarketingFooter.title")}{" "}
              <span className="hidden sm:inline">{t("MarketingFooter.description")}</span>{" "}
              <span className="text-muted-foreground underline-offset-4 group-hover:underline">
                {t("MarketingFooter.cta")} →
              </span>
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}