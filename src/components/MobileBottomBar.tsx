"use client";

import { Home, Menu, Utensils } from "lucide-react";
import { usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import { useGetLocale } from "@/config";
import type { AppPathnames } from "@/config";
import { useRouter } from "@/navigation";
import { useState } from "react";
import { event, trackMobileBottomNavClick } from "@/lib/gtag";
import { setLanguageSwitchFlag } from "@/lib/cookie-utils";
import { useIsLanguageSwitching } from "@/components/LanguageSwitchChecker";

const MobileBottomBar = () => {
  const pathname = usePathname();
  const locale = useGetLocale();
  const router = useRouter();
  const t = useTranslations("MobileBottomBar");
  const [isLocalSwitching, setIsLocalSwitching] = useState(false);
  const isLanguageSwitching = useIsLanguageSwitching();

  const navItems = [
    {
      href: "/" as AppPathnames,
      icon: Home,
      label: t("home"),
      isActive: pathname === "/",
    },
    {
      href: "/menu" as AppPathnames,
      icon: Menu,
      label: t("menu"),
      isActive: pathname === "/menu" || pathname.includes("/meny"),
    },
    {
      href: "/lunch" as AppPathnames,
      icon: Utensils,
      label: t("lunch"),
      isActive: pathname === "/lunch",
    },
  ];

  const handleLanguageToggle = async () => {
    if (isLocalSwitching) return;
    
    setIsLocalSwitching(true);
    const nextLocale = locale === "sv" ? "en" : "sv";
    
    // Smooth scroll to top before language change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Set flag to disable animations
    setLanguageSwitchFlag();
    
    // Add no-animations class immediately
    document.documentElement.classList.add("no-animations");
    
    // Track language switch
    event(`mobile_bottom_lang_${nextLocale}`, {
      event_category: 'Navigation',
      event_label: `Bottom Bar: ${locale} → ${nextLocale}`,
      from_lang: locale,
      to_lang: nextLocale
    });
    
    // Small delay to ensure storage is set before navigation
    setTimeout(() => {
      router.replace(pathname, { locale: nextLocale });
    }, 10);
    
    // Reset local state after a short delay
    setTimeout(() => {
      setIsLocalSwitching(false);
    }, 300);
  };

  return (
    <nav
      className={`fixed bottom-4 left-4 right-4 z-50 lg:hidden ${!isLanguageSwitching ? 'bottom-bar-slide-up' : ''}`}
      role="navigation"
      aria-label="Mobile navigation"
    >
      {/* Main bottom bar */}
      <div className="rounded-full border border-white/10 bg-black/50 px-6 py-3 shadow-xl backdrop-blur-[8px]">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.href}
                onClick={() => {
                  if (!item.isActive) {
                    // Track navigation click
                    trackMobileBottomNavClick(item.href, item.label, pathname);
                    
                    // Smooth scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    // Navigate after a short delay
                    setTimeout(() => {
                      router.push(item.href);
                    }, 100);
                  }
                }}
                className={`bottom-nav-item group flex min-h-[60px] min-w-[60px] flex-col items-center justify-center rounded-2xl px-3 py-2 ${
                  item.isActive
                    ? "bg-white/15 text-white scale-105"
                    : "text-white/70 hover:bg-white/8 hover:text-white/90 hover:scale-102"
                }`}
              >
                <IconComponent 
                  size={24} 
                  className={`transition-all duration-300 ${
                    item.isActive ? "mb-1 scale-110" : "mb-1 group-hover:scale-105"
                  }`}
                  strokeWidth={1.5}
                />
                {item.isActive && (
                  <span 
                    className="text-xs font-medium tracking-wide animate-in fade-in duration-200"
                  >
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Discrete language toggle under bar */}
      <div className="flex justify-center mt-2">
        <button
          onClick={handleLanguageToggle}
          aria-label={`Switch to ${locale === "sv" ? "English" : "Svenska"}`}
          className="h-6 w-12 overflow-hidden rounded-full bg-black/40 backdrop-blur-[4px] border border-white/10 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-1 focus:ring-white/20 shadow-md"
          style={{ 
            animationDelay: "0.6s",
            opacity: 0,
            animation: "fadeUp 0.4s ease-out 0.6s forwards"
          }}
        >
          {/* Ripple effect */}
          <span 
            className={`absolute inset-0 rounded-full bg-white/10 transition-all duration-300 ${
              isLocalSwitching ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
            }`}
          />
          
          {/* Language text */}
          <div className="relative h-full w-full flex items-center justify-center">
            <span 
              className={`text-xs font-medium text-white/90 tracking-wider transition-all duration-300 ${
                isLocalSwitching ? 'transform scale-110' : 'transform scale-100'
              }`}
            >
              {locale.toUpperCase()}
            </span>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomBar;
