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
        <p className="title-secondary !normal-case text-gray-200 max-w-md text-justify !font-normal">
          {t(`${text}.sentenceBefore`)}
          <u className="underline-offset-8">{t(`${text}.underline`)}</u>
          {t(`${text}.sentenceAfter`)}
        </p>
      </>
    );
  }
  return <>{t(text)}</>;
}
