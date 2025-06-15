import React from "react";
import { SlashIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PriceLabelsHeaderProps {
  shouldShowTakeawayLabels: boolean;
  shouldShowGlassLabels: boolean;
}

export const PriceLabelsHeader: React.FC<PriceLabelsHeaderProps> = ({
  shouldShowTakeawayLabels,
  shouldShowGlassLabels,
}) => {
  const t = useTranslations("Home.Menu");

  return (
    <>
      {shouldShowTakeawayLabels && (
        <div className="sticky top-0 z-10 mx-auto flex max-w-md items-center bg-white dark:bg-card">
          <p className="sticky top-0 w-full whitespace-nowrap text-right font-medium text-primary">
            {t("dineIn")}
          </p>
          <SlashIcon className="h-6 text-primary" />
          {t("takeAway.full") ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="whitespace-nowrap font-medium text-primary">
                    <span aria-label={t("takeAway.full")}>
                      {t("takeAway.short")}
                    </span>
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <span>{t("takeAway.full")}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <p className="whitespace-nowrap font-medium text-primary">
              {t("takeAway.short")}
            </p>
          )}
        </div>
      )}

      {shouldShowGlassLabels && (
        <div className="sticky top-0 z-10 mx-auto flex max-w-md items-center bg-white dark:bg-card">
          <TooltipProvider>
            <Tooltip>
              <div className="relative z-50 flex w-full justify-end">
                <TooltipTrigger asChild>
                  <p className="whitespace-nowrap font-medium text-primary">
                    <span aria-label={t("glass.full")}>
                      {t("glass.short")}
                    </span>
                  </p>
                </TooltipTrigger>
              </div>
              <TooltipContent>
                <span>{t("glass.full")}</span>
              </TooltipContent>
            </Tooltip>
            <SlashIcon className="h-6 text-primary" />
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="whitespace-nowrap font-medium text-primary">
                  <span aria-label={t("bottle.full")}>
                    {t("bottle.short")}
                  </span>
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <span>{t("bottle.full")}</span>
              </TooltipContent>
            </Tooltip>
            <SlashIcon className="h-6 text-primary" />
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="whitespace-nowrap font-medium text-primary">
                  <span aria-label={t("carafe.full")}>
                    {t("carafe.short")}
                  </span>
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <span>{t("carafe.full")}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      
      {(shouldShowTakeawayLabels || shouldShowGlassLabels) && <hr className="mt-4" />}
    </>
  );
};