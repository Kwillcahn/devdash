import React from 'react';
import { businessMetricsData, reportsData } from '../mockData';
import CustomLineChart from './LineChart';
import CustomBarChart from './BarChart';
import CustomPieChart from './PieChart';
import Icon from './Icon';

const MetricCard: React.FC<{ metric: typeof businessMetricsData[0] }> = ({ metric }) => {
  const isPositive = metric.trend > 0;
  return (
    <div className="bg-white/60 dark:bg-black/30 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl p-6 relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{metric.label}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{metric.value}</p>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          <span>{isPositive ? '↑' : '↓'} {Math.abs(metric.trend)}%</span>
        </div>
      </div>
      <div className="h-16 w-full -mb-2">
        <CustomLineChart data={metric.data} />
      </div>
    </div>
  );
};

const ReportsPage: React.FC = () => {
  const pieData = [
    { name: 'Compute', value: 45 },
    { name: 'Storage', value: 25 },
    { name: 'Networking', value: 20 },
    { name: 'Backup', value: 10 }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Business & System Reports</h1>
        <p className="text-gray-600 dark:text-gray-400">Cross-departmental performance analytics and generated reporting documents.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {businessMetricsData.map((m, idx) => (
          <MetricCard key={idx} metric={m} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/60 dark:bg-black/30 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Resource Allocation Analysis</h3>
          <div className="h-64 w-full flex items-center justify-center">
            <CustomPieChart data={pieData} />
            <div className="ml-8 space-y-2">
               {pieData.map((d, i) => (
                 <div key={i} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#00f2a3', '#00d6ff', '#4f46e5', '#f59e0b'][i] }}></span>
                    <span className="font-semibold text-gray-900 dark:text-white">{d.name}:</span>
                    <span>{d.value}%</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-black/30 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Regional Growth (Monthly)</h3>
          <div className="h-64 w-full">
            <CustomBarChart data={[
              { name: 'Americas', value: 420 },
              { name: 'EMEA', value: 380 },
              { name: 'APAC', value: 510 },
              { name: 'LATAM', value: 120 }
            ]} />
          </div>
        </div>
      </div>

      <div className="bg-white/60 dark:bg-black/30 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Generated Documents</h3>
          <button className="text-sm text-primary-cyan hover:underline">View All Documents</button>
        </div>
        <div className="p-2">
          {reportsData.map((rep) => (
            <div key={rep.id} className="flex items-center justify-between p-4 hover:bg-gray-500/5 transition-colors rounded-lg group">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary-cyan/10 rounded-lg text-primary-cyan">
                  <Icon name="reports" className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{rep.title}</p>
                  <p className="text-xs text-gray-500">{rep.type} &middot; {rep.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded text-xs font-bold ${rep.status === 'Ready' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500 animate-pulse'}`}>
                  {rep.status}
                </span>
                {rep.status === 'Ready' && (
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;