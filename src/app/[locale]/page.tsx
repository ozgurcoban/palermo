// import { useTranslations } from 'next-intl';
// import { notFound } from 'next/navigation';
// import { unstable_setRequestLocale } from 'next-intl/server';
// import { locales } from '../../config';

// type Props = {
//   params: { locale: string };
// };

// export default function IndexPage({ params: { locale } }: Props) {
//   const isValidLocale = locales.some(cur => cur === locale);
//   if (!isValidLocale) notFound();

//   const t = useTranslations('Index');

//   unstable_setRequestLocale(locale);
//   return <h1>{t('title')}</h1>;
// }

import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { locales } from '@/config';
import Hero from '@/components/Hero';
import HeroProvider from '@/components/HeroProvider';
import FutureSection from '@/components/FutureSection';

type Props = {
  params: { locale: string };
};

export default function IndexPage({ params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some(cur => cur === locale);
  if (!isValidLocale) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  const t = useTranslations('IndexPage');

  return (
    <>
      <HeroProvider />
      <FutureSection />
    </>
  );
}
