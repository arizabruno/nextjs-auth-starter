'use client';

import { useState } from 'react';
import { useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { number } from 'prop-types';

export default function PaginationMenu({
  currentPage
}: {
  currentPage: string;
}) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function prev() {
    const nextPage = Number(currentPage) - 1;

    if (nextPage < 1) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    params.set('page', `${nextPage}`);

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  function next() {
    const nextPage = Number(currentPage) + 1;
    const params = new URLSearchParams(window.location.search);
    params.set('page', `${nextPage}`);

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className='my-5'>
      <div className="flex row w-full flex justify-center">
        <button className="text-xl" onClick={prev}>
          ⬅️
        </button>
        <span className="px-2"></span>
        <button className="text-xl" onClick={next}>
          {' '}
          ➡️{' '}
        </button>
      </div>
    </div>
  );
}
