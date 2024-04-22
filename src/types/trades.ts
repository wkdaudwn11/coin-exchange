type TradesTick = {
  ask_bid: 'ASK' | 'BID';
  change_price: number;
  market: string;
  prev_closing_price: number;
  sequential_id: number;
  timestamp: number;
  trade_date_utc: string;
  trade_price: number;
  trade_time_utc: string;
  trade_volume: number;
};

export type TradeWS = {
  ask_bid: 'ASK' | 'BID';
  change: string;
  change_price: number;
  code: string;
  prev_closing_price: number;
  sequential_id: number;
  stream_type: string;
  timestamp: number;
  trade_date: string;
  trade_price: number;
  trade_time: string;
  trade_timestamp: number;
  trade_volume: number;
  type: string;
};

export type GetTradesTicksRequest = {
  count: string;
  market: string;
};

export type GetTradesTicksResponse = TradesTick[];
