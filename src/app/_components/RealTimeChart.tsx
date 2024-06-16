'use client';

import { memo, useEffect, useRef, useState } from 'react';
import {
  createChart,
  CrosshairMode,
  type IChartApi,
  type ISeriesApi,
} from 'lightweight-charts';
import { format } from 'date-fns/format';

import type { GetCandlesDaysResponse } from '@/types/candles';

import useActiveMarketCode from '@/store/useActiveMarket';
import { getCandlesDays } from '@/services/candles';

type Processed = {
  close: number;
  high: number;
  low: number;
  open: number;
  time: string | { day: string; month: string; year: string };
};

const backgroundColor = 'rgb(6, 18, 33)';
const textColor = 'white';

const RealTimeChart = () => {
  const [updatedCandle, setUpdatedCandle] = useState<Processed | null>(null);
  const [processList, setProcessList] = useState<Processed[]>([]);

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const newSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  const { activeMarketCode, activeMarketInfo } = useActiveMarketCode();

  const fetchCandlesDays = async (market: string) => {
    try {
      const candleDays: GetCandlesDaysResponse = await getCandlesDays({
        count: '200',
        market: market || 'KRW-BTC',
        to: format(new Date(), 'yyyy-MM-dd'),
        convertingPriceUnit: 'KRW',
      });

      const nextProcessed: Processed[] = [...candleDays]
        .reverse()
        .map((data) => {
          return {
            time: format(new Date(data.candle_date_time_kst), 'yyyy-MM-dd'),
            open: data.opening_price,
            high: data.high_price,
            low: data.low_price,
            close: data.trade_price,
          };
        });

      setProcessList(nextProcessed);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!chartContainerRef.current || processList.length === 0) {
      return;
    }

    const container = chartContainerRef.current;

    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.applyOptions({
          width: container.clientWidth,
        });
      }
    };

    chartRef.current = createChart(container, {
      layout: {
        background: { color: backgroundColor },
        textColor,
      },
      width: container.clientWidth,
      height: 480,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      leftPriceScale: {
        borderVisible: false,
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      timeScale: {
        borderVisible: false,
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
    });

    chartRef.current.timeScale().fitContent();

    newSeriesRef.current = chartRef.current.addCandlestickSeries({
      upColor: '#D24F45',
      wickUpColor: '#D24F45',
      downColor: '#1261C4',
      wickDownColor: '#1261C4',
      borderVisible: false,
    });
    window.addEventListener('resize', handleResize);

    // @ts-ignore
    newSeriesRef.current.setData(processList);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [processList]);

  useEffect(() => {
    if (updatedCandle && newSeriesRef.current) {
      // @ts-ignore
      newSeriesRef.current.update(updatedCandle);
    }
  }, [updatedCandle]);

  useEffect(() => {
    if (activeMarketInfo && activeMarketInfo.trade_date) {
      setUpdatedCandle({
        time: {
          day: activeMarketInfo.trade_date.slice(6, 8),
          month: activeMarketInfo.trade_date.slice(4, 6),
          year: activeMarketInfo.trade_date.slice(0, 4),
        },
        open: activeMarketInfo.opening_price,
        high: activeMarketInfo.high_price,
        low: activeMarketInfo.low_price,
        close: activeMarketInfo.trade_price,
      });
    }
  }, [activeMarketInfo]);

  useEffect(() => {
    if (activeMarketCode) fetchCandlesDays(activeMarketCode.market);
  }, [activeMarketCode]);

  return (
    <div className="flex-1">
      <div ref={chartContainerRef} className="h-full" />
    </div>
  );
};

export default memo(RealTimeChart);
