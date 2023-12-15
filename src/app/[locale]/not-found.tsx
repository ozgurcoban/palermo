import { useTranslations } from 'next-intl';

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <main className='h-screen grid place-items-center'>
      <h2 className='text-xl'>{t('title')}</h2>
      <p className='max-w-[460px]'>{t('description')}</p>
    </main>
  );
}
