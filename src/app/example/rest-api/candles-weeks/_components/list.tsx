import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import type { GetCandlesWeeksMonthsRequest } from '@/types/candles';

import { getCandlesWeeksMonths } from '@/services/candles';

import DataValidation from '@/components/DataValidation';
import Table from '@/components/Table';

type Props = {
  payload: GetCandlesWeeksMonthsRequest;
};

const List = ({ payload }: Props) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['candles-weeks', payload],
    queryFn: () => getCandlesWeeksMonths({ ...payload }),
  });

  return (
    <div className="flex justify-center">
      <DataValidation
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        isEmpty={!isLoading && !error && (!data || (data && data.length === 0))}
        emptyMessage="주봉 데이터가 없습니다."
      >
        <Table.Container>
          <Table.Head>
            <span />
            <span>날짜</span>
            <span>시가</span>
            <span>고가</span>
            <span>저가</span>
            <span>종가</span>
            <span>누적 거래 금액</span>
            <span>누적 거래량</span>
          </Table.Head>
          <Table.Body>
            {data?.map((item, idx) => (
              <Table.Row key={`candles-weeks-${idx}`}>
                <span>{data.length - idx}</span>
                <span>{format(item.candle_date_time_kst, 'yyyy-MM-dd')}</span>
                <span>{item.opening_price.toLocaleString()}</span>
                <span>{item.high_price.toLocaleString()}</span>
                <span>{item.low_price.toLocaleString()}</span>
                <span>{item.trade_price.toLocaleString()}</span>
                <span>
                  {item.candle_acc_trade_price.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </span>
                <span>
                  {item.candle_acc_trade_volume.toLocaleString(undefined, {
                    maximumFractionDigits: 4,
                  })}
                </span>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Container>
      </DataValidation>
    </div>
  );
};

export default List;
