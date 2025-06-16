"use client";

import { useLocale, useTranslations } from "next-intl";
import { locales } from "@/config";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname } from "@/navigation";
import { event } from "@/lib/gtag";
import { setLanguageSwitchFlag } from "@/lib/cookie-utils";

const languageNames: Record<string, string> = {
  sv: "Svenska",
  en: "English"
};

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(nextLocale: string) {
    // Smooth scroll to top before language change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Set flag to disable animations
    setLanguageSwitchFlag();
    
    // Add no-animations class immediately
    document.documentElement.classList.add("no-animations");
    
    // Track language switch
    event(`lang_${nextLocale}`, {
      event_category: 'Navigation',
      event_label: `${locale} → ${nextLocale}`,
      from_lang: locale,
      to_lang: nextLocale
    });
    
    // Small delay to ensure storage is set before navigation
    setTimeout(() => {
      router.replace(pathname, { locale: nextLocale });
    }, 10);
  }

  return (
    <Select value={locale} onValueChange={onSelectChange}>
      <SelectTrigger className="w-max bg-transparent text-primary" aria-label={t("label")}>
        <SelectValue>
          {languageNames[locale] || locale}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {locales.map((cur) => (
            <SelectItem
              className="hover:text-white focus:text-white"
              key={cur}
              value={cur}
            >
              {languageNames[cur] || cur}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
