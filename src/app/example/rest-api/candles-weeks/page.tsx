'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from 'react-daisyui';
import { format } from 'date-fns';

import type { GetCandlesWeeksMonthsRequest } from '@/types/candles';

import { getMarketCode } from '@/services/market-code';

import DropdownMarketCode from '@/components/dropdown-market-code';
import DataValidation from '@/components/DataValidation';
import Layout from '@/components/layout';

import List from './_components/list';

const countList = ['1', '5', '10', '30', '50', '100', '200'];

const CandlesWeeksPage = () => {
  const [payload, setPayload] = useState<GetCandlesWeeksMonthsRequest>({
    count: countList[2],
    market: '',
    to: format(new Date(), 'yyyy-MM-dd'),
    unit: 'weeks',
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['candles-weeks-market-code'],
    queryFn: () => getMarketCode({ isDetails: false }),
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target) return;

    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;

    setPayload({
      ...payload,
      to: e.target.value,
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
        emptyMessage="주봉 데이터가 없습니다."
        title="캔들 - 주봉 데이터 목록"
        desc="* 주봉은 매일 오전 9시 정각에 초기화"
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

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">날짜 선택</span>
              </label>
              <Input
                type="date"
                value={payload.to}
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>

        {payload.market && <List payload={payload} />}
      </DataValidation>
    </Layout>
  );
};

export default CandlesWeeksPage;
