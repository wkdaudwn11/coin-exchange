'use client';

import React from 'react';

import Loading from '@/components/Loading';

type Props = {
  children: React.ReactNode;
  emptyMessage?: string;
  error: Error | null;
  isEmpty?: boolean;
  isLoading: boolean;
};

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => (
  <div className="flex flex-col items-center justify-center gap-4 w-full h-[100vh]">
    {children}
  </div>
);

const DataValidationV2 = ({
  isLoading,
  error,
  isEmpty,
  emptyMessage,
  children,
}: Props) => {
  if (isLoading)
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );

  if (!isLoading && error)
    return (
      <Wrapper>
        <p>
          {error.message || '시스템 오류입니다. 잠시 후 다시 시도해주세요.'}
        </p>
      </Wrapper>
    );

  if (isEmpty)
    return (
      <Wrapper>
        <p>{emptyMessage || '데이터가 없습니다.'}</p>
      </Wrapper>
    );

  return children;
};

export default DataValidationV2;
