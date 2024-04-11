import type {
  GetMarketCodeRequest,
  GetMarketCodeResponse,
} from '@/types/market-code';

import api from './api';

export const getMarketCode = async ({
  isDetails,
}: GetMarketCodeRequest): Promise<GetMarketCodeResponse> => {
  const { data } = await api.get<GetMarketCodeResponse>(
    `/market/all?isDetails=${isDetails}`,
  );
  return data;
};
