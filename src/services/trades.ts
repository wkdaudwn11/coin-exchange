import type {
  GetTradesTicksRequest,
  GetTradesTicksResponse,
} from '@/types/trades';

import api from './api';

export const getTradesTicks = async ({
  count,
  market,
}: GetTradesTicksRequest): Promise<GetTradesTicksResponse> => {
  const { data } = await api.get<GetTradesTicksResponse>(
    `/trades/ticks?market=${market}&count=${count}`,
  );
  return data;
};
