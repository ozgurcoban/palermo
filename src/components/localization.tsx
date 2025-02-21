"use client";
import { useTranslations } from "next-intl";

interface LocalizationProps {
  text: string;
  rich?: boolean;
  className?: string;
}

export default function Localization({
  text,
  rich,
  className,
}: LocalizationProps) {
  const t = useTranslations();
  if (rich) {
    return (
      <>
        <p className={`${className} max-w-xl`}>
          {t(`${text}.sentenceBefore`)}
          <u className="underline-offset-8">{t(`${text}.underline`)}</u>
          {t(`${text}.sentenceAfter`)}
        </p>
      </>
    );
  }
  return <>{t(text)}</>;
}
