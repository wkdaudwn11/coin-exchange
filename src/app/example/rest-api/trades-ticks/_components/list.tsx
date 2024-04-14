import React from 'react';
import { useQuery } from '@tanstack/react-query';

import type { GetTradesTicksRequest } from '@/types/trades';

import { getTradesTicks } from '@/services/trades';

import DataValidation from '@/components/DataValidation';
import Table from '@/components/Table';

type Props = {
  payload: GetTradesTicksRequest;
};

const List = ({ payload }: Props) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['trades-ticks', payload],
    queryFn: () => getTradesTicks({ ...payload }),
  });

  return (
    <div className="flex justify-center">
      <DataValidation
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        isEmpty={!isLoading && !error && (!data || (data && data.length === 0))}
        emptyMessage="체결 내역이 없습니다."
      >
        <Table.Container>
          <Table.Head>
            <span />
            <span>매수/매도</span>
            <span>체결 일자</span>
            <span>체결 가격</span>
            <span>체결량</span>
            <span>체결 금액</span>
          </Table.Head>
          <Table.Body>
            {data?.map((item, idx) => (
              <Table.Row key={`trades-ticks-${idx}`}>
                <span>{data.length - idx}</span>
                <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                <span>{item.ask_bid === 'BID' ? '매수' : '매도'}</span>
                <span>{item.trade_price.toLocaleString()}</span>
                <span>
                  {item.trade_volume.toLocaleString(undefined, {
                    maximumFractionDigits: 8,
                  })}
                </span>
                <span>
                  {(item.trade_price * item.trade_volume).toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 0,
                    },
                  )}
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
