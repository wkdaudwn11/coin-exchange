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
    <div className="flex h-[42px] border-b border-[#1e2939]">
      <div className="flex-1 flex items-center h-ful py-2 pr-[9px] pl-[14px] border-r border-[#1e2939]">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            placeholder="코인명/심볼검색"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-[26px] bg-transparent text-[#d2d4d6] placeholder:text-[#333333] font-bold text-[14px]"
          />
          {inputValue && (
            <figure className="absolute top-[2px] right-2 z-[1] w-5">
              <XMarkIcon
                className="w-full h-5 text-[#d2d4d6]"
                onClick={handleClear}
              />
            </figure>
          )}
        </div>
        <figure className="w-5">
          <MagnifyingGlassIcon className="w-full h-5 text-[#d2d4d6]" />
        </figure>
      </div>
      <div className="flex items-center justify-center w-[44px] h-full">
        <Cog8ToothIcon className="w-5 h-5 text-[#d2d4d6]" />
      </div>
    </div>
  );
};

export default Search;
