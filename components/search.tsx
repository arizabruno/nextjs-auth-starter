'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useState } from 'react'; // Import useState
import Spinner from './spinner';

export default function Search({ disabled }: { disabled?: boolean }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term

  function searchByEnterKey(event: any) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  function handleSearch() {
    const params = new URLSearchParams(window.location.search);
    if (searchTerm) {
      params.set('title', searchTerm);
      params.set('page', '1');
    } else {
      params.delete('title');
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="flex">
      <div className="w-11/12">
        <div className="relative w-full">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            aria-hidden="true"
          >
            <MagnifyingGlassIcon
              className="mr-3 h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            disabled={disabled}
            className="pl-10 flex-grow h-10 block w-full rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mr-5"
            spellCheck={false}
            onKeyDown={searchByEnterKey}
            autoComplete="off"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="">
        <button
          onClick={handleSearch}
          disabled={disabled || isPending}
          className="ml-5 w-32 px-4 py-2 text-center text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isPending ? <Spinner /> : <span>Search</span>}
        </button>
      </div>
    </div>
  );
}
