/* eslint-disable no-plusplus */

import type { OrderbookWS } from '@/types/orderbook';

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

export const getLastBuffers = <T extends OrderbookWS>(
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
