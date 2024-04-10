import type { GetMarketCodeResponse } from '@/types/market-code';

import api from './api';

export const getMarketCode = async (): Promise<GetMarketCodeResponse[]> => {
  const { data } = await api.get<GetMarketCodeResponse[]>(
    '/market/all?isDetails=false',
  );
  return data;
};
