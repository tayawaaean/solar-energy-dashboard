'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, TrendingUp, DollarSign, Leaf, BarChart3, Settings, Activity, Battery, Sun, Users,
  Clock, Calendar, Cloud, Wind, Thermometer, Droplets, AlertTriangle, CheckCircle, 
  ArrowUpRight, ArrowDownRight, Target, Gauge, Wifi, WifiOff, RefreshCw, Play, Pause
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { mockSolarData, mockDashboardStats, mockDailyProductionData } from '@/lib/mockData';
import { formatNumber, formatCurrency, formatDateTime } from '@/lib/utils';

export default function DashboardPage() {
  const currentTime = new Date();
  const systemStatus = 'operational';

  // Static power data
  const powerData = [
    { hour: 0, power: 0, efficiency: 60 },
    { hour: 1, power: 0, efficiency: 60 },
    { hour: 2, power: 0, efficiency: 60 },
    { hour: 3, power: 0, efficiency: 60 },
    { hour: 4, power: 0, efficiency: 60 },
    { hour: 5, power: 0.5, efficiency: 65 },
    { hour: 6, power: 2.1, efficiency: 75 },
    { hour: 7, power: 4.8, efficiency: 82 },
    { hour: 8, power: 7.2, efficiency: 88 },
    { hour: 9, power: 9.5, efficiency: 92 },
    { hour: 10, power: 11.8, efficiency: 95 },
    { hour: 11, power: 13.2, efficiency: 97 },
    { hour: 12, power: 14.5, efficiency: 98 },
    { hour: 13, power: 13.8, efficiency: 96 },
    { hour: 14, power: 12.1, efficiency: 93 },
    { hour: 15, power: 10.4, efficiency: 89 },
    { hour: 16, power: 8.7, efficiency: 85 },
    { hour: 17, power: 6.3, efficiency: 78 },
    { hour: 18, power: 3.8, efficiency: 70 },
    { hour: 19, power: 1.2, efficiency: 65 },
    { hour: 20, power: 0, efficiency: 60 },
    { hour: 21, power: 0, efficiency: 60 },
    { hour: 22, power: 0, efficiency: 60 },
    { hour: 23, power: 0, efficiency: 60 }
  ];
  
  const currentHour = currentTime.getHours();
  const currentPower = powerData[currentHour]?.power || 0;

  // Weather data
  const weatherData = {
    temperature: 24,
    humidity: 65,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    icon: Cloud
  };

  // Recent alerts
  const recentAlerts = [
    {
      id: 1,
      type: 'success',
      title: 'Peak Performance Achieved',
      message: 'Solar panels operating at 98% efficiency',
      time: new Date(Date.now() - 30 * 60 * 1000),
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'warning',
      title: 'Maintenance Due',
      message: 'Panel cleaning scheduled for next week',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: AlertTriangle
    },
    {
      id: 3,
      type: 'info',
      title: 'Weather Optimal',
      message: 'Clear skies expected for next 3 days',
      time: new Date(Date.now() - 4 * 60 * 60 * 1000),
      icon: Sun
    }
  ];

  return (
    <div className="space-y-6">
        {/* Enhanced Header with Real-time Info */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
          <h1 className="text-3xl font-bold text-solar-dark-800 dark:text-white">
            Solar Energy Dashboard
          </h1>
          <p className="text-solar-dark-600 dark:text-solar-dark-300 mt-2">
            Monitor your solar energy production and system performance in real-time
          </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-solar-dark-600 dark:text-solar-dark-300">
              <Clock className="w-4 h-4" />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </Button>
          </div>
        </motion.div>

        {/* Enhanced Stats Cards with Animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-solar-yellow-400/10 to-solar-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Power</CardTitle>
              <div className="p-2 rounded-lg bg-solar-yellow-100 dark:bg-solar-yellow-900/20">
                <Zap className="h-4 w-4 text-solar-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-solar-yellow-600 dark:text-solar-yellow-400">
                {currentPower.toFixed(1)} kW
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <ArrowUpRight className="w-3 h-3 text-solar-green-500" />
                <p className="text-xs text-solar-dark-600">+2.3% from yesterday</p>
              </div>
              <div className="mt-2 w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-1">
                <div 
                  className="bg-solar-yellow-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${(currentPower / 20) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-solar-green-400/10 to-solar-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Energy</CardTitle>
              <div className="p-2 rounded-lg bg-solar-green-100 dark:bg-solar-green-900/20">
                <TrendingUp className="h-4 w-4 text-solar-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-solar-green-600 dark:text-solar-green-400">
                {mockSolarData.dailyEnergy} kWh
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <ArrowUpRight className="w-3 h-3 text-solar-green-500" />
                <p className="text-xs text-solar-dark-600">+5.1% from yesterday</p>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <Target className="w-3 h-3 text-solar-dark-400" />
                <span className="text-xs text-solar-dark-500">Target: 95 kWh</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-solar-blue-400/10 to-solar-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
              <div className="p-2 rounded-lg bg-solar-blue-100 dark:bg-solar-blue-900/20">
                <DollarSign className="h-4 w-4 text-solar-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-solar-blue-600 dark:text-solar-blue-400">
                {formatCurrency(mockDashboardStats.costSavings)}
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <ArrowUpRight className="w-3 h-3 text-solar-green-500" />
                <p className="text-xs text-solar-dark-600">+$45.20 this month</p>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <Gauge className="w-3 h-3 text-solar-dark-400" />
                <span className="text-xs text-solar-dark-500">ROI: 12.5%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-solar-emerald-400/10 to-solar-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Offset</CardTitle>
              <div className="p-2 rounded-lg bg-solar-emerald-100 dark:bg-solar-emerald-900/20">
                <Leaf className="h-4 w-4 text-solar-emerald-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-solar-emerald-600 dark:text-solar-emerald-400">
                {formatNumber(mockDashboardStats.carbonOffset)} kg
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <ArrowUpRight className="w-3 h-3 text-solar-green-500" />
                <p className="text-xs text-solar-dark-600">+112 kg this month</p>
              </div>
                             <div className="mt-2 flex items-center space-x-2">
                 <Leaf className="w-3 h-3 text-solar-dark-400" />
                 <span className="text-xs text-solar-dark-500">≈ 15 trees planted</span>
               </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Real-time Power Chart and Weather Widget */}
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Power Production Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>24-Hour Power Production</span>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-solar-yellow-500 rounded-full"></div>
                  <span className="text-sm text-solar-dark-600">Real-time</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 relative">
                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-rows-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="border-b border-solar-dark-200 dark:border-solar-dark-700"></div>
                  ))}
                </div>
                
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-4 px-2">
                  <span className="text-xs text-solar-dark-500">20 kW</span>
                  <span className="text-xs text-solar-dark-500">15 kW</span>
                  <span className="text-xs text-solar-dark-500">10 kW</span>
                  <span className="text-xs text-solar-dark-500">5 kW</span>
                  <span className="text-xs text-solar-dark-500">0 kW</span>
                </div>
                
                {/* Power Production Line Chart */}
                <svg className="absolute inset-0 w-full h-full" style={{ padding: '16px' }}>
                  <polyline
                    fill="none"
                    stroke="#eab308"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={powerData.map((data, index) => {
                      const x = (index / (powerData.length - 1)) * 100;
                      const y = 100 - (data.power / 20) * 100;
                      return `${x}%,${y}%`;
                    }).join(' ')}
                  />
                  {/* Data points */}
                  {powerData.map((data, index) => {
                    const x = (index / (powerData.length - 1)) * 100;
                    const y = 100 - (data.power / 20) * 100;
                    const isCurrentHour = index === currentHour;
                    return (
                      <circle
                        key={index}
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r={isCurrentHour ? "5" : "3"}
                        fill={isCurrentHour ? "#eab308" : "#fbbf24"}
                        className={`transition-all duration-300 ${isCurrentHour ? 'animate-pulse' : 'hover:r-5'}`}
                      />
                    );
                  })}
                </svg>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
                  <span className="text-xs text-solar-dark-500">6AM</span>
                  <span className="text-xs text-solar-dark-500">12PM</span>
                  <span className="text-xs text-solar-dark-500">6PM</span>
                </div>
                
                {/* Chart legend */}
                <div className="absolute top-2 right-2 flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-solar-yellow-500 rounded-full"></div>
                    <span className="text-solar-dark-600">Power Production</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-solar-yellow-50 dark:bg-solar-yellow-900/10 rounded-lg">
                  <p className="text-sm text-solar-dark-600">Peak Power</p>
                  <p className="text-lg font-bold text-solar-yellow-600">18.2 kW</p>
                  <p className="text-xs text-solar-dark-500">2:30 PM</p>
                </div>
                <div className="text-center p-3 bg-solar-green-50 dark:bg-solar-green-900/10 rounded-lg">
                  <p className="text-sm text-solar-dark-600">Avg Efficiency</p>
                  <p className="text-lg font-bold text-solar-green-600">94.2%</p>
                  <p className="text-xs text-solar-dark-500">Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weather Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                <Cloud className="w-5 h-5 text-solar-blue-500" />
                <span>Weather</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <weatherData.icon className="w-12 h-12 text-solar-blue-500" />
                  <div>
                    <div className="text-3xl font-bold text-solar-dark-800 dark:text-white">
                      {weatherData.temperature}°C
                    </div>
                    <div className="text-sm text-solar-dark-600 dark:text-solar-dark-300">
                      {weatherData.condition}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2 p-2 bg-solar-blue-50 dark:bg-solar-blue-900/10 rounded-lg">
                    <Droplets className="w-4 h-4 text-solar-blue-500" />
                    <div>
                      <p className="text-xs text-solar-dark-500">Humidity</p>
                      <p className="font-medium">{weatherData.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-solar-blue-50 dark:bg-solar-blue-900/10 rounded-lg">
                    <Wind className="w-4 h-4 text-solar-blue-500" />
                    <div>
                      <p className="text-xs text-solar-dark-500">Wind</p>
                      <p className="font-medium">{weatherData.windSpeed} km/h</p>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-solar-dark-500">
                  Perfect conditions for solar production
                </div>
              </div>
              </CardContent>
            </Card>
          </motion.div>

        {/* Additional Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Efficiency Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-solar-green-500" />
                <span>Efficiency Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 relative">
                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-rows-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="border-b border-solar-dark-200 dark:border-solar-dark-700"></div>
                  ))}
                </div>
                
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-4 px-2">
                  <span className="text-xs text-solar-dark-500">100%</span>
                  <span className="text-xs text-solar-dark-500">80%</span>
                  <span className="text-xs text-solar-dark-500">60%</span>
                  <span className="text-xs text-solar-dark-500">40%</span>
                  <span className="text-xs text-solar-dark-500">20%</span>
                </div>
                
                {/* Efficiency Line Chart */}
                <svg className="absolute inset-0 w-full h-full" style={{ padding: '16px' }}>
                  <polyline
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={powerData.map((data, index) => {
                      const x = (index / (powerData.length - 1)) * 100;
                      const y = 100 - data.efficiency;
                      return `${x}%,${y}%`;
                    }).join(' ')}
                  />
                  {/* Efficiency data points */}
                  {powerData.map((data, index) => {
                    const x = (index / (powerData.length - 1)) * 100;
                    const y = 100 - data.efficiency;
                    const isCurrentHour = index === currentHour;
                    return (
                      <circle
                        key={`eff-${index}`}
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r={isCurrentHour ? "4" : "3"}
                        fill={isCurrentHour ? "#22c55e" : "#4ade80"}
                        className={`transition-all duration-300 ${isCurrentHour ? 'animate-pulse' : 'hover:r-5'}`}
                      />
                    );
                  })}
                </svg>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
                  <span className="text-xs text-solar-dark-500">6AM</span>
                  <span className="text-xs text-solar-dark-500">12PM</span>
                  <span className="text-xs text-solar-dark-500">6PM</span>
                </div>
                
                {/* Chart legend */}
                <div className="absolute top-2 right-2 flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-solar-green-500 rounded-full"></div>
                    <span className="text-solar-dark-600">Efficiency</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Energy Consumption vs Production */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-solar-blue-500" />
                <span>Energy Balance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 relative">
                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-rows-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="border-b border-solar-dark-200 dark:border-solar-dark-700"></div>
                  ))}
                </div>
                
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-4 px-2">
                  <span className="text-xs text-solar-dark-500">20 kWh</span>
                  <span className="text-xs text-solar-dark-500">15 kWh</span>
                  <span className="text-xs text-solar-dark-500">10 kWh</span>
                  <span className="text-xs text-solar-dark-500">5 kWh</span>
                  <span className="text-xs text-solar-dark-500">0 kWh</span>
                </div>
                
                {/* Production Line Chart */}
                <svg className="absolute inset-0 w-full h-full" style={{ padding: '16px' }}>
                  <polyline
                    fill="none"
                    stroke="#eab308"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={powerData.map((data, index) => {
                      const x = (index / (powerData.length - 1)) * 100;
                      const y = 100 - (data.power * 0.8 / 20) * 100;
                      return `${x}%,${y}%`;
                    }).join(' ')}
                  />
                  {/* Production data points */}
                  {powerData.map((data, index) => {
                    const x = (index / (powerData.length - 1)) * 100;
                    const y = 100 - (data.power * 0.8 / 20) * 100;
                    return (
                      <circle
                        key={`prod-${index}`}
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="3"
                        fill="#eab308"
                        className="transition-all duration-300 hover:r-5"
                      />
                    );
                  })}
                </svg>
                
                {/* Consumption Line Chart */}
                <svg className="absolute inset-0 w-full h-full" style={{ padding: '16px' }}>
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={powerData.map((data, index) => {
                      const x = (index / (powerData.length - 1)) * 100;
                      const consumption = 5 + Math.sin((index - 6) * Math.PI / 12) * 3 + Math.random() * 1;
                      const y = 100 - (consumption / 20) * 100;
                      return `${x}%,${y}%`;
                    }).join(' ')}
                  />
                  {/* Consumption data points */}
                  {powerData.map((data, index) => {
                    const x = (index / (powerData.length - 1)) * 100;
                    const consumption = 5 + Math.sin((index - 6) * Math.PI / 12) * 3 + Math.random() * 1;
                    const y = 100 - (consumption / 20) * 100;
                    return (
                      <circle
                        key={`cons-${index}`}
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="3"
                        fill="#3b82f6"
                        className="transition-all duration-300 hover:r-5"
                      />
                    );
                  })}
                </svg>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
                  <span className="text-xs text-solar-dark-500">6AM</span>
                  <span className="text-xs text-solar-dark-500">12PM</span>
                  <span className="text-xs text-solar-dark-500">6PM</span>
                </div>
                
                {/* Chart legend */}
                <div className="absolute top-2 right-2 flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-solar-yellow-500 rounded-full"></div>
                    <span className="text-solar-dark-600">Production</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-solar-blue-500 rounded-full"></div>
                    <span className="text-solar-dark-600">Consumption</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Navigation with Enhanced Design */}
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-solar-dark-800 dark:text-white mb-4">
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <Link href="/analytics">
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-solar-blue-400/5 to-solar-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 relative">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-solar-blue-100 dark:bg-solar-blue-900/20 group-hover:bg-solar-blue-200 dark:group-hover:bg-solar-blue-900/40 transition-colors">
                      <BarChart3 className="w-6 h-6 text-solar-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-solar-dark-800 dark:text-white">Analytics</h3>
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Detailed reports & insights</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/devices">
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-solar-green-400/5 to-solar-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 relative">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-solar-green-100 dark:bg-solar-green-900/20 group-hover:bg-solar-green-200 dark:group-hover:bg-solar-green-900/40 transition-colors">
                      <Activity className="w-6 h-6 text-solar-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-solar-dark-800 dark:text-white">Devices</h3>
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Monitor & control devices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/solar-panels">
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-solar-orange-400/5 to-solar-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 relative">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-solar-orange-100 dark:bg-solar-orange-900/20 group-hover:bg-solar-orange-200 dark:group-hover:bg-solar-orange-900/40 transition-colors">
                      <Sun className="w-6 h-6 text-solar-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-solar-dark-800 dark:text-white">Solar Panels</h3>
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Panel monitoring</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/battery">
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-solar-yellow-400/5 to-solar-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 relative">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-solar-yellow-100 dark:bg-solar-yellow-900/20 group-hover:bg-solar-yellow-200 dark:group-hover:bg-solar-yellow-900/40 transition-colors">
                      <Battery className="w-6 h-6 text-solar-yellow-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-solar-dark-800 dark:text-white">Battery</h3>
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Storage & management</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/users">
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-solar-purple-400/5 to-solar-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 relative">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-solar-purple-100 dark:bg-solar-purple-900/20 group-hover:bg-solar-purple-200 dark:group-hover:bg-solar-purple-900/40 transition-colors">
                      <Users className="w-6 h-6 text-solar-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-solar-dark-800 dark:text-white">Users</h3>
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">User management</p>
                    </div>
                </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/settings">
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-solar-dark-400/5 to-solar-dark-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 relative">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-solar-dark-100 dark:bg-solar-dark-800 group-hover:bg-solar-dark-200 dark:group-hover:bg-solar-dark-700 transition-colors">
                      <Settings className="w-6 h-6 text-solar-dark-600 dark:text-solar-dark-300" />
                </div>
                    <div>
                      <h3 className="font-semibold text-solar-dark-800 dark:text-white">Settings</h3>
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">System configuration</p>
                </div>
              </div>
            </CardContent>
          </Card>
            </Link>
          </div>
          </motion.div>

        {/* Enhanced System Status and Recent Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Enhanced System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-solar-green-500 rounded-full animate-pulse"></div>
                  <span>System Status</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-solar-green-500" />
                  <span className="text-sm text-solar-green-600">All Systems Online</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-solar-green-50 dark:bg-solar-green-900/10 rounded-lg border border-solar-green-200 dark:border-solar-green-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-solar-green-100 dark:bg-solar-green-900/20 rounded-lg flex items-center justify-center">
                      <Sun className="w-4 h-4 text-solar-green-600" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-solar-dark-700 dark:text-solar-dark-300">Solar Panels</span>
                      <p className="text-xs text-solar-dark-500">Operating at 98% efficiency</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-solar-green-600 dark:text-solar-green-400">Online</span>
                    <div className="w-2 h-2 bg-solar-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-solar-blue-50 dark:bg-solar-blue-900/10 rounded-lg border border-solar-blue-200 dark:border-solar-blue-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-solar-blue-100 dark:bg-solar-blue-900/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-solar-blue-600" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-solar-dark-700 dark:text-solar-dark-300">Inverter</span>
                      <p className="text-xs text-solar-dark-500">Converting at optimal rate</p>
                </div>
                </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-solar-blue-600 dark:text-solar-blue-400">Online</span>
                    <div className="w-2 h-2 bg-solar-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
                <div className="flex items-center justify-between p-3 bg-solar-yellow-50 dark:bg-solar-yellow-900/10 rounded-lg border border-solar-yellow-200 dark:border-solar-yellow-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-solar-yellow-100 dark:bg-solar-yellow-900/20 rounded-lg flex items-center justify-center">
                      <Battery className="w-4 h-4 text-solar-yellow-600" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-solar-dark-700 dark:text-solar-dark-300">Battery</span>
                      <p className="text-xs text-solar-dark-500">85% charged, 12.5 kWh available</p>
                    </div>
                </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-solar-yellow-600 dark:text-solar-yellow-400">Charging</span>
                    <div className="w-2 h-2 bg-solar-yellow-500 rounded-full animate-pulse"></div>
                </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Alerts</span>
                <Button variant="ghost" size="sm" className="text-solar-dark-600 hover:text-solar-dark-800">
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-start space-x-3 p-3 rounded-lg border ${
                      alert.type === 'success' ? 'bg-solar-green-50 dark:bg-solar-green-900/10 border-solar-green-200 dark:border-solar-green-800' :
                      alert.type === 'warning' ? 'bg-solar-amber-50 dark:bg-solar-amber-900/10 border-solar-amber-200 dark:border-solar-amber-800' :
                      'bg-solar-blue-50 dark:bg-solar-blue-900/10 border-solar-blue-200 dark:border-solar-blue-800'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      alert.type === 'success' ? 'bg-solar-green-100 dark:bg-solar-green-900/20' :
                      alert.type === 'warning' ? 'bg-solar-amber-100 dark:bg-solar-amber-900/20' :
                      'bg-solar-blue-100 dark:bg-solar-blue-900/20'
                    }`}>
                      <alert.icon className={`w-4 h-4 ${
                        alert.type === 'success' ? 'text-solar-green-600' :
                        alert.type === 'warning' ? 'text-solar-amber-600' :
                        'text-solar-blue-600'
                      }`} />
                </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-solar-dark-800 dark:text-white text-sm">
                        {alert.title}
                      </h4>
                      <p className="text-solar-dark-600 dark:text-solar-dark-300 text-xs mt-1">
                        {alert.message}
                      </p>
                      <p className="text-solar-dark-400 text-xs mt-2">
                        {formatDateTime(alert.time)}
                      </p>
                </div>
                  </motion.div>
                ))}
        </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
  );
}
