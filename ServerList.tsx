
import React, { useState, useMemo } from 'react';
import type { Server } from '../types';
import ServerDetailModal from './ServerDetailModal';

const StatusIndicator: React.FC<{ status: Server['status'] }> = ({ status }) => {
  const colorClass = {
    Online: 'bg-green-500',
    Warning: 'bg-yellow-500',
    Offline: 'bg-red-500',
  }[status];

  const animationClass = status === 'Online' ? 'animate-pulse' : '';

  return (
    <div className="flex items-center space-x-2">
        <span className={`w-3 h-3 rounded-full ${colorClass} ${animationClass}`}></span>
        <span className="hidden md:inline">{status}</span>
    </div>
  );
};

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
    <div className="w-full bg-gray-300/50 dark:bg-white/10 rounded-full h-1.5">
      <div
        className="bg-gradient-to-r from-primary-green to-primary-cyan h-1.5 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
);

interface ServerListProps {
  servers: Server[];
}

type SortableKey = 'name' | 'ip' | 'cpuLoad' | 'ramUsage' | 'diskUsage';

const ServerList: React.FC<ServerListProps> = ({ servers }) => {
  const [sortConfig, setSortConfig] = useState<{ key: SortableKey | null; direction: 'ascending' | 'descending' }>({
    key: 'name',
    direction: 'ascending',
  });
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  const sortedServers = useMemo(() => {
    let sortableItems = [...servers];
    if (sortConfig.key) {
      const key = sortConfig.key;
      sortableItems.sort((a, b) => {
        if (a[key] < b[key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [servers, sortConfig]);
  
  const requestSort = (key: SortableKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const SortableHeader: React.FC<{ title: string; sortKey: SortableKey; className?: string }> = ({ title, sortKey, className }) => {
    const isActive = sortConfig.key === sortKey;
    const icon = isActive ? (
      sortConfig.direction === 'ascending' ? (
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )
    ) : (
      <svg className="w-4 h-4 text-gray-500 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
    );

    return (
        <div className={className}>
            <button onClick={() => requestSort(sortKey)} className={`flex items-center group focus:outline-none transition-colors ${isActive ? 'text-primary-green' : 'hover:text-gray-900 dark:hover:text-white'}`}>
                <span>{title}</span>
                <span className="ml-1.5">{icon}</span>
            </button>
        </div>
    );
  };

  return (
    <>
      <div className="bg-white/60 dark:bg-black/30 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl p-4 sm:p-6">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider border-b border-gray-200 dark:border-white/10 pb-3 mb-3 px-4">
          <SortableHeader title="Server Name" sortKey="name" className="col-span-5 md:col-span-4" />
          <SortableHeader title="IP Address" sortKey="ip" className="hidden md:block md:col-span-2" />
          <div className="col-span-2">Status</div>
          <SortableHeader title="CPU" sortKey="cpuLoad" className="col-span-2 justify-center" />
          <SortableHeader title="RAM" sortKey="ramUsage" className="col-span-1 justify-center" />
          <SortableHeader title="Disk" sortKey="diskUsage" className="col-span-2 md:col-span-1 justify-center" />
        </div>
        
        {/* Table Body */}
        <div className="space-y-2">
          {sortedServers.map(server => (
            <div 
              key={server.id} 
              onClick={() => setSelectedServer(server)}
              className="grid grid-cols-12 gap-4 items-center bg-gray-500/10 dark:bg-white/5 hover:bg-gray-500/20 dark:hover:bg-white/10 transition-colors duration-200 rounded-lg p-4 text-sm cursor-pointer" 
              role="button"
              tabIndex={0}
              aria-label={`View details for ${server.name}`}
            >
              <div className="col-span-5 md:col-span-4 font-semibold text-gray-900 dark:text-white truncate" title={server.name}>
                {server.name}
              </div>
              <div className="hidden md:block md:col-span-2 font-mono text-gray-600 dark:text-gray-300">
                {server.ip}
              </div>
              <div className="col-span-2">
                <StatusIndicator status={server.status} />
              </div>
              <div className="col-span-2">
                  <ProgressBar value={server.cpuLoad} />
                  <span className="text-xs text-gray-600 dark:text-gray-400 text-center block mt-1">{server.cpuLoad}%</span>
              </div>
              <div className="col-span-1 text-center">
                <span className="font-semibold text-primary-cyan">{server.ramUsage}%</span>
              </div>
              <div className="col-span-2 md:col-span-1 text-center">
                <span className="font-semibold text-primary-green">{server.diskUsage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedServer && (
        <ServerDetailModal 
          server={selectedServer} 
          onClose={() => setSelectedServer(null)} 
        />
      )}
    </>
  );
};

export default ServerList;