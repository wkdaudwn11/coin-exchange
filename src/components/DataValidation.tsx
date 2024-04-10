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
};

const DataValidation = ({
  isLoading,
  error,
  refetch,
  isEmpty,
  emptyMessage,
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

  return children;
};

export default DataValidation;
