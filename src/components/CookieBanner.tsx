"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CookieIcon, ShieldCheckIcon, SettingsIcon, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
}

export function CookieBanner() {
  const t = useTranslations("Cookies");
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
      // Show banner after hero animation completes
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    setIsAccepting(true);
    const allAccepted = {
      necessary: true,
      analytics: true,
      timestamp: Date.now(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));

    if (
      process.env.NODE_ENV === "production" &&
      typeof window !== "undefined"
    ) {
      console.log("[CookieBanner] All cookies accepted:", allAccepted);
    }

    // Small delay for smooth animation
    setTimeout(() => {
      setIsVisible(false);
      setIsAccepting(false);
    }, 300);

    // Trigger analytics loading dynamically
    window.dispatchEvent(new Event("cookie-consent-updated"));
  };

  const acceptSelected = () => {
    const selectedPreferences = {
      ...preferences,
      timestamp: Date.now(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(selectedPreferences));
    setShowSettings(false);

    if (
      process.env.NODE_ENV === "production" &&
      typeof window !== "undefined"
    ) {
      console.log(
        "[CookieBanner] Selected preferences saved:",
        selectedPreferences,
      );
    }

    // Small delay for smooth animation
    setTimeout(() => {
      setIsVisible(false);
    }, 100);

    // Trigger analytics loading dynamically
    window.dispatchEvent(new Event("cookie-consent-updated"));
  };

  const rejectAll = () => {
    const rejected = {
      necessary: true,
      analytics: false,
      timestamp: Date.now(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(rejected));

    // Small delay for smooth animation
    setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <Card className="mx-auto max-w-4xl border-0 bg-white/95 shadow-2xl backdrop-blur-md">
            <CardContent className="p-4 md:p-6">
              <div className="flex gap-4 flex-col md:flex-row md:gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <CookieIcon className="h-5 w-5 text-accent" />
                    <Badge variant="secondary" className="font-medium">
                      {t("banner.badge", { defaultValue: "🍪 Cookies" })}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-recoleta text-lg font-semibold text-primary">
                      {t("banner.title", {
                        defaultValue:
                          "Vi använder cookies för bästa upplevelse",
                      })}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t("banner.description", {
                        defaultValue:
                          "Vi använder cookies för att förbättra din upplevelse och analysera trafik för att förbättra vår webbplats. Du kan välja vilka cookies du accepterar.",
                      })}
                    </p>
                  </div>
                </div>

                <Separator
                  orientation="vertical"
                  className="hidden h-20 md:block"
                />
                <Separator className="md:hidden" />

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                      onClick={acceptAll}
                      disabled={isAccepting}
                      className="text-accent-foreground flex-1 bg-secondary font-medium transition-all hover:bg-accent/90"
                    >
                      <AnimatePresence mode="wait">
                        {isAccepting ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2"
                          >
                            <Check className="h-4 w-4" />
                            <span>
                              {t("banner.accepted", {
                                defaultValue: "Accepterat!",
                              })}
                            </span>
                          </motion.div>
                        ) : (
                          <motion.span
                            key="text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {t("banner.acceptAll", {
                              defaultValue: "Acceptera alla",
                            })}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>

                    <Dialog open={showSettings} onOpenChange={setShowSettings}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 border-secondary/30 hover:bg-accent/5"
                        >
                          <SettingsIcon className="mr-2 h-4 w-4" />
                          {t("banner.settings", {
                            defaultValue: "Inställningar",
                          })}
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2 font-recoleta">
                            <ShieldCheckIcon className="h-5 w-5 text-accent" />
                            {t("settings.title", {
                              defaultValue: "Cookie-inställningar",
                            })}
                          </DialogTitle>
                          <DialogDescription className="text-sm">
                            {t("settings.description", {
                              defaultValue:
                                "Välj vilka cookies du vill acceptera. Nödvändiga cookies krävs för webbplatsens funktion och analys-cookies hjälper oss förbättra webbplatsen.",
                            })}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <Label className="font-medium">
                                {t("settings.necessary", {
                                  defaultValue: "Nödvändiga",
                                })}
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                {t("settings.necessaryDesc", {
                                  defaultValue:
                                    "Krävs för webbplatsens grundläggande funktioner",
                                })}
                              </p>
                            </div>
                            <Switch checked={true} disabled />
                          </div>

                          <Separator />

                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <Label className="font-medium">
                                {t("settings.analytics", {
                                  defaultValue: "Analys",
                                })}
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                {t("settings.analyticsDesc", {
                                  defaultValue:
                                    "Hjälper oss förstå hur du använder webbplatsen",
                                })}
                              </p>
                            </div>
                            <Switch
                              checked={preferences.analytics}
                              onCheckedChange={(checked) =>
                                setPreferences({
                                  ...preferences,
                                  analytics: checked,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setShowSettings(false)}
                            className="flex-1"
                          >
                            {t("settings.cancel", { defaultValue: "Avbryt" })}
                          </Button>
                          <Button
                            onClick={acceptSelected}
                            className="flex-1 bg-secondary hover:bg-accent/90"
                          >
                            {t("settings.save", { defaultValue: "Spara" })}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={rejectAll}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    {t("banner.rejectAll", { defaultValue: "Avvisa alla" })}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
