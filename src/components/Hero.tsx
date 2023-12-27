'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { MotionValue, useScroll, useTransform, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('IndexPage');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const { resolvedTheme } = useTheme();

  const overlayStyle = clsx(
    'absolute inset-0 z-10 bg-black',
    resolvedTheme === 'dark' ? ' opacity-75' : 'opacity-50'
  );

  function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
  }

  const y = useParallax(scrollYProgress, 400);

  return (
    <div className='min-h-dvh'>
      <div className={overlayStyle} />
      <motion.div
        style={{ y }}
        className='absolute inset-0 flex items-center justify-center z-0'
      >
        <Image
          src='/hero.jpeg'
          alt='hero'
          fill
          style={{ objectFit: 'cover' }}
        />
      </motion.div>
      <div className='absolute inset-0 flex flex-col items-center justify-center z-20'>
        <div className='bg-accent rounded p-10'>
          <h1
            ref={ref}
            className='max-w-screen-sm text-secondary-foreground text-6xl'
          >
            {t('hero.title')}
          </h1>
        </div>
      </div>
    </div>
  );
}
