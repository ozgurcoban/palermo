import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` is an async function that returns the active locale
  const locale = await requestLocale;

  // Validate that the incoming locale is valid
  // Your middleware should ensure this never happens, but it's good practice
  if (!locale || !locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
