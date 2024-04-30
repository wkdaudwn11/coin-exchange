'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getMarketCode } from '@/services/market-code';

import DropdownMarketCode from '@/components/DropdownMarketCode';
import DataValidation from '@/components/DataValidation';
import Layout from '@/components/Layout2';
import List from './_components/list';

const OrderBookPage = () => {
  const [marketCode, setMarketCode] = useState('');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['realtime-orderbook-market-code'],
    queryFn: () => getMarketCode({ isDetails: false }),
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target) return;

    setMarketCode(e.target.value);
  };

  useEffect(() => {
    if (!marketCode && data && data.length > 0) {
      setMarketCode(data[0].market);
    }
  }, [marketCode, data]);

  return (
    <Layout>
      <DataValidation
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        isEmpty={!isLoading && !error && (!data || (data && data.length === 0))}
        emptyMessage="호가 정보 내역이 없습니다."
        title="실시간 호가 정보"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-4">
            <DropdownMarketCode
              activeValue={marketCode}
              optionList={data}
              handleChange={handleChange}
            />
          </div>
        </div>
        <List marketCode={marketCode} />
      </DataValidation>
    </Layout>
  );
};

export default OrderBookPage;
