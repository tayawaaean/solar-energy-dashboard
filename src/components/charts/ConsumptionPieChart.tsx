'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { mockConsumptionBreakdown } from '@/lib/mockData';

const COLORS = ['#3b82f6', '#f59e0b', '#22c55e', '#64748b'];

export default function ConsumptionPieChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={mockConsumptionBreakdown}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {mockConsumptionBreakdown.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
            formatter={(value: number) => [`${value}%`, 'Consumption']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
