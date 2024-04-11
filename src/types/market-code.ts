export type GetMarketCodeRequest = {
  isDetails: boolean;
};

type MarketEventCaution = {
  CONCENTRATION_OF_SMALL_ACCOUNTS: boolean;
  DEPOSIT_AMOUNT_SOARING: boolean;
  GLOBAL_PRICE_DIFFERENCES: boolean;
  PRICE_FLUCTUATIONS: boolean;
  TRADING_VOLUME_SOARING: boolean;
};

type MarketCodeEvent = {
  caution: MarketEventCaution;
  warning: boolean;
};

export type MarketCode = {
  english_name: string;
  korean_name: string;
  market: string;
  market_event?: MarketCodeEvent;
};

export type GetMarketCodeResponse = MarketCode[];
