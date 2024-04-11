import type {
  GetCandlesRequest,
  GetCandlesDaysRequest,
  GetCandlesMinutesResponse,
  GetCandlesDaysResponse,
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

export const getCandlesDays = async ({
  count,
  market,
  to,
  convertingPriceUnit,
}: GetCandlesDaysRequest): Promise<GetCandlesDaysResponse> => {
  const { data } = await api.get<GetCandlesDaysResponse>(
    `/candles/days?market=${market}&to=${to}T09:00:00Z&count=${count}&convertingPriceUnit=${convertingPriceUnit}`,
  );
  return data;
};
