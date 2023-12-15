import LocaleSwitcher from './LocaleSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  return (
    <header className='h-16 sticky pt-6'>
      <div className='mx-auto w-full max-w-7xl lg:px-8'>
        <div className='px-4 sm:px-8 lg:px-12'>
          <div className='mx-auto max-w-2xl lg:max-w-5xl'>
            <div className='flex gap-4 items-center'>
              <div className='flex-1' />
              <div className='flex-1 justify-end md:justify-center inline-flex'>
                <ul className='gap-4 whitespace-nowrap hidden md:flex'>
                  <li>Om oss</li>
                  <li>Kontakta oss</li>
                  <li>Meny</li>
                  <li>Källaren</li>
                </ul>
                <div className='md:hidden'>Menu</div>
              </div>
              <div className='flex justify-end items-center md:flex-1 gap-2'>
                <div className='hidden md:inline-flex'>
                  <LocaleSwitcher />
                </div>
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
