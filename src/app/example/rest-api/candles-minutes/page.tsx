'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { GetCandlesRequest } from '@/types/candles';

import { getMarketCode } from '@/services/market-code';

import DropdownMarketCode from '@/components/DropdownMarketCode';
import DataValidation from '@/components/DataValidation';
import Layout from '@/components/Layout';

import List from './_components/list';

const unitList = ['1', '3', '5', '10', '15', '30', '60', '240'];
const countList = ['1', '5', '10', '30', '50', '100', '200'];

const CandlesMinutesPage = () => {
  const [payload, setPayload] = useState<GetCandlesRequest>({
    count: countList[2],
    unit: unitList[2],
    market: '',
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['candles-minutes-market-code'],
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
        emptyMessage="분봉 데이터가 없습니다."
        title="캔들 - 분봉 데이터 목록"
        desc="* 분봉은 매일 오전 9시 정각에 초기화"
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
                <span className="label-text">분 선택</span>
              </label>
              <select
                className="select w-full max-w-xs"
                name="unit"
                value={payload.unit}
                onChange={handleChange}
              >
                {unitList?.map((item) => (
                  <option key={`minute-${item}`} value={item}>
                    {item} 분
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

export default CandlesMinutesPage;
