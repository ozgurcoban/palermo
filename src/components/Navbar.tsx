import LocaleSwitcher from './LocaleSwitcher';
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
          <nav className='gap-16 uppercase font-teko text-xl whitespace-nowrap hidden md:flex list-none'>
            <li>
              <Link
                className='hover:text-primary active:text-black focus:outline-none focus:underline focus:ring-violet-300'
                href={'/'}
              >
                {t('home')}
              </Link>
            </li>
            <li>
              <Link className='hover:text-primary' href={'/menu'}>
                {t('menu')}
              </Link>
            </li>
            <li>
              <Link className='hover:text-primary' href={'/about'}>
                {t('about')}
              </Link>
            </li>
            <li>
              <Link className='hover:text-primary' href={'/news'}>
                {t('news')}
              </Link>
            </li>
          </nav>
        </div>
        <div className='flex justify-end items-center md:flex-1 gap-2'>
          <button className='px-4 py-2 text-xl font-teko uppercase bg-primary text-secondary font-light'>
            where to find us
          </button>
          <div className='hidden px-4 py-2 md:inline-flex items-center '>
            <LocaleSwitcher />
            <Separator
              orientation='vertical'
              className='mx-1 bg-slate-300 h-6'
            />
          </div>
        </div>
      </div>
    </header>
  );
}
