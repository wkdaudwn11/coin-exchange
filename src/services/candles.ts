import type {
  GetCandlesRequest,
  GetCandlesMinutesResponse,
} from '@/types/candles';

import api from './api';

export const getCandlesMinutes = async ({
  count,
  market,
  unit,
}: GetCandlesRequest): Promise<GetCandlesMinutesResponse> => {
  const { data } = await api.get<GetCandlesMinutesResponse>(
    `/candles/minutes/${unit}?market=${market}&count=${count}`,
  );
  return data;
};
