
import React, { useEffect } from 'react';
import type { Server } from '../types';
import CustomLineChart from './LineChart';

interface ServerDetailModalProps {
  server: Server;
  onClose: () => void;
}

const StatusIndicator: React.FC<{ status: Server['status'] }> = ({ status }) => {
    const colorClass = {
      Online: 'bg-green-500',
      Warning: 'bg-yellow-500',
      Offline: 'bg-red-500',
    }[status];
    const animationClass = status === 'Online' ? 'animate-pulse' : '';
    return <span className={`w-3 h-3 rounded-full ${colorClass} ${animationClass}`}></span>;
};

const ServerDetailModal: React.FC<ServerDetailModalProps> = ({ server, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-gray-900/70 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="server-modal-title"
    >
      <div 
        className="bg-gray-50/90 dark:bg-black/50 backdrop-blur-2xl border border-gray-300 dark:border-white/10 rounded-xl shadow-2xl shadow-black/40 w-full max-w-4xl max-h-[90vh] flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-300 dark:border-white/10">
          <div>
            <h2 id="server-modal-title" className="text-2xl font-bold text-gray-900 dark:text-white">{server.name}</h2>
            <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 text-sm mt-1">
                <span className="font-mono">{server.ip}</span>
                <div className="flex items-center space-x-2">
                    <StatusIndicator status={server.status} />
                    <span>{server.status}</span>
                </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-gray-500/10 dark:bg-white/5 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">CPU Load</p>
                    <p className="text-4xl font-bold text-primary-green mt-1">{server.cpuLoad}%</p>
                </div>
                <div className="bg-gray-500/10 dark:bg-white/5 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">RAM Usage</p>
                    <p className="text-4xl font-bold text-primary-cyan mt-1">{server.ramUsage}%</p>
                </div>
                <div className="bg-gray-500/10 dark:bg-white/5 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">Disk Usage</p>
                    <p className="text-4xl font-bold text-gray-800 dark:text-white mt-1">{server.diskUsage}%</p>
                </div>
            </div>
            
            {server.cpuHistory.length > 0 ? (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">CPU Load History (%)</h3>
                        <div className="h-48 w-full bg-gray-500/10 dark:bg-white/5 rounded-lg p-2">
                            <CustomLineChart data={server.cpuHistory} />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                         <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">RAM Usage History (%)</h3>
                            <div className="h-48 w-full bg-gray-500/10 dark:bg-white/5 rounded-lg p-2">
                                <CustomLineChart data={server.ramHistory} />
                            </div>
                        </div>
                         <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Disk Usage History (%)</h3>
                            <div className="h-48 w-full bg-gray-500/10 dark:bg-white/5 rounded-lg p-2">
                                <CustomLineChart data={server.diskHistory} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-16 text-gray-500">
                    <p>No historical data available for this server.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ServerDetailModal;