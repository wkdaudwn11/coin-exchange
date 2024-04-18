'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { GetOrderbookRequest } from '@/types/orderbook';

import { getMarketCode } from '@/services/market-code';

import DropdownMarketCode from '@/components/dropdown-market-code';
import DataValidation from '@/components/DataValidation';
import Layout from '@/components/layout';

import List from './_components/list';

const levelList = [
  '100000000',
  '10000000',
  '1000000',
  '100000',
  '10000',
  '1000',
  '100',
  '10',
  '1',
  '0',
  '0.1',
  '0.01',
  '0.001',
  '0.0001',
  '0.00001',
  '0.000001',
  '0.0000001',
];

const OrderbookPage = () => {
  const [payload, setPayload] = useState<GetOrderbookRequest>({
    level: levelList[4],
    market: '',
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['orderbook-market-code'],
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
        emptyMessage="호가 정보 내역이 없습니다."
        title="호가 - 정보 조회"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-4">
            <DropdownMarketCode
              activeValue={payload.market}
              optionList={data}
              handleChange={handleChange}
            />

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">호가 모아보기 단위 선택</span>
              </label>
              <select
                className="select w-full max-w-xs"
                name="level"
                value={payload.level}
                onChange={handleChange}
              >
                {levelList?.map((item) => (
                  <option key={`level-${item}`} value={item}>
                    {item}
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

export default OrderbookPage;
