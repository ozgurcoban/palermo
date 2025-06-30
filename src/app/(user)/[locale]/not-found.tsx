import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FadeUp from "@/components/ui/FadeUp";
import { Home, Pizza, Coffee, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { NotFoundClient } from "@/components/NotFoundClient";

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

export default async function NotFoundPage() {
  const t = await getTranslations("NotFoundPage");

  return (
    <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-2xl border-2 border-accent/30 bg-card/50 backdrop-blur-sm">
        <CardContent className="space-y-8 p-8 text-center sm:p-12">
          {/* 404 Error Code with Pizza */}
          <FadeUp>
            <div className="relative inline-block">
              <h1 className="select-none font-graduate text-[100px] font-bold leading-none text-muted-foreground/30 sm:text-[140px]">
                404
              </h1>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <Pizza className="h-16 w-16 animate-pulse text-accent sm:h-24 sm:w-24" />
                  <div className="absolute -right-2 -top-2 flex h-6 w-6 animate-bounce items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
                    !
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Header */}
          <FadeUp delay={0.1}>
            <h2 className="font-recoleta text-3xl text-foreground sm:text-4xl">
              {t("title")}
            </h2>
          </FadeUp>

          {/* Description */}
          <FadeUp delay={0.2}>
            <p className="mx-auto max-w-md text-lg text-muted-foreground">
              {t("description")}
            </p>
          </FadeUp>

          {/* Pizza joke badge */}
          <FadeUp delay={0.3}>
            <Badge
              variant="secondary"
              className="text-accent-foreground border-accent/30 bg-accent/10 px-4 py-2"
            >
              <Coffee className="mr-2 inline h-4 w-4" />
              {t("joke")}
            </Badge>
          </FadeUp>

          <Separator className="my-8" />

          {/* Action Buttons */}
          <FadeUp delay={0.4}>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <NotFoundClient goBackText={t("goBack")}/>

              <Link href="/">
                <Button
                  size="lg"
                  className="group bg-accent hover:bg-accent/90"
                >
                  <Home className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  {t("goHome")}
                </Button>
              </Link>

              <Link href="/menu">
                <Button variant="outline" size="lg" className="group border-2">
                  <Pizza className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                  {t("viewMenu")}
                </Button>
              </Link>
            </div>
          </FadeUp>

          {/* Quick Links */}
          <FadeUp delay={0.5}>
            <div className="mt-8 space-y-4 border-t border-border pt-8">
              <p className="text-sm text-muted-foreground">
                {t("quickLinks")}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/lunch">
                  <Badge
                    variant="outline"
                    className="cursor-pointer transition-colors hover:bg-accent/10"
                  >
                    <Clock className="mr-1 h-3 w-3" />
                    {t("lunch")}
                  </Badge>
                </Link>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Sysslomansgatan+7%2C+Uppsala"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Badge
                    variant="outline"
                    className="cursor-pointer transition-colors hover:bg-accent/10"
                  >
                    <MapPin className="mr-1 h-3 w-3" />
                    {t("location")}
                  </Badge>
                </a>
              </div>
            </div>
          </FadeUp>
        </CardContent>
      </Card>
    </main>
  );
}
