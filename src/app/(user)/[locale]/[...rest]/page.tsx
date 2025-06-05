import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { locales } from '@/config';

type Props = {
  params: {
    locale: string;
    rest: string[];
  };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale, rest: [] }));
}

export default function CatchAllPage({ params: { locale } }: Props) {
  // Ensure the locale is properly set before calling notFound
  if (locales.includes(locale as any)) {
    unstable_setRequestLocale(locale);
  }
  
  notFound();
}
