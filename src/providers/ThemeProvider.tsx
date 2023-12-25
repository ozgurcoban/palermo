'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
type ThemeProviderProps = Parameters<typeof NextThemesProvider>[0];

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute='class' defaultTheme='system' {...props}>
      {children}
    </NextThemesProvider>
  );
}
