import { create } from 'zustand';

import type { MarketCode } from '@/types/marketCode';
import type { TickerWS } from '@/types/tickers';

const initialMarketCode: MarketCode = {
  english_name: '',
  korean_name: '',
  market: '',
};

const useActiveMarketCode = create<{
  activeMarketCode: MarketCode;
  activeMarketInfo: null | TickerWS;
  clearMarketCode: () => void;
  setActiveMarketCode: (newMarketCode: MarketCode) => void;
  setActiveMarketInfo: (newMarketInfo: TickerWS) => void;
}>((set) => ({
  activeMarketCode: initialMarketCode,
  activeMarketInfo: null,
  clearMarketCode: () =>
    set({ activeMarketCode: initialMarketCode, activeMarketInfo: null }),
  setActiveMarketCode: (newMarketCode) =>
    set({ activeMarketCode: newMarketCode }),
  setActiveMarketInfo: (newMarketInfo) =>
    set({ activeMarketInfo: newMarketInfo }),
}));

export default useActiveMarketCode;
