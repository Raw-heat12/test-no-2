/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum TradingPair {
  EURUSD = 'EURUSD',
  GBPUSD = 'GBPUSD',
  AUDUSD = 'AUDUSD',
  NZDUSD = 'NZDUSD',
  USDCHF = 'USDCHF',
  USDCAD = 'USDCAD',
  USDJPY = 'USDJPY',
  GBPJPY = 'GBPJPY',
  XAUUSD = 'XAUUSD',
}

export interface CalculationResult {
  pips: number;
  lotSize: number;
  risk: number;
  pair: TradingPair;
  entry: number;
  stopLoss: number;
  timestamp: number;
}

export interface TradeHistoryItem extends CalculationResult {
  id: string;
}
