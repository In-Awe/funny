export enum TradeDirection {
  LONG = 'LONG',
  SHORT = 'SHORT',
}

export enum TradeStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface CryptoPair {
  symbol: string;
  last: number;
  change: number;
  isUsdt?: boolean;
}

export interface TradeSignal {
  pair: string;
  direction: TradeDirection;
  entry: number;
  tp1: number;
  tp2: number;
  tp3: number;
  sl: number;
  status: TradeStatus;
  result?: string;
  pnl?: number;
}