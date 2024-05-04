'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getMarketCode } from '@/services/market-code';
import useActiveMarketCode from '@/store/useActiveMarketCode';

import DataValidationV2 from '@/components/DataValidationV2';
import Layout from '@/components/Layout';

import Notice from './_components/Notice';
import Search from './_components/Search';
import MarketCodeList from './_components/MarketCodeList';

const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['coin-exchange-market-code'],
    queryFn: () => getMarketCode({ isDetails: false }),
  });

  const { setMarketCode } = useActiveMarketCode();

  useEffect(() => {
    if (!data) return;
    const bitcoin = data.find((item) => item.market === 'KRW-BTC');

    if (bitcoin) setMarketCode(bitcoin);
  }, [data, setMarketCode]);

  return (
    <Layout>
      <DataValidationV2
        isLoading={isLoading}
        error={error}
        isEmpty={!isLoading && !error && (!data || (data && data.length === 0))}
      >
        <div className="relative flex gap-[10px] pt-[10px] pb-[60px]">
          <section className="flex-1 flex flex-col gap-[10px]">
            <Notice />
            <article className="h-[618px] bg-primary-100">header</article>
            <div className="flex gap-[10px] h-[800px]">
              <div className="flex-1 h-full bg-primary-100">body left</div>
              <div className="flex-1 h-full bg-primary-100">body right</div>
            </div>
            <article className="h-[435px] bg-primary-100">footer</article>
          </section>
          <section className="w-[400px] max-h-[1208px] overflow-x-hidden overflow-y-auto bg-primary-100">
            <Search />
            <MarketCodeList marketCodes={data || []} />
          </section>
        </div>
      </DataValidationV2>
    </Layout>
  );
};

export default Home;
