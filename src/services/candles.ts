import type {
  GetCandlesRequest,
  GetCandlesDaysRequest,
  GetCandlesWeeksMonthsRequest,
  GetCandlesMinutesResponse,
  GetCandlesDaysResponse,
  GetCandlesWeeksMonthsResponse,
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

export const getCandlesWeeksMonths = async ({
  count,
  market,
  to,
  unit,
}: GetCandlesWeeksMonthsRequest): Promise<GetCandlesWeeksMonthsResponse> => {
  const { data } = await api.get<GetCandlesWeeksMonthsResponse>(
    `/candles/${unit}?count=${count}&market=${market}&to=${to}T09:00:00Z`,
  );
  return data;
};
