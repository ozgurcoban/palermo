"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FadeUp from "@/components/ui/FadeUp";
import { Home, Pizza, Coffee, ArrowLeft, MapPin, Clock } from "lucide-react";
import { useGetLocale } from "@/config";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");
  const locale = useGetLocale();
  const router = useRouter();

  return (
    <main className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-16">
      <Card className="max-w-2xl w-full border-2 border-accent/30 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-8 sm:p-12 text-center space-y-8">
          {/* 404 Error Code with Pizza */}
          <FadeUp>
            <div className="relative inline-block">
              <h1 className="text-[100px] sm:text-[140px] font-graduate font-bold text-muted-foreground/30 leading-none select-none">
                404
              </h1>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <Pizza className="w-16 h-16 sm:w-24 sm:h-24 text-accent animate-pulse" />
                  <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-bounce">
                    !
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Header */}
          <FadeUp delay={0.1}>
            <h2 className="font-recoleta text-3xl sm:text-4xl text-foreground">
              {t("title", { defaultValue: "Oj! Den pizzan finns inte på menyn" })}
            </h2>
          </FadeUp>

          {/* Description */}
          <FadeUp delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              {t("description", { 
                defaultValue: "Antingen har du beställt något vi inte har, eller så har du hamnat på fel ställe. Oroa dig inte, vi har gott om andra alternativ!" 
              })}
            </p>
          </FadeUp>

          {/* Pizza joke badge */}
          <FadeUp delay={0.3}>
            <Badge variant="secondary" className="px-4 py-2 bg-accent/10 text-accent-foreground border-accent/30">
              <Coffee className="w-4 h-4 mr-2 inline" />
              {t("joke", { defaultValue: "Ta en kaffe medan du funderar på vart du skulle" })}
            </Badge>
          </FadeUp>

          <Separator className="my-8" />

          {/* Action Buttons */}
          <FadeUp delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => router.back()}
                variant="outline"
                size="lg"
                className="group border-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                {t("goBack", { defaultValue: "Gå tillbaka" })}
              </Button>
              
              <Link href="/">
                <Button size="lg" className="group bg-accent hover:bg-accent/90">
                  <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  {t("goHome", { defaultValue: "Till startsidan" })}
                </Button>
              </Link>

              <Link href="/menu">
                <Button variant="outline" size="lg" className="group border-2">
                  <Pizza className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  {t("viewMenu", { defaultValue: "Se menyn" })}
                </Button>
              </Link>
            </div>
          </FadeUp>

          {/* Quick Links */}
          <FadeUp delay={0.5}>
            <div className="mt-8 pt-8 border-t border-border space-y-4">
              <p className="text-sm text-muted-foreground">
                {t("quickLinks", { defaultValue: "Eller kolla in:" })}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/lunch">
                  <Badge variant="outline" className="cursor-pointer hover:bg-accent/10 transition-colors">
                    <Clock className="w-3 h-3 mr-1" />
                    {t("lunch", { defaultValue: "Dagens lunch" })}
                  </Badge>
                </Link>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent/10 transition-colors">
                  <MapPin className="w-3 h-3 mr-1" />
                  {t("location", { defaultValue: "Fyristorg 8, Uppsala" })}
                </Badge>
              </div>
            </div>
          </FadeUp>
        </CardContent>
      </Card>
    </main>
  );
}
