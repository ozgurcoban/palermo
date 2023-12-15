'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
type ThemeProviderProps = Parameters<typeof NextThemesProvider>[0];

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider value={{ dark: 'luxury', light: 'autumn' }} {...props}>
      {children}
    </NextThemesProvider>
  );
}
