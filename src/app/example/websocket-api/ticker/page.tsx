'use client';

import { useQuery } from '@tanstack/react-query';

import { getMarketCode } from '@/services/market-code';

import DataValidation from '@/components/DataValidation';
import Layout from '@/components/Layout2';
import List from './_components/list';

const TickerPage = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['realtime-ticker-market-code'],
    queryFn: () => getMarketCode({ isDetails: false }),
  });

  return (
    <Layout>
      <DataValidation
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        isEmpty={!isLoading && !error && (!data || (data && data.length === 0))}
        emptyMessage="현재가 정보 내역이 없습니다."
        title="실시간 현재가 정보"
      >
        <div className="flex flex-col gap-4">
          <List marketCodes={data || []} />
        </div>
      </DataValidation>
    </Layout>
  );
};

export default TickerPage;
