
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface CustomLineChartProps {
  data: ChartDataPoint[];
}

const CustomLineChart: React.FC<CustomLineChartProps> = ({ data }) => {
  const { theme } = useTheme();

  const tickColor = theme === 'dark' ? '#9ca3af' : '#4b5563';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const tooltipBgColor = theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
  const tooltipTextColor = theme === 'dark' ? '#ffffff' : '#000000';
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
          contentStyle={{
            backgroundColor: tooltipBgColor,
            borderColor: '#00f2a3',
            color: tooltipTextColor,
            backdropFilter: 'blur(5px)',
          }}
          itemStyle={{ color: '#00d6ff' }}
        />
        <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00f2a3" />
                <stop offset="100%" stopColor="#00d6ff" />
            </linearGradient>
        </defs>
        <Line type="monotone" dataKey="value" stroke="url(#lineGradient)" strokeWidth={2} dot={{ r: 4, fill: '#00f2a3' }} activeDot={{ r: 8, fill: '#00d6ff' }}/>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;