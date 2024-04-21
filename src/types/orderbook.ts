type OrderbookUnits = {
  ask_price: number;
  ask_size: number;
  bid_price: number;
  bid_size: number;
};

type Orderbook = {
  level: number;
  market: string;
  orderbook_units: OrderbookUnits[];
  timestamp: number;
  total_ask_size: number;
  total_bid_size: number;
};

export type OrderbookWS = {
  code: string;
  level: number;
  orderbook_units: OrderbookUnits[];
  stream_type: string;
  timestamp: number;
  total_ask_size: number;
  total_bid_size: number;
  type: string;
};

export type GetOrderbookRequest = {
  level: string;
  market: string;
};

export type GetOrderbookResponse = Orderbook[];
