import { useRef, useState, useEffect, useCallback } from 'react';
import throttle from 'lodash/throttle';

import type { TradeWS } from '@/types/trades';

import { socketDataEncoder, updateQueueBuffer } from '@/lib/utils';

type Props = {
  marketCode: string;
};

const SOCKET_URL = 'wss://api.upbit.com/websocket/v1';

const useWsTrade = ({ marketCode }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [socketData, setSocketData] = useState<TradeWS[] | undefined>(
    undefined,
  );

  const socket = useRef<WebSocket | null>(null);
  const buffer = useRef<TradeWS[]>([]);

  const throttled = throttle(() => {
    try {
      const updatedBuffer = updateQueueBuffer(buffer.current, 100);
      buffer.current = updatedBuffer;
      setSocketData(updatedBuffer);
      setIsLoading(false);
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }, 400);

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
            type: 'trade',
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
      const data = socketDataEncoder<TradeWS>(evt.data);
      if (data) buffer.current.push(data);
      throttled();
    };

    socket.current.onclose = socketCloseHandler;
    socket.current.onopen = socketOpenHandler;
    socket.current.onerror = socketErrorHandler;
    socket.current.onmessage = socketMessageHandler;
  }, [marketCode, throttled]);

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

export default useWsTrade;
