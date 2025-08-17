import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { volumeProfileData } from '../data/mockData';

const ChartAnnotation: React.FC<{ top?: string, left?: string, right?: string, bottom?: string, text: string, color: string, arrow?: 'left' | 'right' }> = ({ top, left, right, bottom, text, color, arrow }) => {
    const style = { top, left, right, bottom };
    return (
        <div className="absolute flex items-center" style={style}>
            {arrow === 'right' && <div className="w-16 h-px bg-white mr-2"></div>}
            <div className={`text-xs font-bold ${color}`}>{text}</div>
            {arrow === 'left' && <div className="w-16 h-px bg-white ml-2"></div>}
        </div>
    );
};

const VolumeProfile: React.FC = () => (
    <div className="absolute right-0 top-0 bottom-0 w-24 flex flex-col justify-center">
        {volumeProfileData.map(data => (
            <div key={data.level} className="w-full relative h-4 my-0.5">
                <div className="absolute right-0 h-full bg-blue-500/20" style={{ width: `${data.volume}%`}}></div>
                {data.level === 108000 && (
                     <div className="absolute right-0 h-full bg-red-500/60" style={{ width: `${data.volume}%`}}></div>
                )}
            </div>
        ))}
    </div>
);


const ChartComponent: React.FC<{ 
  selectedSymbol: string | null;
  historicalChartData: { [symbol: string]: { name: string; uv: number }[] };
}> = ({ selectedSymbol, historicalChartData }) => {
    const data = selectedSymbol ? historicalChartData[selectedSymbol] : null;

    if (!data) {
        return (
            <div className="flex-grow p-1 relative bg-[#131722] border-t border-b border-gray-800 flex items-center justify-center">
                <p className="text-gray-500 text-center">
                    Please connect to the API and select a symbol to view the chart.
                </p>
            </div>
        );
    }
    
    const showBtcAnnotations = selectedSymbol === 'BTCUSD';

    return (
      <div className="flex-grow p-1 relative bg-[#131722] border-t border-b border-gray-800">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" hide />
            <YAxis 
                domain={['dataMin - (dataMax-dataMin)*0.1', 'dataMax + (dataMax-dataMin)*0.1']} 
                hide 
                orientation="right" 
            />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>

        {/* Overlays and Annotations */}
        <div className="absolute inset-0 pointer-events-none p-4">
            {showBtcAnnotations && (
                <>
                    {/* Liquidity Levels */}
                    <ChartAnnotation top="5%" right="15%" text="1Y LIQUIDITY: $126 200" color="text-red-500" />
                    <ChartAnnotation top="10%" right="15%" text="1W LIQUIDITY: $124 300" color="text-green-400" />
                    <ChartAnnotation top="12%" right="25%" text="SFP" color="text-white" arrow="left" />
                    <ChartAnnotation top="15%" right="10%" text="ATH" color="text-gray-400" />
                    <ChartAnnotation top="20%" right="15%" text="2W LIQUIDITY: $121 100" color="text-green-400" />
                    <ChartAnnotation top="40%" right="15%" text="1W LIQUIDITY: $114 500" color="text-red-500" />
                    <ChartAnnotation top="50%" right="15%" text="2W LIQUIDITY: $111 111" color="text-red-500" />
                    <div className="absolute w-full h-[2px] bg-green-500/50" style={{top: '60%'}}></div>
                    <ChartAnnotation top="62%" right="20%" text="Level to watch" color="text-white" arrow="left" />
                    <ChartAnnotation top="64%" right="20%" text="GP + nPOC + VWAP" color="text-white" arrow="left" />
                    <div className="absolute w-full h-[4px] bg-purple-500/50" style={{top: '78%'}}></div>
                    <ChartAnnotation top="72%" right="20%" text="Level to watch" color="text-white" arrow="left" />
                    <ChartAnnotation top="74%" right="20%" text="Macro POC + Impulse + range low" color="text-white" arrow="left" />
                    <ChartAnnotation bottom="5%" right="15%" text="1M LIQUIDITY: $94 200" color="text-red-500" />

                    {/* Price lines */}
                    <div className="absolute w-full h-px bg-yellow-500/80" style={{top: '48%'}}></div>
                    <div className="absolute w-full h-px bg-orange-500/80" style={{top: '55%'}}></div>
                    
                    {/* Volume Profile */}
                    <VolumeProfile />
                </>
            )}

            {/* AI Bot Character */}
            <div className="absolute bottom-20 left-4 w-24 h-32">
                 <img src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f916.svg" alt="AI Bot" className="w-full h-full drop-shadow-lg" />
            </div>

        </div>
      </div>
    );
  };
  
  export default ChartComponent;