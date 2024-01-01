import LocaleSwitcher from './LocaleSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import { useTranslations } from 'next-intl';

import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function Navbar() {
  const t = useTranslations('Navigation');
  return (
    <header className='sticky top-12 z-50'>
      <div className='mx-auto w-full max-w-7xl lg:px-8'>
        <div className='px-4 sm:px-8 lg:px-12'>
          <div className='mx-auto max-w-2xl lg:max-w-5xl'>
            <div className='flex gap-4 items-center'>
              <div className='flex-1' />
              <div className='flex-1 justify-end md:justify-center bg-secondary inline-flex rounded-full shadow-md px-6 py-3'>
                <ul className='gap-4 whitespace-nowrap hidden md:flex'>
                  <li>
                    <Link href={'/'}>{t('home')}</Link>
                  </li>
                  <li>
                    <Link href={'/menu'}>{t('menu')}</Link>
                  </li>
                  <li>
                    <Link href={'/about'}>{t('about')}</Link>
                  </li>
                  <li>
                    <Link href={'/news'}>{t('news')}</Link>
                  </li>
                </ul>
                <div className='md:hidden'>Menu</div>
              </div>
              <div className='flex justify-end items-center md:flex-1 gap-2'>
                <div className='hidden bg-secondary rounded-full shadow-md px-4 py-2 md:inline-flex items-center '>
                  <LocaleSwitcher />
                  <Separator
                    orientation='vertical'
                    className='mx-1 bg-slate-300 h-6'
                  />
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
