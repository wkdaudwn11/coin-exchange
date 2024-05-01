'use client';

import { ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Notice = () => (
  <div className="flex w-full gap-[10px]">
    <div className="flex items-center gap-1">
      <ExclamationCircleIcon className="w-[22px] h-[22px] text-warning-100" />
      <span className="text-15 font-bold text-warning-100">공지</span>
    </div>
    <div className="flex-1 flex items-center justify-between">
      <p className="text-15 text-gray-100 font-bold">
        리딩방·로또 손실 피해보상을 빙자한 코인 매수 제안 주의 안내
      </p>
      <span>
        <XMarkIcon className="w-[20px] h-[20px] text-gray-100" />
      </span>
    </div>
  </div>
);

export default Notice;
