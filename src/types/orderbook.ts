type Orderbook = {
  market: string;
  orderbook_units: [
    {
      ask_price: number;
      ask_size: number;
      bid_price: number;
      bid_size: number;
    },
  ];
  timestamp: number;
  total_ask_size: number;
  total_bid_size: number;
};

export type GetOrderbookRequest = {
  level: string;
  market: string;
};

export type GetOrderbookResponse = Orderbook[];
