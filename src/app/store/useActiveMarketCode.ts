import { create } from 'zustand';

import type { MarketCode } from '@/types/marketCode';

const initialState: MarketCode = {
  english_name: '',
  korean_name: '',
  market: '',
};

const useActiveMarketCode = create((set) => ({
  ...initialState,
  setMarketCode: () => set((marketCode: MarketCode) => ({ ...marketCode })),
  clearMarketCode: () => set(() => ({ ...initialState })),
}));

export default useActiveMarketCode;
