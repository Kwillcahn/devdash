import React from 'react';
import Card from './Card';
import CustomLineChart from './LineChart';
import type { Server } from '../types';

interface ServerHealthCardProps {
  servers: Server[];
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

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
  <div className="w-full bg-gray-300/50 dark:bg-white/10 rounded-full h-2">
    <div
      className="bg-gradient-to-r from-primary-green to-primary-cyan h-2 rounded-full"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

const ServerStatusCard: React.FC<ServerHealthCardProps> = ({ servers }) => {
  const onlineCount = servers.filter(s => s.status === 'Online').length;
  
  const visibleContent = (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Server Health</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Live status of physical & virtual servers</p>
      <div className="flex items-center justify-between text-lg">
        <span className="font-semibold">{onlineCount} / {servers.length} Online</span>
        <div className="flex items-center space-x-2">
          <StatusIndicator status="Online" />
          <span className="text-sm text-gray-600 dark:text-gray-300">Operational</span>
        </div>
      </div>
    </div>
  );

  const mainServer = servers.find(s => s.cpuHistory && s.cpuHistory.length > 0);

  const expandedContent = (
    <div className="space-y-4">
      {servers.map(server => (
        <div key={server.id}>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center space-x-2">
              <StatusIndicator status={server.status} />
              <span className="font-semibold text-sm truncate" title={server.name}>{server.name}</span>
            </div>
            <span className="text-xs font-mono text-gray-500">{server.ip}</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs text-gray-500 dark:text-gray-400">
            <div>
              <span>CPU {server.cpuLoad}%</span>
              <ProgressBar value={server.cpuLoad} />
            </div>
             <div>
              <span>RAM {server.ramUsage}%</span>
              <ProgressBar value={server.ramUsage} />
            </div>
            <div>
              <span>DISK {server.diskUsage}%</span>
              <ProgressBar value={server.diskUsage} />
            </div>
          </div>
        </div>
      ))}
      {mainServer && (
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/10 space-y-4">
            <div>
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">{mainServer.name} CPU Load (%)</h3>
                <div className="h-32 w-full">
                    <CustomLineChart data={mainServer.cpuHistory} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">RAM Usage (%)</h3>
                    <div className="h-24 w-full">
                        <CustomLineChart data={mainServer.ramHistory} />
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Disk Usage (%)</h3>
                    <div className="h-24 w-full">
                        <CustomLineChart data={mainServer.diskHistory} />
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );

  return (
    <Card expandedContent={expandedContent}>
      {visibleContent}
    </Card>
  );
};

export default ServerStatusCard;