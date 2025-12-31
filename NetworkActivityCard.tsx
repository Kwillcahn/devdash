
import React from 'react';
import Card from './Card';
import CustomLineChart from './LineChart';
import type { NetworkStats } from '../types';

interface NetworkActivityCardProps {
  stats: NetworkStats;
}

const NetworkIcon: React.FC<{ direction: 'in' | 'out', className?: string }> = ({ direction, className }) => {
  const path = direction === 'in'
    ? "M12 4.5v15m0 0l-6.75-6.75M12 19.5l6.75-6.75"  // Arrow down for IN
    : "M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"; // Arrow up for OUT
  const color = direction === 'in' ? 'stroke-primary-cyan' : 'stroke-primary-green';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} className={`${className} ${color}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

const NetworkActivityCard: React.FC<NetworkActivityCardProps> = ({ stats }) => {
  const visibleContent = (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Network Activity</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Real-time I/O throughput</p>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="flex items-center justify-center space-x-2">
             <NetworkIcon direction="out" className="w-6 h-6" />
             <p className="text-3xl font-bold text-primary-green">{stats.throughputOut}</p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">OUT (Mbps)</p>
        </div>
        <div>
           <div className="flex items-center justify-center space-x-2">
             <NetworkIcon direction="in" className="w-6 h-6" />
             <p className="text-3xl font-bold text-primary-cyan">{stats.throughputIn}</p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">IN (Mbps)</p>
        </div>
      </div>
    </div>
  );

  const expandedContent = (
    <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
            <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalDataOut.toFixed(1)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Total Data Out (GB)</p>
            </div>
            <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalDataIn.toFixed(1)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Total Data In (GB)</p>
            </div>
        </div>
        <div className="pt-4 mt-2 border-t border-gray-200 dark:border-white/10">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Throughput History (Mbps)</h3>
            <div className="h-40 w-full">
                <CustomLineChart data={stats.history} />
            </div>
        </div>
    </div>
  );

  return (
    <Card expandedContent={expandedContent}>
      {visibleContent}
    </Card>
  );
};

export default NetworkActivityCard;