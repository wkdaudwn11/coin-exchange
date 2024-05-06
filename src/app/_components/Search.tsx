'use client';

import { useState, useRef } from 'react';
import {
  Cog8ToothIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

const Search = () => {
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setInputValue('');
    inputRef.current?.focus();
  };

  return (
    <div className="flex h-[42px] border-b border-gray-300">
      <div className="flex-1 flex items-center h-ful py-2 pr-[9px] pl-[14px] border-r border-gray-300">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            placeholder="코인명/심볼검색"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-[26px] bg-transparent text-gray-200 placeholder:text-[#333333] font-bold text-[14px]"
          />
          {inputValue && (
            <figure className="absolute top-[2px] right-2 z-[1] w-5">
              <XMarkIcon
                className="w-full h-5 text-gray-200"
                onClick={handleClear}
              />
            </figure>
          )}
        </div>
        <figure className="w-5">
          <MagnifyingGlassIcon className="w-full h-5 text-gray-200" />
        </figure>
      </div>
      <div className="flex items-center justify-center w-[44px] h-full">
        <Cog8ToothIcon className="w-5 h-5 text-gray-200" />
      </div>
    </div>
  );
};

export default Search;
