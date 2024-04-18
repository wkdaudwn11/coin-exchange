import type {
  GetOrderbookRequest,
  GetOrderbookResponse,
} from '@/types/orderbook';

import api from './api';

export const getOrderbook = async ({
  level,
  market,
}: GetOrderbookRequest): Promise<GetOrderbookResponse> => {
  const { data } = await api.get<GetOrderbookResponse>(
    `/orderbook?markets=${market}&level=${level}`,
  );
  return data;
};
