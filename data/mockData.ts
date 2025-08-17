import { CryptoPair, TradeDirection, TradeSignal, TradeStatus } from '../types';

export const cryptoPairs: CryptoPair[] = [
  { symbol: 'USDT.D', last: 4.25, change: 0.05, isUsdt: true },
  { symbol: 'BTCUSD', last: 117439.2, change: 0.03 },
  { symbol: 'ETHUSD', last: 4413.9, change: -0.19 },
  { symbol: 'SOLUSD', last: 188.4, change: -0.69 },
  { symbol: 'XRPUSD', last: 1.0947, change: -0.33 },
  { symbol: 'XLMUSD', last: 0.42544, change: -0.20 },
  { symbol: 'HBARUSI', last: 0.25114, change: -0.41 },
  { symbol: 'LTCUSDT', last: 120.08, change: -0.74 },
  { symbol: 'DOGEUSI', last: 0.23021, change: -0.37 },
  { symbol: 'SUIUSDT', last: 3.7524, change: -0.51 },
  { symbol: 'BNBUSDT', last: 847.4, change: 0.95 },
  { symbol: 'FARTCOI', last: 0.93820, change: -0.29 },
  { symbol: 'LINKUSD', last: 22.52, change: -0.53 },
  { symbol: 'ADAUSD', last: 0.910, change: -1.12 },
  { symbol: 'BCHUSD', last: 587.5, change: 0.07 },
  { symbol: 'UNISDT', last: 10.973, change: -0.31 },
  { symbol: 'CRVUSDT', last: 0.8642, change: -0.11 },
];

export const tradeSignals: TradeSignal[] = [
  { pair: 'IOTAUSDT', direction: TradeDirection.LONG, entry: 0.2073, tp1: 0.2101, tp2: 0.2115, tp3: 0.2148, sl: 0.2059, status: TradeStatus.CLOSED, result: '-1.00R', pnl: -0.68 },
  { pair: 'ILVUSDT', direction: TradeDirection.LONG, entry: 16.582, tp1: 16.155, tp2: 15.917, tp3: 15.448, sl: 16.773, status: TradeStatus.CLOSED, result: '', pnl: 0.13 },
  { pair: 'SANDUSDT', direction: TradeDirection.SHORT, entry: 0.29675, tp1: 0.29108, tp2: 0.28816, tp3: 0.28191, sl: 0.29852, status: TradeStatus.CLOSED, result: '', pnl: 0.88 },
  { pair: 'TRXUSDT', direction: TradeDirection.LONG, entry: 0.34799, tp1: 0.35187, tp2: 0.35358, tp3: 0.35815, sl: 0.34601, status: TradeStatus.CLOSED, result: '', pnl: 0.04 },
  { pair: 'ADAUSDT', direction: TradeDirection.LONG, entry: 0.9084, tp1: 0.9427, tp2: 0.962, tp3: 0.9882, sl: 0.9023, status: TradeStatus.CLOSED, result: '', pnl: 0.23 },
  { pair: 'YFIUSDT', direction: TradeDirection.SHORT, entry: 5617, tp1: 5512, tp2: 5458, tp3: 5342, sl: 5665, status: TradeStatus.OPEN, result: '', pnl: -0.07 },
  { pair: 'ALGOUSDT', direction: TradeDirection.SHORT, entry: 0.2546, tp1: 0.2507, tp2: 0.2489, tp3: 0.2446, sl: 0.2564, status: TradeStatus.CLOSED, result: '-1.00R', pnl: -0.71 },
];


const btcChartData = [
  { name: 'Page A', uv: 108000 },
  { name: 'Page B', uv: 109000 },
  { name: 'Page C', uv: 108500 },
  { name: 'Page D', uv: 110000 },
  { name: 'Page E', uv: 111000 },
  { name: 'Page F', uv: 112500 },
  { name: 'Page G', uv: 114000 },
  { name: 'Page H', uv: 113000 },
  { name: 'Page I', uv: 112000 },
  { name: 'Page J', uv: 115000 },
  { name: 'Page K', uv: 117000 },
  { name: 'Page L', uv: 118000 },
  { name: 'Page M', uv: 122000 },
  { name: 'Page N', uv: 120000 },
  { name: 'Page O', uv: 119000 },
  { name: 'Page P', uv: 121000 },
  { name: 'Page Q', uv: 124000 },
  { name: 'Page R', uv: 122000 },
  { name: 'Page S', uv: 119000 },
  { name: 'Page T', uv: 117439 },
];

const ethChartData = [
    { name: '1', uv: 4000 }, { name: '2', uv: 4100 }, { name: '3', uv: 4050 }, { name: '4', uv: 4200 }, { name: '5', uv: 4150 }, { name: '6', uv: 4300 }, { name: '7', uv: 4250 }, { name: '8', uv: 4350 }, { name: '9', uv: 4400 }, { name: '10', uv: 4380 }, { name: '11', uv: 4413.9 },
];

const solChartData = [
    { name: '1', uv: 150 }, { name: '2', uv: 160 }, { name: '3', uv: 155 }, { name: '4', uv: 170 }, { name: '5', uv: 180 }, { name: '6', uv: 195 }, { name: '7', uv: 185 }, { name: '8', uv: 190 }, { name: '9', uv: 180 }, { name: '10', uv: 188.4 },
];

const genericChartData = [
    { name: '1', uv: 500 }, { name: '2', uv: 510 }, { name: '3', uv: 490 }, { name: '4', uv: 520 }, { name: '5', uv: 530 }, { name: '6', uv: 525 }, { name: '7', uv: 540 },
];

export const historicalChartData: { [symbol: string]: { name: string; uv: number }[] } = {
    'BTCUSD': btcChartData,
    'ETHUSD': ethChartData,
    'SOLUSD': solChartData,
    'XRPUSD': genericChartData.map(d => ({...d, uv: d.uv / 500 * 1.09})),
    'ADAUSD': genericChartData.map(d => ({...d, uv: d.uv / 500 * 0.91})),
    // Use a default for any other symbol to prevent crashes
    'default': genericChartData,
};

export const volumeProfileData = [
    { level: 124000, volume: 20 },
    { level: 122000, volume: 40 },
    { level: 120000, volume: 30 },
    { level: 118000, volume: 60 },
    { level: 116000, volume: 90 },
    { level: 114000, volume: 80 },
    { level: 112000, volume: 50 },
    { level: 110000, volume: 70 },
    { level: 108000, volume: 100 },
    { level: 106000, volume: 40 },
    { level: 104000, volume: 20 },
];