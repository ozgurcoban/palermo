import { ReactNode } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import Hero from '@/components/Hero';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function IntlProvider({ children, params: { locale } }: Props) {
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Hero />
    </NextIntlClientProvider>
  );
}
