'use client';

import React from 'react';

import ErrorBox from '@/components/ErrorBox';
import Loading from '@/components/Loading';
import EmptyBox from './EmptyBox';

type Props = {
  children: React.ReactNode;
  emptyMessage?: string;
  error: Error | null;
  isEmpty?: boolean;
  isLoading: boolean;
  refetch?: () => void;
  title: string;
};

const DataValidation = ({
  isLoading,
  error,
  refetch,
  isEmpty,
  emptyMessage,
  title,
  children,
}: Props) => {
  if (isLoading) return <Loading />;

  if (!isLoading && error)
    return (
      <ErrorBox
        errorName={error.name}
        errorMessage={error.message}
        refetch={refetch}
      />
    );

  if (isEmpty) return <EmptyBox message={emptyMessage} refetch={refetch} />;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-4xl font-semibold">{title}</p>
      {children}
    </div>
  );
};

export default DataValidation;
