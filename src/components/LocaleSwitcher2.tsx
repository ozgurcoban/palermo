'use client';

import { Fragment, useState } from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const locales = [
  { id: 'en', name: 'English', src: '/en.png' },
  { id: 'sv', name: 'Swedish', src: '/sv.png' },
];

export default function LocaleSwitcher() {
  const locale = useLocale();
  const [selected, setSelected] = useState(
    locale.id === 'en' ? locales[0] : locales[1]
  );
  return (
    <Select>
      <SelectTrigger className='border-none'>
        <Image width={25} height={25} src={selected.src} alt={selected.name} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {locales.map(locale => (
            <Fragment key={locale.id}>
              <SelectItem
                onClick={() => setSelected(locale)}
                className='flex items-center gap-2'
                value={locale.id}
              >
                <Image
                  width={25}
                  height={25}
                  src={locale.src}
                  alt={locale.name}
                />
                <SelectLabel>{locale.name}</SelectLabel>
              </SelectItem>
            </Fragment>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
