
import React from 'react';
import Card from './Card';
import CustomBarChart from './BarChart';
import type { DockerContainer, ChartDataPoint } from '../types';

interface DockerContainersCardProps {
  containers: DockerContainer[];
}

const StatusIndicator: React.FC<{ status: DockerContainer['status'] }> = ({ status }) => {
  const colorClass = {
    Running: 'bg-green-500 animate-pulse',
    Exited: 'bg-gray-500',
    Paused: 'bg-yellow-500',
  }[status];
  return <span className={`w-2.5 h-2.5 rounded-full ${colorClass}`}></span>;
};


const DockerContainersCard: React.FC<DockerContainersCardProps> = ({ containers }) => {
  const runningCount = containers.filter(c => c.status === 'Running').length;

  const containerChartData: ChartDataPoint[] = containers
    .filter(c => c.status === 'Running')
    .map(c => ({ name: c.name, value: c.memUsage }));
  
  const visibleContent = (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Docker Containers</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Live status of application containers</p>
      
      <div className="flex items-baseline justify-between">
          <div className="text-left">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Running</p>
            <p className="text-4xl font-bold text-primary-green">{runningCount}</p>
          </div>
          <div className="text-right">
             <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Total</p>
            <p className="text-4xl font-bold text-gray-800 dark:text-white">{containers.length}</p>
          </div>
      </div>
    </div>
  );

  const expandedContent = (
    <div className="space-y-3">
        <div className="grid grid-cols-5 items-center text-xs text-gray-500 dark:text-gray-400 font-semibold px-2">
            <span className="col-span-2">Container</span>
            <span className="col-span-2">Image</span>
            <span className="text-right">Mem (MB)</span>
        </div>
        {containers.map(container => (
            <div key={container.id} className="grid grid-cols-5 items-center text-sm bg-gray-500/10 dark:bg-white/5 p-2 rounded-md">
                <div className="col-span-2 flex items-center space-x-2 truncate">
                    <StatusIndicator status={container.status}/>
                    <span className="truncate" title={container.name}>{container.name}</span>
                </div>
                <div className="col-span-2 text-gray-600 dark:text-gray-400 text-xs truncate" title={container.image}>
                    {container.image}
                </div>
                <div className="text-right font-mono text-primary-cyan text-xs">
                    {container.memUsage}MB
                </div>
            </div>
        ))}
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/10">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Running Container Memory Usage (MB)</h3>
            <div className="h-40 w-full">
              {containerChartData.length > 0 ? (
                <CustomBarChart data={containerChartData} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No running containers to display.
                </div>
              )}
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

export default DockerContainersCard;