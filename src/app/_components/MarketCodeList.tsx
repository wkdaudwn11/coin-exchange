'use client';

import React from 'react';
import { Table } from 'react-daisyui';

import type { MarketCode } from '@/types/marketCode';

import useWsTicker from '@/hooks/useWsTicker';
import { convertMillion } from '@/lib/utils';

import DataValidationV2 from '@/components/DataValidationV2';

type Props = {
  marketCodes: MarketCode[];
};

const MarketCodeList = ({ marketCodes }: Props) => {
  const { isConnected, socketData, isLoading, error } = useWsTicker({
    marketCodes: marketCodes.filter((item) => item.market.includes('KRW')),
  });

  return (
    <DataValidationV2 isLoading={isLoading} error={error}>
      <Table>
        <Table.Head className="sticky top-0 z-10 bg-[#141a24] text-center text-[11px] text-[#858b95]">
          <span>한글명</span>
          <span>현재가</span>
          <span>전일대비</span>
          <span>거래대금</span>
        </Table.Head>
        <Table.Body>
          {isConnected &&
            socketData &&
            socketData.map((item, idx) => (
              <Table.Row key={`ticker-${idx}`}>
                <span>
                  {
                    marketCodes.find((item2) => item2.market === item.code)
                      ?.korean_name
                  }
                </span>
                <span>
                  {item.trade_price > 1000
                    ? item.trade_price.toLocaleString()
                    : item.trade_price}
                </span>
                <div>
                  <p>
                    {item.signed_change_rate.toLocaleString(undefined, {
                      maximumFractionDigits: 4,
                    })}
                  </p>
                  <p>{item.signed_change_price.toLocaleString('ko-KR')}</p>
                </div>
                <div>
                  <span>
                    {Math.ceil(
                      convertMillion(item.acc_trade_price_24h),
                    ).toLocaleString('ko-KR')}
                  </span>
                  <span>백만</span>
                </div>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </DataValidationV2>
  );
};

export default MarketCodeList;
