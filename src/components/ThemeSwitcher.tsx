'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeController() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  // console.log('theme', resolvedTheme);

  useEffect(() => {
    // Function to update theme
    // const updateTheme = (e: MediaQueryListEvent) => {
    //   const newTheme = e.matches ? 'dark' : 'light';
    //   setTheme(newTheme);
    // };
    // // Create media query list
    // const matcher = window.matchMedia('(prefers-color-scheme: dark)');
    // // Set initial theme
    // const initialTheme = matcher.matches ? 'dark' : 'light';
    // setTheme(initialTheme);
    // // Listen for changes
    // matcher.addEventListener('change', updateTheme);
    // // Clean up listener on unmount
    // return () => {
    //   matcher.removeEventListener('change', updateTheme);
    // };
  }, [setTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // console.log('theme toggled');
    // console.log('new theme', newTheme);
  };

  return (
    <label
      className='swap swap-rotate hover:text-slate-300 cursor-pointer'
      title={theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
    >
      <input type='checkbox' value={theme} onClick={toggleTheme} />

      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        className='swap-off stroke-warning w-8 h-8'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
        />
      </svg>

      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        className='swap-on stroke-warning w-8 h-8'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
        />
      </svg>
    </label>
  );
}
