import { create } from 'zustand';
import type { MarketCode } from '@/types/marketCode';

const initialState: MarketCode = {
  english_name: '',
  korean_name: '',
  market: '',
};

const useActiveMarketCode = create<{
  activeMarketCode: MarketCode;
  clearMarketCode: () => void;
  setMarketCode: (newMarketCode: MarketCode) => void;
}>((set) => ({
  activeMarketCode: initialState,
  clearMarketCode: () => set({ activeMarketCode: initialState }),
  setMarketCode: (newMarketCode) => set({ activeMarketCode: newMarketCode }),
}));

export default useActiveMarketCode;
