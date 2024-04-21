import { useRef, useState, useEffect, useCallback } from 'react';
import throttle from 'lodash/throttle';

import type { OrderbookWS } from '@/types/orderbook';

import { socketDataEncoder, getLastBuffers } from '@/lib/utils';

type Props = {
  marketCode: string;
};

const SOCKET_URL = 'wss://api.upbit.com/websocket/v1';

const options = {
  debug: false,
  throttle_time: 400,
};

const useWsOrderbook = ({ marketCode }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [socketData, setSocketData] = useState<OrderbookWS | undefined>(
    undefined,
  );

  const socket = useRef<WebSocket | null>(null);
  const buffer = useRef<OrderbookWS[]>([]);

  const throttled = throttle(() => {
    try {
      const lastBuffers = getLastBuffers(buffer.current, 1);
      if (lastBuffers) setSocketData(lastBuffers[0]);
      buffer.current = [];
      setIsLoading(false);
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }, options.throttle_time);

  const connectSocket = useCallback(() => {
    if (!marketCode) throw new Error('marketCode is missing.');

    if (socket.current) return;

    socket.current = new WebSocket(SOCKET_URL);
    socket.current.binaryType = 'arraybuffer';

    const socketOpenHandler = () => {
      if (socket.current?.readyState === 1) {
        const sendContent = [
          { ticket: 'test' },
          {
            type: 'orderbook',
            codes: [marketCode],
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
      const data = socketDataEncoder<OrderbookWS>(evt.data);
      if (data) buffer.current.push(data);
      throttled();
    };

    socket.current.onclose = socketCloseHandler;
    socket.current.onopen = socketOpenHandler;
    socket.current.onerror = socketErrorHandler;
    socket.current.onmessage = socketMessageHandler;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketCode]);

  useEffect(() => {
    connectSocket();
  }, [connectSocket]);

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

export default useWsOrderbook;
