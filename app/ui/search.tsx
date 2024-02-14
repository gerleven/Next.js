'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter(); //useRouter has many methods, we'll use only replace.
  const pathname = usePathname();

  const searchRedirect = (term: string) => {
    console.log(`searching: ${term}`);
    // const params = new URLSearchParams(window.location.search);
    
    //Get params:
    const params = new URLSearchParams(searchParams); //we don't need any more the "window.location.search" to pass in URLSearchParams(window.location.search); because now we have the useSearchParams() hook
    
    //Set new params (page and query):
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    // const newPath = `${pathname}?${params.toString()}`;
    // console.log("Navigating to: ",newPath);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback(searchRedirect, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()} //Now if you refresh the page the input will keep on sync with the url param
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
