"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CookieIcon, ShieldCheckIcon, SettingsIcon, Check } from "lucide-react";
import { useTranslations } from "next-intl";
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
import { useConsent } from "@/providers/ConsentProvider";
import { trackCookieConsent, trackCookieSettingsOpen } from "@/lib/gtag";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
}

export function CookieBanner() {
  const t = useTranslations("Cookies");
  const { consent, acceptAll: acceptAllConsent, rejectAll: rejectAllConsent, updateConsent, hasConsented } = useConsent();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: consent.analytics,
  });

  useEffect(() => {
    // Update preferences when consent changes
    setPreferences({
      necessary: true,
      analytics: consent.analytics,
    });
  }, [consent]);

  useEffect(() => {
    // Check if user has already made a choice
    if (!hasConsented) {
      // Show banner after hero animation completes
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [hasConsented]);

  const acceptAll = () => {
    setIsAccepting(true);
    acceptAllConsent();
    trackCookieConsent("accept_all");

    // Small delay for smooth animation
    setTimeout(() => {
      setIsVisible(false);
      setIsAccepting(false);
    }, 300);
  };

  const acceptSelected = () => {
    updateConsent(preferences);
    trackCookieConsent("accept_selected", preferences.analytics);
    setShowSettings(false);

    // Small delay for smooth animation
    setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  const rejectAll = () => {
    rejectAllConsent();
    trackCookieConsent("reject_all");

    // Small delay for smooth animation
    setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  return (
    <>
      {isVisible && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 ${isVisible ? 'animate-slideUpFade' : 'animate-slideDownFade'}`}
        >
          <Card className="mx-auto max-w-4xl border-2 border-amber-200 bg-amber-50 shadow-2xl backdrop-blur-md dark:border-accent/30 dark:bg-background">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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

                <div className="flex flex-col gap-3 md:min-w-[300px]">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                      onClick={acceptAll}
                      disabled={isAccepting}
                      className="text-accent-foreground flex-1 bg-accent font-medium transition-all hover:bg-accent/90"
                    >
                      {isAccepting ? (
                        <div className="flex items-center gap-2 animate-scaleIn">
                          <Check className="h-4 w-4" />
                          <span>
                            {t("banner.accepted", {
                              defaultValue: "Accepterat!",
                            })}
                          </span>
                        </div>
                      ) : (
                        <span className="animate-fadeIn">
                          {t("banner.acceptAll", {
                            defaultValue: "Acceptera alla",
                          })}
                        </span>
                      )}
                    </Button>

                    <Dialog open={showSettings} onOpenChange={setShowSettings}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 border-accent/30 hover:bg-accent/5"
                          onClick={() => trackCookieSettingsOpen()}
                        >
                          <SettingsIcon className="mr-2 h-4 w-4" />
                          {t("banner.settings", {
                            defaultValue: "Inställningar",
                          })}
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="mx-auto w-[calc(100vw-2rem)] max-w-md">
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
                            className="flex-1 bg-accent hover:bg-accent/90"
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
        </div>
      )}
    </>
  );
}
