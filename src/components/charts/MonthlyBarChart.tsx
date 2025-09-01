'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { mockMonthlyEnergyData } from '@/lib/mockData';

export default function MonthlyBarChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={mockMonthlyEnergyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="month" 
            stroke="#64748b"
            fontSize={12}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
            label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar 
            dataKey="production" 
            fill="#facc15" 
            name="Production"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="consumption" 
            fill="#22c55e" 
            name="Consumption"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="savings" 
            fill="#3b82f6" 
            name="Savings"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
