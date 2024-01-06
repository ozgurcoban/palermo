import LocaleSwitcher from './LocaleSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import { useTranslations } from 'next-intl';

import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const t = useTranslations('Navigation');
  return (
    <header className='sticky z-50 bg-secondary'>
      <div className='container h-20 flex gap-4 items-center'>
        <div className='flex-1'>
          <Image src='/logo.png' alt='logo' width={60} height={60} />
        </div>
        <div className='inline-flex flex-1 justify-end md:justify-center'>
          <nav className='gap-16 uppercase font-teko whitespace-nowrap hidden md:flex list-none'>
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
          </nav>
        </div>
        <div className='flex justify-end items-center md:flex-1 gap-2'>
          <div className='hidden px-4 py-2 md:inline-flex items-center '>
            <LocaleSwitcher />
            <Separator
              orientation='vertical'
              className='mx-1 bg-slate-300 h-6'
            />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
