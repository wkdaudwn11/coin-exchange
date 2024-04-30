/* eslint-disable no-plusplus */
import cloneDeep from 'lodash/cloneDeep';

import type { OrderbookWS } from '@/types/orderbook';
import type { TickerWS } from '@/types/tickers';
import type { MarketCode } from '@/types/marketCode';
import type { TradeWS } from '@/types/trades';

export const socketDataEncoder = <T>(
  socketData: ArrayBuffer,
): T | undefined => {
  try {
    const rawData = new Uint8Array(socketData);
    const decodedData = new TextDecoder('utf-8').decode(rawData);
    return JSON.parse(decodedData) as T;
  } catch (error) {
    console.error('Error decoding socket data:', error);
    return undefined;
  }
};

export const getLastBuffers = <T extends OrderbookWS | TickerWS>(
  buffer: T[],
  maxNumResult: number,
) => {
  try {
    const result: T[] = [];

    for (let i = buffer.length - 1; i >= 0; i--) {
      let isExist = false;

      for (let j = 0; j < result.length; j++) {
        if (result[j].code === buffer[i].code) {
          isExist = true;
          break;
        }
      }

      if (!isExist) {
        result.push(buffer[i]);
        if (result.length >= maxNumResult) break;
      }
    }

    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const sortingWidthMarketCode = (
  tickers: TickerWS[],
  marketCodes: MarketCode[],
): TickerWS[] => {
  let sortingTickers: TickerWS[] = [];

  marketCodes.forEach((item) => {
    const find = tickers.find((ticker) => ticker.code === item.market);
    if (find) sortingTickers = sortingTickers.concat(find);
  });

  return sortingTickers;
};

export const updateQueueBuffer = (
  buffer: TradeWS[],
  maxSize: number,
): TradeWS[] => {
  const copyBuffer = cloneDeep(buffer);

  if (copyBuffer.length >= maxSize)
    copyBuffer.splice(0, copyBuffer.length - maxSize);

  return copyBuffer;
};
