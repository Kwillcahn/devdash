import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

interface PieChartData {
  name: string;
  value: number;
}

interface CustomPieChartProps {
  data: PieChartData[];
}

const CustomPieChart: React.FC<CustomPieChartProps> = ({ data }) => {
  const { theme } = useTheme();

  const COLORS = ['#00f2a3', '#00d6ff', '#4f46e5', '#f59e0b', '#ef4444'];
  const tooltipBgColor = theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
  const tooltipTextColor = theme === 'dark' ? '#ffffff' : '#000000';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: tooltipBgColor,
            borderColor: '#00f2a3',
            color: tooltipTextColor,
            backdropFilter: 'blur(5px)',
            borderRadius: '8px'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;