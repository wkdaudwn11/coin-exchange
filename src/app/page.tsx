'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { getMarketCode } from '@/services/market-code';

import ErrorBox from '@/components/ErrorBox';
import EmptyBox from '@/components/EmptyBox';
import Loading from '@/components/Loading';
import Layout from '@/components/Layout';

import Notice from './_components/Notice';
import Search from './_components/Search';
import MarketCodeList from './_components/MarketCodeList';

const LoadingBox = ({ children }: { children: React.ReactNode }) => (
  <Layout>
    <div className="flex flex-col items-center justify-center gap-4 w-full h-[100vh]">
      {children}
    </div>
  </Layout>
);

const Home = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['coin-exchange-market-code'],
    queryFn: () => getMarketCode({ isDetails: false }),
  });

  if (isLoading)
    return (
      <LoadingBox>
        <Loading />
      </LoadingBox>
    );

  if (!isLoading && error)
    return (
      <LoadingBox>
        <ErrorBox
          errorName={error.name}
          errorMessage={error.message}
          refetch={refetch}
        />
      </LoadingBox>
    );

  if (!isLoading && !error && (!data || (data && data.length === 0)))
    return (
      <LoadingBox>
        <EmptyBox message="데이터가 없습니다." refetch={refetch} />
      </LoadingBox>
    );

  return (
    <Layout>
      <div className="flex gap-[10px] pt-[10px] pb-[60px]">
        <section className="flex-1 flex flex-col gap-[10px]">
          <Notice />
          <article className="h-[618px] bg-primary-100">header</article>
          <div className="flex gap-[10px] h-[800px]">
            <div className="flex-1 h-full bg-primary-100">body left</div>
            <div className="flex-1 h-full bg-primary-100">body right</div>
          </div>
          <article className="h-[435px] bg-primary-100">footer</article>
        </section>
        <section className="w-[400px] bg-primary-100">
          <Search />
          <MarketCodeList marketCodes={data || []} />
        </section>
      </div>
    </Layout>
  );
};

export default Home;
