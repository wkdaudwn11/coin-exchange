'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { GetTradesTicksRequest } from '@/types/trades';

import { getMarketCode } from '@/services/market-code';

import Layout from '@/components/layout';
import DataValidation from '@/components/DataValidation';

import List from './_components/list';

const countList = ['1', '5', '10', '30', '50', '100', '200'];

const TradesTicksPage = () => {
  const [payload, setPayload] = useState<GetTradesTicksRequest>({
    count: countList[2],
    market: '',
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['trades-ticks-market-code'],
    queryFn: () => getMarketCode({ isDetails: false }),
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target) return;

    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!payload.market && data && data.length > 0) {
      setPayload({
        ...payload,
        market: data[0].market,
      });
    }
  }, [payload, data]);

  return (
    <Layout>
      <DataValidation
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        isEmpty={!isLoading && !error && (!data || (data && data.length === 0))}
        emptyMessage="체결 내역이 없습니다."
        title="체결 - 최근 체결 내역"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-4">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">코인 선택</span>
              </label>
              <select
                className="select w-full max-w-xs"
                name="market"
                value={payload.market}
                onChange={handleChange}
              >
                {data?.map((item) => (
                  <option key={item.market} value={item.market}>
                    {item.korean_name} / {item.english_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">개수 선택</span>
              </label>
              <select
                className="select w-full max-w-xs"
                name="count"
                value={payload.count}
                onChange={handleChange}
              >
                {countList?.map((item) => (
                  <option key={`count-${item}`} value={item}>
                    {item} 개
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {payload.market && <List payload={payload} />}
      </DataValidation>
    </Layout>
  );
};

export default TradesTicksPage;
