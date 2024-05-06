'use client';

import React, { useEffect } from 'react';
import { Table } from 'react-daisyui';
import c from 'classnames';

import type { MarketCode } from '@/types/marketCode';

import useWsTicker from '@/hooks/useWsTicker';
import useActiveMarketCode from '@/store/useActiveMarket';
import { convertMillion } from '@/lib/utils';

import DataValidationV2 from '@/components/DataValidationV2';

type Props = {
  marketCodes: MarketCode[];
};

const MarketCodeList = ({ marketCodes }: Props) => {
  const { isConnected, socketData, isLoading, error } = useWsTicker({
    marketCodes: marketCodes.filter((item) => item.market.includes('KRW')),
  });

  const { activeMarketCode, setActiveMarketCode, setActiveMarketInfo } =
    useActiveMarketCode();

  const handleMarketClick = (code: string) => () => {
    if (activeMarketCode.market === code) return;

    const findMarket = marketCodes.find((item) => item.market === code);
    if (findMarket) setActiveMarketCode(findMarket);
  };

  useEffect(() => {
    if (!socketData) return;

    const activeMarketInfo = socketData.find(
      (item) => item.code === activeMarketCode.market,
    );
    if (activeMarketInfo) setActiveMarketInfo(activeMarketInfo);
  }, [socketData, activeMarketCode, setActiveMarketInfo]);

  return (
    <DataValidationV2
      isLoading={isLoading || socketData?.length === 1}
      error={error}
    >
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
            socketData.map((item, idx) => {
              const upDown = item.signed_change_rate > 0 ? 'up' : 'down';

              return (
                <Table.Row
                  key={`ticker-${idx}`}
                  className={c(
                    'text-xs hover:cursor-pointer hover:bg-[#151c29]',
                    {
                      'bg-[#151c29]': item.code === activeMarketCode.market,
                    },
                  )}
                  onClick={handleMarketClick(item.code)}
                >
                  <div className="width-[115px]">
                    <p>
                      {
                        marketCodes.find((item2) => item2.market === item.code)
                          ?.korean_name
                      }
                    </p>
                    <p className="text-[#858b95] text-[11px]">{item.code}</p>
                  </div>
                  <div className="width-[95px] text-right">
                    <p
                      className={c({
                        'text-up': upDown === 'up',
                        'text-down': upDown === 'down',
                      })}
                    >
                      {item.trade_price > 1000
                        ? item.trade_price.toLocaleString()
                        : item.trade_price}
                    </p>
                  </div>
                  <div className="w-[50px] text-right">
                    <p
                      className={c({
                        'text-up': upDown === 'up',
                        'text-down': upDown === 'down',
                      })}
                    >
                      {(item.signed_change_rate * 100).toLocaleString(
                        undefined,
                        {
                          maximumFractionDigits: 2,
                        },
                      )}
                      %
                    </p>
                    <p
                      className={c('text-[11px]', {
                        'text-up': upDown === 'up',
                        'text-down': upDown === 'down',
                      })}
                    >
                      {item.signed_change_price > 1000
                        ? item.signed_change_price.toLocaleString('ko-KR')
                        : item.signed_change_price}
                    </p>
                  </div>
                  <div className="text-right w-[70px]">
                    <span>
                      {Math.ceil(
                        convertMillion(item.acc_trade_price_24h),
                      ).toLocaleString('ko-KR')}
                    </span>
                    <span className="text-gray-400">백만</span>
                  </div>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </DataValidationV2>
  );
};

export default MarketCodeList;
