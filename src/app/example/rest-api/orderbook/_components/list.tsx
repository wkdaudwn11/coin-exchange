import React from 'react';
import { useQuery } from '@tanstack/react-query';

import type { GetOrderbookRequest } from '@/types/orderbook';

import { getOrderbook } from '@/services/orderbook';

import DataValidation from '@/components/DataValidation';
import Table from '@/components/Table';

type Props = {
  payload: GetOrderbookRequest;
};

const List = ({ payload }: Props) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['orderbook', payload],
    queryFn: () => getOrderbook({ ...payload }),
  });

  return (
    <div className="flex justify-center">
      <DataValidation
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        isEmpty={!isLoading && !error && (!data || (data && data.length === 0))}
        emptyMessage="호가 정보가 없습니다."
      >
        {data && data.length > 0 && (
          <>
            <div className="flex flex-col gap-1 p-4 bg-slate-800 rounded-md">
              <p>시간: {new Date(data[0].timestamp).toLocaleTimeString()}</p>
              <p>호가 매도 총 잔량: {data[0].total_ask_size}</p>
              <p>호가 매수 총 잔량: {data[0].total_bid_size}</p>
            </div>
            <Table.Container>
              <Table.Head>
                <span />
                <span>매도 호가</span>
                <span>매수 호가</span>
                <span>매도 잔량</span>
                <span>매수 잔량</span>
              </Table.Head>
              <Table.Body>
                {data[0].orderbook_units.map((item, idx) => (
                  <Table.Row key={`orderbook-${idx}`}>
                    <span>{data[0].orderbook_units.length - idx}</span>
                    <span>{item.ask_price.toLocaleString()}</span>
                    <span>{item.bid_price.toLocaleString()}</span>
                    <span>{item.ask_size}</span>
                    <span>{item.bid_size}</span>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Container>
          </>
        )}
      </DataValidation>
    </div>
  );
};

export default List;
