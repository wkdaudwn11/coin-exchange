'use client';

import React from 'react';

import type { MarketCode } from '@/types/marketCode';

type Props = {
  marketCodes: MarketCode[];
};

const MarketCodeList = ({ marketCodes }: Props) => {
  console.log(marketCodes);
  return <div>MarketCodeList</div>;
};

export default MarketCodeList;
