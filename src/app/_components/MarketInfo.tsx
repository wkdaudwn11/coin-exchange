'use client';

import c from 'classnames';

import useActiveMarketCode from '@/store/useActiveMarket';

const MarketInfo = () => {
  const { activeMarketCode, activeMarketInfo } = useActiveMarketCode();

  const upDown = activeMarketInfo?.signed_change_rate
    ? activeMarketInfo?.signed_change_rate > 0
      ? 'up'
      : 'down'
    : null;

  if (!activeMarketInfo) return null;

  return (
    <div>
      <div className="flex items-center h-[45px] px-[14px] gap-1 border-b border-gray-300">
        <p className="text-xl font-bold text-gray-200">
          {activeMarketCode.korean_name}
        </p>
        <p className="text-xs text-gray-200">{activeMarketCode.market}</p>
      </div>
      <div className="flex items-center justify-between h-[87px] pt-[18px] pb-[14px] px-5">
        <div
          className={c('flex-1 flex flex-col justify-end gap-1', {
            'text-white': upDown === null,
            'text-up': upDown === 'up',
            'text-down': upDown === 'down',
          })}
        >
          <div className="flex items-end gap-1">
            <p className="text-3xl text-[32px] font-medium">
              {activeMarketInfo.trade_price > 1000
                ? activeMarketInfo.trade_price.toLocaleString()
                : activeMarketInfo.trade_price}
            </p>
            <p className="text-sm">KRW</p>
          </div>
          <div className="flex gap-1 text-[16px] font-medium">
            <p>
              {(activeMarketInfo.signed_change_rate * 100).toLocaleString(
                undefined,
                {
                  maximumFractionDigits: 2,
                },
              )}
              %
            </p>
            <div className="flex items-center gap-1">
              {upDown === 'up' && (
                <div className="relative">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-b-[12px] border-l-transparent border-r-transparent border-up" />
                </div>
              )}

              {upDown === 'down' && (
                <div className="relative">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-[12px] border-l-transparent border-r-transparent border-down" />
                </div>
              )}

              <p>
                {activeMarketInfo.signed_change_price > 1000
                  ? activeMarketInfo.signed_change_price.toLocaleString('ko-KR')
                  : activeMarketInfo.signed_change_price}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex gap-5">
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between items-end pb-2 border-b border-gray-300">
              <p className="text-gray-200 text-[12px]">고가</p>
              <p className="text-[14px] text-up">
                {activeMarketInfo.high_price > 1000
                  ? activeMarketInfo.high_price.toLocaleString('ko-KR')
                  : activeMarketInfo.high_price}
              </p>
            </div>
            <div className="flex justify-between items-end">
              <p className="text-gray-200 text-[12px]">저가</p>
              <p className="text-[14px] text-down">
                {activeMarketInfo.low_price > 1000
                  ? activeMarketInfo.low_price.toLocaleString('ko-KR')
                  : activeMarketInfo.low_price}
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between items-end h-[30px] pb-2 border-b border-gray-300">
              <p className="text-gray-200 text-[12px]">거래량(24h)</p>
              <div className="flex gap-1 items-end">
                <p className="text-[12px]">
                  {activeMarketInfo.acc_trade_volume_24h > 1000
                    ? activeMarketInfo.acc_trade_volume_24h.toLocaleString(
                        'ko-KR',
                      )
                    : activeMarketInfo.acc_trade_volume_24h}
                </p>
                <p className="text-[11px] text-gray-400">
                  {activeMarketCode.market.replace('KRW-', '')}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-end pt-[3px]">
              <p className="text-gray-200 text-[12px]">거래대금(24H)</p>
              <div className="flex gap-1 items-end">
                <p className="text-[12px]">
                  {activeMarketInfo.acc_trade_price_24h > 1000
                    ? activeMarketInfo.acc_trade_price_24h.toLocaleString(
                        'ko-KR',
                        {
                          maximumFractionDigits: 0,
                        },
                      )
                    : activeMarketInfo.acc_trade_price_24h}
                </p>
                <p className="text-[11px] text-gray-400">KRW</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInfo;
