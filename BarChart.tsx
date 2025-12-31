
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface CustomBarChartProps {
  data: ChartDataPoint[];
}

const CustomBarChart: React.FC<CustomBarChartProps> = ({ data }) => {
  const { theme } = useTheme();

  const tickColor = theme === 'dark' ? '#9ca3af' : '#4b5563';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const tooltipBgColor = theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
  const tooltipTextColor = theme === 'dark' ? '#ffffff' : '#000000';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="name" tick={{ fill: tickColor }} fontSize={12} />
        <YAxis tick={{ fill: tickColor }} fontSize={12} />
        <Tooltip
          cursor={{ fill: 'rgba(0, 242, 163, 0.1)' }}
          contentStyle={{
            backgroundColor: tooltipBgColor,
            borderColor: '#00f2a3',
            color: tooltipTextColor,
            backdropFilter: 'blur(5px)',
          }}
          itemStyle={{ color: '#00f2a3' }}
        />
        <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f2a3" stopOpacity={0.9}/>
                <stop offset="100%" stopColor="#00d6ff" stopOpacity={0.7}/>
            </linearGradient>
        </defs>
        <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;