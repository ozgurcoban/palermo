"use client";
import { useTranslations } from "next-intl";

interface LocalizationProps {
  text: string;
  rich?: boolean;
}

export default function Localization({ text, rich }: LocalizationProps) {
  const t = useTranslations();
  if (rich) {
    return (
      <>
        <p className="title-secondary max-w-xl text-justify !font-normal !normal-case text-gray-200">
          {t(`${text}.sentenceBefore`)}
          <u className="underline-offset-8">{t(`${text}.underline`)}</u>
          {t(`${text}.sentenceAfter`)}
        </p>
      </>
    );
  }
  return <>{t(text)}</>;
}
