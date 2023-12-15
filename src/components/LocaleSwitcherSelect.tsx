'use client';

import clsx from 'clsx';
import { ChangeEvent, ReactNode, useTransition } from 'react';
import { useRouter, usePathname } from '@/navigation';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <>
      <label
        className={clsx(
          'text-gray-400',
          isPending && 'transition-opacity [&:disabled]:opacity-30'
        )}
      />
      <p className='sr-only'>{label}</p>
      <div className='flex items-center'>
        <select
          className='inline-flex appearance-none bg-transparent'
          defaultValue={defaultValue}
          disabled={isPending}
          onChange={onSelectChange}
          aria-label={label}
        >
          {children}
        </select>
        <span className='pointer-events-none mb-2'>⌄</span>
      </div>
    </>
  );
}
