'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { mockEnergyProduction, mockEnergyConsumption } from '@/lib/mockData';

export default function EnergyChart() {
  // Combine production and consumption data
  const chartData = mockEnergyProduction.map((prod, index) => ({
    time: prod.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    production: prod.power,
    consumption: mockEnergyConsumption[index]?.power || 0,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="time" 
            stroke="#64748b"
            fontSize={12}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
            label={{ value: 'Power (kW)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="production"
            stroke="#facc15"
            strokeWidth={3}
            dot={{ fill: '#facc15', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            name="Production"
          />
          <Line
            type="monotone"
            dataKey="consumption"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            name="Consumption"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
