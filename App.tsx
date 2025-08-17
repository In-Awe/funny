import React, { useState } from 'react';
import ChartComponent from './components/ChartComponent';
import { Header, Sidebar, InfoPanel } from './components/DashboardPanels';
import { CryptoPair, TradeSignal } from './types';
import { cryptoPairs, tradeSignals, historicalChartData } from './data/mockData';


// Modal Component
const ConnectBinanceModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  isConnected: boolean;
}> = ({ isOpen, onClose, onConnect, apiKey, setApiKey, isConnected }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#1A1E29] p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6">Connect Binance API</h2>
        {isConnected ? (
          <div className="text-center">
            <p className="text-green-400 text-lg mb-4">Successfully Connected!</p>
            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); onConnect(); }}>
            <div className="mb-6">
              <label htmlFor="apiKey" className="block text-gray-400 text-sm font-bold mb-2">API Key</label>
              <input
                id="apiKey"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your API Key"
              />
            </div>
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Connect
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const [appData, setAppData] = useState<{
    pairs: CryptoPair[];
    signals: TradeSignal[];
    charts: { [symbol: string]: { name: string; uv: number }[] };
  } | null>(null);
  
  const handleConnect = () => {
    if (apiKey) {
      console.log("Connecting with API Key:", apiKey);
      // Simulate successful API call and data fetching
      setIsConnected(true);
      setAppData({
        pairs: cryptoPairs,
        signals: tradeSignals,
        charts: historicalChartData,
      });
      setSelectedSymbol('BTCUSD'); // Set a default symbol after loading data

      setTimeout(() => {
        setIsModalOpen(false);
      }, 1500);
    } else {
      alert("Please enter your API Key.");
    }
  };


  return (
    <div className="h-screen w-screen overflow-hidden text-gray-300 font-sans bg-[#0D1017] flex flex-col">
      <Header 
        selectedSymbol={selectedSymbol}
        isConnected={isConnected}
        onConnectClick={() => setIsModalOpen(true)}
        cryptoPairs={appData?.pairs || []}
      />
      <main className="flex-grow flex">
        <div className="flex-grow flex flex-col">
          <ChartComponent 
            selectedSymbol={selectedSymbol} 
            historicalChartData={appData?.charts || {}} 
          />
          <InfoPanel 
            tradeSignals={appData?.signals || []}
            cryptoPairs={appData?.pairs || []}
            selectedSymbol={selectedSymbol}
            isConnected={isConnected}
          />
        </div>
        <Sidebar 
          selectedSymbol={selectedSymbol}
          onSelectSymbol={setSelectedSymbol}
          cryptoPairs={appData?.pairs || []}
        />
      </main>
      <ConnectBinanceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={handleConnect}
        apiKey={apiKey}
        setApiKey={setApiKey}
        isConnected={isConnected}
      />
    </div>
  );
};

export default App;