type CandlesMinutes = {
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  candle_date_time_kst: string;
  candle_date_time_utc: string;
  high_price: number;
  low_price: number;
  market: string;
  opening_price: number;
  timestamp: number;
  trade_price: number;
  unit: number;
};

type CandlesDays = {
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  candle_date_time_kst: string;
  candle_date_time_utc: string;
  change_price: number;
  change_rate: number;
  converted_trade_price: number;
  high_price: number;
  low_price: number;
  market: string;
  opening_price: number;
  prev_closing_price: number;
  timestamp: number;
  trade_price: number;
};

export type GetCandlesRequest = {
  count: string;
  market: string;
  unit: string;
};

export type GetCandlesDaysRequest = {
  convertingPriceUnit?: string;
  count: string;
  market: string;
  to: string;
};

export type GetCandlesMinutesResponse = CandlesMinutes[];

export type GetCandlesDaysResponse = CandlesDays[];
