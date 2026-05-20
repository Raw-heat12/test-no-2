/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TradingPair } from '../types';

export const getPipSize = (pair: TradingPair): number => {
  if (pair === TradingPair.XAUUSD) {
    return 0.10; // 1 pip = 0.10 for Gold
  }
  if (pair.includes('JPY')) {
    return 0.01; // 1 pip = 0.01 for JPY pairs
  }
  return 0.0001; // 1 pip = 0.0001 for normal Forex pairs
};

export const getPipValue = (
  pair: TradingPair, 
  currentPrice: number
): number => {
  const lotSize = 100000;
  const pipSize = getPipSize(pair);

  // 1. Gold & XXX/USD Pairs (EURUSD, GBPUSD, AUDUSD, NZDUSD)
  // These have a fixed pip value of $10.00 per standard lot
  if (pair === TradingPair.XAUUSD || pair.endsWith('USD')) {
    return 10.00;
  }

  // 2. JPY Pairs (USDJPY, GBPJPY)
  // Trick: 1,000 JPY / Current USDJPY Rate = Pip Value in USD
  // For GBPJPY, we use a fixed approx or current price if available.
  if (pair.includes('JPY')) {
    if (currentPrice <= 0) return 6.50; // Standard $6-$7 fallback
    
    // For JPY pairs, pip value is significantly affected by the USDJPY rate.
    // If the pair is USDJPY, the math is exact: 1000 / Price
    return Number((1000 / currentPrice).toFixed(2));
  }

  // 3. USD/XXX Pairs (USDCHF, USDCAD)
  // Rule: Pip Value = (Lot Size * Pip Size) / Current Price
  if (pair.startsWith('USD')) {
    if (currentPrice <= 0) return 10.00;
    const valueInUsd = (lotSize * pipSize) / currentPrice;
    return Number(valueInUsd.toFixed(2));
  }

  return 10.00;
};

export const calculatePips = (entry: number, stopLoss: number, pair: TradingPair): number => {
  const pipSize = getPipSize(pair);
  const diff = Math.abs(entry - stopLoss);
  // Gold Formula: Pips = Price Difference ÷ 0.10
  // General: Pips = abs(entry - stopLoss) / pipSize
  return Number((diff / pipSize).toFixed(1));
};

export const calculateLotSize = (riskAmount: number, pips: number, pipValue: number): number => {
  if (pips <= 0 || pipValue <= 0) return 0;
  // Lot Size = Risk Amount ÷ (Pips × Pip Value)
  const lotSize = riskAmount / (pips * pipValue);
  return Number(lotSize.toFixed(2));
};
