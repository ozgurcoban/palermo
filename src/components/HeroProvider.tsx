import { NextIntlClientProvider, useMessages } from 'next-intl';
import Hero from './Hero';
import { locales } from '@/config';

export default function HeroProvider() {
  const locale = locales.map(cur => cur);
  const messages = useMessages();
  return (
    <NextIntlClientProvider locale={locale.join(',')} messages={messages}>
      <Hero />
    </NextIntlClientProvider>
  );
}
