import React, { useState, useEffect } from 'react';
import { CryptoPair, TradeDirection, TradeSignal, TradeStatus } from '../types';
import { CogIcon, PlusIcon, UsdIcon, FireIcon, ChartBarIcon } from './icons';

export const Header: React.FC<{ 
  selectedSymbol: string | null;
  isConnected: boolean;
  onConnectClick: () => void;
  cryptoPairs: CryptoPair[];
}> = ({ selectedSymbol, isConnected, onConnectClick, cryptoPairs }) => {
  const currentPair = cryptoPairs.find(p => p.symbol === selectedSymbol);
  const price = currentPair ? currentPair.last.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-';

  return (
    <header className="flex-shrink-0 h-12 bg-[#131722] border-b border-gray-800 flex items-center px-4 justify-between text-sm">
      <div className="flex items-center space-x-4">
        <h1 className="font-bold text-white">{selectedSymbol ? `${selectedSymbol} Perpetual Contract - BYBIT` : 'Crypto Trading Dashboard'}</h1>
        {isConnected && (
            <div className="flex items-center space-x-2">
            <span className="text-green-500 font-semibold">{price}</span>
            <span className="text-gray-400">-.--</span>
            <span className="text-gray-400">-.--</span>
            <span className="text-gray-400">-.--</span>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {isConnected ? (
           <div className="flex items-center space-x-2">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-green-400 font-semibold">Connected</span>
           </div>
        ) : (
          <button 
            onClick={onConnectClick}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded transition-colors"
          >
            Connect API
          </button>
        )}
        <button className="px-3 py-1 bg-yellow-500 text-black font-bold text-xs rounded">VIP</button>
        <div className="flex items-center space-x-2 p-1 bg-gray-800 rounded">
            <UsdIcon />
            <FireIcon />
            <ChartBarIcon />
        </div>
        <CogIcon />
        <PlusIcon />
      </div>
    </header>
  );
};

export const Sidebar: React.FC<{
  selectedSymbol: string | null;
  onSelectSymbol: (symbol: string) => void;
  cryptoPairs: CryptoPair[];
}> = ({ selectedSymbol, onSelectSymbol, cryptoPairs }) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-[#131722] border-l border-gray-800 flex flex-col">
      <div className="p-2 border-b border-gray-800">
        <input type="text" placeholder="Search..." className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
      </div>
      <div className="flex-grow overflow-y-auto">
        {cryptoPairs.length > 0 ? (
          <table className="w-full text-xs text-left">
            <thead className="text-gray-400">
              <tr>
                <th className="p-2 font-normal">Symbol</th>
                <th className="p-2 font-normal text-right">Last</th>
                <th className="p-2 font-normal text-right">Chg%</th>
              </tr>
            </thead>
            <tbody>
              {cryptoPairs.map((pair: CryptoPair) => (
                <tr 
                  key={pair.symbol} 
                  className={`cursor-pointer hover:bg-gray-800/50 ${selectedSymbol === pair.symbol ? 'bg-blue-800/50' : ''}`}
                  onClick={() => onSelectSymbol(pair.symbol)}
                >
                  <td className="p-2 font-semibold">{pair.symbol}</td>
                  <td className="p-2 text-right font-mono">{pair.isUsdt ? pair.last.toFixed(2) : pair.last.toLocaleString()}</td>
                  <td className={`p-2 text-right font-mono ${pair.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {pair.change.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-4 text-center text-gray-500 text-sm">
            Connect to API to load symbols.
          </div>
        )}
      </div>
    </aside>
  );
};

const AIBotAnalysis: React.FC = () => {
    const initialLogs = [
        "Analyzing ARUSDT: fetching klines, market structure, liquidity, order blocks...",
        "Analyzing GRTUSDT: fetching klines, market structure, liquidity, order blocks...",
        "Analyzing CHZUSDT: fetching klines, market structure, liquidity, order blocks...",
        "Scan round finished. Waiting next cycle.",
    ];
    const [logs, setLogs] = useState(initialLogs);

    useEffect(() => {
      const interval = setInterval(() => {
        setLogs(prev => [...prev.slice(1), prev[0]]);
      }, 3000);
      return () => clearInterval(interval);
    }, []);
    
    return (
        <div className="p-2 text-xs h-full flex flex-col">
            <div className="flex-grow overflow-y-auto">
                {logs.map((log, index) => (
                    <div key={index} className="flex items-start mb-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 mt-1 flex-shrink-0"></div>
                        <p>{log}</p>
                    </div>
                ))}
            </div>
            <div className="mt-2">
                <p className="text-yellow-400 mb-1">Bot thinking...</p>
                <div className="w-full bg-gray-700 h-1 rounded">
                    <div className="bg-yellow-400 h-1 rounded w-1/3 animate-pulse"></div>
                </div>
            </div>
        </div>
    )
};

const BotStatistics: React.FC = () => (
    <div className="p-4 flex items-center justify-around h-full text-center">
        <div className="border border-gray-700 p-3 rounded bg-gray-800/50 w-32">
            <p className="text-2xl font-bold text-green-400">65.22%</p>
            <p className="text-xs text-gray-400">Winrate</p>
        </div>
        <div className="border border-gray-700 p-3 rounded bg-gray-800/50 w-32">
            <p className="text-2xl font-bold text-white">105/56</p>
            <p className="text-xs text-gray-400">Wins/Losses</p>
        </div>
        <div className="border border-gray-700 p-3 rounded bg-gray-800/50 w-32">
            <p className="text-2xl font-bold text-green-400">+602.97%</p>
            <p className="text-xs text-gray-400">P/L</p>
        </div>
    </div>
);

const SignalsTable: React.FC<{ signals: TradeSignal[] }> = ({ signals }) => (
    <div className="p-1 h-full overflow-y-auto">
        <table className="w-full text-xs text-left">
            <thead>
                <tr className="text-gray-400">
                    {['Pair', 'Direction', 'Entry', 'TP1', 'TP2', 'SL', 'Status', 'Result', 'P/L'].map(h => 
                        <th key={h} className="p-1 font-normal">{h}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {signals.length > 0 ? signals.map((signal, index) => (
                    <tr key={index} className="border-t border-gray-800 font-mono">
                        <td className="p-1 font-sans font-semibold">{signal.pair}</td>
                        <td className="p-1">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${signal.direction === TradeDirection.LONG ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {signal.direction}
                            </span>
                        </td>
                        <td className="p-1">{signal.entry}</td>
                        <td className="p-1">{signal.tp1}</td>
                        <td className="p-1">{signal.tp2}</td>
                        <td className="p-1">{signal.sl}</td>
                        <td className={`p-1 font-sans ${signal.status === TradeStatus.OPEN ? 'text-yellow-400' : 'text-gray-500'}`}>{signal.status}</td>
                        <td className="p-1">{signal.result}</td>
                        <td className={`p-1 ${signal.pnl && signal.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {signal.pnl?.toFixed(2)}%
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan={9} className="text-center p-4 text-gray-500">
                            No signal data available.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

const Clock: React.FC = () => {
    const [time, setTime] = useState({ h: 19, m: 28, s: 4 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prev => {
                let { h, m, s } = prev;
                s--;
                if (s < 0) { s = 59; m--; }
                if (m < 0) { m = 59; h--; }
                if (h < 0) { h = 23; }
                return { h, m, s };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const pad = (num: number) => num.toString().padStart(2, '0');

    return (
        <div className="text-center">
            <p className="text-gray-400">Sydney open</p>
            <div className="text-4xl font-mono tracking-widest">
                <span>{pad(time.h)}</span>
                <span className="animate-pulse">:</span>
                <span>{pad(time.m)}</span>
                <span className="animate-pulse">:</span>
                <span>{pad(time.s)}</span>
            </div>
            <div className="text-xs text-gray-500 flex justify-center space-x-4">
                <span>HOURS</span><span>MINUTES</span><span>SECONDS</span>
            </div>
        </div>
    )
};

const BigPrice: React.FC<{
    cryptoPairs: CryptoPair[],
    selectedSymbol: string | null
}> = ({ cryptoPairs, selectedSymbol }) => {
    const [price, setPrice] = useState<number | null>(null);

    useEffect(() => {
        const currentPair = cryptoPairs.find(p => p.symbol === selectedSymbol);
        const initialPrice = currentPair ? currentPair.last : null;
        setPrice(initialPrice);

        if (initialPrice) {
            const interval = setInterval(() => {
                setPrice(p => (p || 0) + (Math.random() - 0.5) * (initialPrice * 0.0001));
            }, 1500);
            return () => clearInterval(interval);
        }
    }, [selectedSymbol, cryptoPairs]);

    return (
         <div className="text-6xl font-mono font-bold text-white text-center tracking-wider">
            {price ? Math.round(price).toLocaleString() : '-'}
        </div>
    );
};

export const InfoPanel: React.FC<{
    tradeSignals: TradeSignal[],
    cryptoPairs: CryptoPair[],
    selectedSymbol: string | null,
    isConnected: boolean,
}> = ({ tradeSignals, cryptoPairs, selectedSymbol, isConnected }) => {
  const [activeTab, setActiveTab] = useState('New Signal');
  
  const TabButton: React.FC<{name: string}> = ({name}) => (
    <button
        onClick={() => setActiveTab(name)}
        className={`px-3 py-1 text-xs font-semibold rounded-t-md border-b-2 ${activeTab === name ? 'bg-gray-800 border-blue-500 text-white' : 'border-transparent text-gray-400 hover:bg-gray-800/50'}`}
    >
        {name}
    </button>
  );

  return (
    <div className="h-64 flex-shrink-0 bg-[#131722] grid grid-cols-[25%_45%_30%]">
        <div className="col-span-1 border-r border-gray-800 flex flex-col">
            <div className="flex-shrink-0 border-b border-gray-800 px-2">
                <TabButton name="AI Bot Analysis" />
            </div>
            <div className="flex-grow">
                <AIBotAnalysis />
            </div>
        </div>

        <div className="col-span-1 flex flex-col justify-center items-center space-y-4 relative">
             <div className="absolute top-4 left-4 border border-gray-700 p-2 text-center rounded bg-gray-800/50">
                <p className="text-yellow-400">65.22%</p>
            </div>
             <div className="absolute top-4 right-4 border border-gray-700 p-2 text-center rounded bg-gray-800/50">
                <p className="text-white">105/56</p>
            </div>
             <div className="absolute bottom-4 right-4 border border-gray-700 p-2 text-center rounded bg-gray-800/50">
                <p className="text-green-400">+602.97%</p>
            </div>

            <Clock />
            <div className="text-center py-2 px-6 bg-black">
                <p className="text-sm">Get notified on Telegram or Discord when the bot opens a new trade.</p>
                <p className="font-bold text-yellow-400">Type !VIP in chat</p>
            </div>
            <BigPrice cryptoPairs={cryptoPairs} selectedSymbol={selectedSymbol} />
        </div>

        <div className="col-span-1 border-l border-gray-800 flex flex-col">
            <div className="flex-shrink-0 border-b border-gray-800 px-2 flex space-x-1">
                <TabButton name="New Signal" />
                <TabButton name="Last 5 Signals" />
            </div>
            <div className="flex-grow">
                 <SignalsTable signals={isConnected ? (activeTab === 'New Signal' ? tradeSignals.slice(0, 1) : tradeSignals.slice(1)) : []} />
            </div>
        </div>
    </div>
  );
};