import React, { useState, useEffect } from 'react';
import Card from './Card';
import CustomLineChart from './LineChart';
import type { SystemInfo, ChartDataPoint } from '../types';

interface SystemInfoCardProps {
    systemInfo: SystemInfo;
}

const ProgressBar: React.FC<{ value: number; color: 'green' | 'cyan' }> = ({ value, color }) => {
    const colorClass = color === 'green' ? 'bg-primary-green' : 'bg-primary-cyan';
    return (
        <div className="w-full bg-gray-300/50 dark:bg-white/10 rounded-full h-2">
            <div
            className={`${colorClass} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${value}%` }}
            ></div>
        </div>
    );
};


const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="font-semibold text-gray-800 dark:text-gray-200 truncate text-base" title={value}>{value}</p>
    </div>
);

const SystemInfoCard: React.FC<SystemInfoCardProps> = ({ systemInfo }) => {
    const [cpuData, setCpuData] = useState<ChartDataPoint[]>(systemInfo.cpuHistory || []);
    const [memData, setMemData] = useState<ChartDataPoint[]>(systemInfo.memoryHistory || []);
    
    useEffect(() => {
        const interval = setInterval(() => {
            const updateData = (prevData: ChartDataPoint[], variance: number) => {
                const lastValue = prevData.length > 0 ? prevData[prevData.length - 1].value : 50;
                const newValue = Math.min(100, Math.max(0, lastValue + (Math.random() * variance - (variance / 2))));
                const newPoint = { name: 'Now', value: Math.round(newValue) };
                
                const newData = [...prevData.slice(1), newPoint];
                
                return newData.map((p, i) => {
                    const secondsAgo = (newData.length - 1 - i) * 2;
                    return { ...p, name: i === newData.length - 1 ? 'Now' : `-${secondsAgo}s` };
                });
            };

            setCpuData(prev => updateData(prev, 10));
            setMemData(prev => updateData(prev, 4));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const currentCpu = cpuData.length > 0 ? cpuData[cpuData.length - 1].value : systemInfo.cpuUsage;
    const currentMem = memData.length > 0 ? memData[memData.length - 1].value : systemInfo.memoryUsage;

    const visibleContent = (
        <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">System Status</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Real-time host machine metrics</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="flex justify-between items-baseline mb-1">
                        <span className="text-gray-600 dark:text-gray-300 text-sm">CPU Usage</span>
                        <span className="font-bold text-lg text-primary-green">{currentCpu}%</span>
                    </div>
                    <ProgressBar value={currentCpu} color="green" />
                </div>
                <div>
                    <div className="flex justify-between items-baseline mb-1">
                        <span className="text-gray-600 dark:text-gray-300 text-sm">Memory Usage</span>
                        <span className="font-bold text-lg text-primary-cyan">{currentMem}%</span>
                    </div>
                    <ProgressBar value={currentMem} color="cyan" />
                </div>
            </div>
        </div>
    );

    const expandedContent = (
         <div className="space-y-6">
            <div>
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Hardware & OS Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                    <InfoRow label="Operating System" value={systemInfo.os} />
                    <InfoRow label="Hostname" value={systemInfo.host} />
                    <InfoRow label="Kernel Version" value={systemInfo.kernel} />
                    <InfoRow label="System Uptime" value={systemInfo.uptime} />
                    <InfoRow label="Processor" value={systemInfo.cpu} />
                    <InfoRow label="Graphics" value={systemInfo.gpu} />
                    <InfoRow label="Memory" value={systemInfo.memory} />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-white/10">
                <div>
                    <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Live CPU Usage (%)</h3>
                    <div className="h-40 w-full">
                        <CustomLineChart data={cpuData} />
                    </div>
                </div>
                <div>
                    <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Live Memory Usage (%)</h3>
                    <div className="h-40 w-full">
                         <CustomLineChart data={memData} />
                    </div>
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

export default SystemInfoCard;