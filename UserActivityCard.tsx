import React from 'react';
import Card from './Card';
import CustomBarChart from './BarChart';
import type { VirtualMachine, ChartDataPoint } from '../types';

interface VirtualMachinesCardProps {
  vms: VirtualMachine[];
}

const StatusIndicator: React.FC<{ status: VirtualMachine['status'] }> = ({ status }) => {
  const colorClass = {
    Running: 'bg-green-500',
    Stopped: 'bg-red-500',
    Suspended: 'bg-yellow-500',
  }[status];
  return <span className={`w-2 h-2 rounded-full ${colorClass}`}></span>;
};

const VirtualMachinesCard: React.FC<VirtualMachinesCardProps> = ({ vms }) => {
  const runningCount = vms.filter(vm => vm.status === 'Running').length;

  const vmChartData: ChartDataPoint[] = vms
    .filter(vm => vm.status === 'Running')
    .map(vm => ({ name: vm.name, value: vm.cpuUsage }));

  const visibleContent = (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Virtual Machines</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Overview of all virtual instances</p>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-3xl font-bold text-primary-cyan">{runningCount}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Running</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{vms.length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Total</p>
        </div>
      </div>
    </div>
  );

  const expandedContent = (
    <div className="space-y-3">
       <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 font-semibold px-2">
            <span>VM Name / Host</span>
            <span>CPU / RAM</span>
        </div>
      {vms.map(vm => (
        <div key={vm.id} className="bg-gray-500/10 dark:bg-white/5 p-2 rounded-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <StatusIndicator status={vm.status} />
              <div>
                <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{vm.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-500">{vm.hostServer}</p>
              </div>
            </div>
            <div className="text-right font-mono text-xs">
                <p className="text-primary-green">{vm.cpuUsage}%</p>
                <p className="text-primary-cyan">{vm.ramUsage}%</p>
            </div>
          </div>
        </div>
      ))}
       <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/10">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Running VM CPU Usage (%)</h3>
            <div className="h-40 w-full">
                <CustomBarChart data={vmChartData} />
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

export default VirtualMachinesCard;