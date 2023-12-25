'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonStar } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <div>
      <motion.div
        onClick={toggleTheme}
        q
        whileTap={{ scale: 1.2, rotate: 360, transition: { duration: 0.5 } }}
      >
        {theme === 'dark' ? (
          <SunIcon className='sizes-6 text-yellow-300' />
        ) : (
          <MoonStar className='sizes-6 text-slate-700' />
        )}
      </motion.div>
    </div>
  );
};

export default ThemeSwitcher;
