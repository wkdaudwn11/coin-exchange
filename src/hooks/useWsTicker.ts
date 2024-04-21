/* eslint-disable react-hooks/exhaustive-deps */

import { useRef, useState, useEffect, useCallback } from 'react';
import throttle from 'lodash/throttle';

import type { MarketCode } from '@/types/market-code';
import type { TickerWS } from '@/types/tickers';

import {
  socketDataEncoder,
  sortingWidthMarketCode,
  getLastBuffers,
} from '@/lib/utils';

type Props = {
  marketCodes: MarketCode[];
};

const SOCKET_URL = 'wss://api.upbit.com/websocket/v1';

const useWsTicker = ({ marketCodes }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [socketData, setSocketData] = useState<TickerWS[] | undefined>(
    undefined,
  );

  const socket = useRef<WebSocket | null>(null);
  const buffer = useRef<TickerWS[]>([]);

  const throttled = throttle(() => {
    try {
      const lastBuffers = getLastBuffers(buffer.current, marketCodes.length);
      const sortingTickers = sortingWidthMarketCode(lastBuffers, marketCodes);
      setSocketData(sortingTickers);
      setIsLoading(false);
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }, 400);

  const connectSocket = useCallback(() => {
    if (!marketCodes) throw new Error('marketCodes is missing.');

    if (socket.current) return;

    socket.current = new WebSocket(SOCKET_URL);
    socket.current.binaryType = 'arraybuffer';

    const socketOpenHandler = () => {
      if (socket.current?.readyState === 1) {
        const sendContent = [
          { ticket: 'test' },
          {
            type: 'ticker',
            codes: marketCodes.map((item) => item.market),
          },
        ];
        socket.current.send(JSON.stringify(sendContent));
        setIsConnected(true);
      }
    };

    const socketCloseHandler = () => {
      setIsConnected(false);
      setSocketData(undefined);
      socket.current = null;
      buffer.current = [];
    };

    const socketErrorHandler = (event: Event) => {
      const nextError = (event as ErrorEvent).error as Error;
      setError(nextError);
    };

    const socketMessageHandler = (evt: MessageEvent<ArrayBuffer>) => {
      const data = socketDataEncoder<TickerWS>(evt.data);
      if (data) buffer.current.push(data);
      throttled();
    };

    socket.current.onclose = socketCloseHandler;
    socket.current.onopen = socketOpenHandler;
    socket.current.onerror = socketErrorHandler;
    socket.current.onmessage = socketMessageHandler;
  }, [marketCodes]);

  useEffect(() => {
    connectSocket();
  }, []);

  return {
    socket: socket.current,
    isConnected,
    socketData,
    isError: !!error,
    error,
    isLoading,
    reconnect: connectSocket,
  };
};

export default useWsTicker;
