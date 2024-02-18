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
        <p className="title-secondary !normal-case text-gray-200 max-w-[600px] !font-normal">
          {t(`${text}.sentenceBefore`)}
          <u className="underline-offset-8">{t(`${text}.underline`)}</u>
          {t(`${text}.sentenceAfter`)}
        </p>
      </>
    );
  }
  return (
    <h1 className="text-light mt-10 lg:text-[180px] opacity-70 sm:text-[160px] text-[20vw] leading-[85px] sm:leading-[135px] font-lobster break-words">
      {t(text)}
    </h1>
  );
}
