import { getRequestConfig } from 'next-intl/server';
import { locales } from './config';

export default getRequestConfig(async ({ locale }) => ({
  messages: (
    await (locales.includes(locale as 'sv' | 'en')
      ? import(`../messages/${locale}.json`)
      : import('../messages/sv.json'))
  ).default,
}));
