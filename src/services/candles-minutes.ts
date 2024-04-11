import type {
  GetCandlesMinutesRequest,
  GetCandlesMinutesResponse,
} from '@/types/candles-minutes';

import api from './api';

export const getCandlesMinutes = async ({
  count,
  market,
  unit,
}: GetCandlesMinutesRequest): Promise<GetCandlesMinutesResponse> => {
  const { data } = await api.get<GetCandlesMinutesResponse>(
    `/candles/minutes/${unit}?market=${market}&count=${count}`,
  );
  return data;
};
