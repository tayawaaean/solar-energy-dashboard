'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, TrendingUp, Calendar, Filter, Download, Eye, EyeOff, 
  ArrowUpRight, ArrowDownRight, Target, Gauge, Zap, Sun, Battery,
  Clock, DollarSign, Leaf, AlertTriangle, CheckCircle, RefreshCw,
  ChevronDown, ChevronUp, BarChart, PieChart, LineChart, Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockDailyProductionData } from '@/lib/mockData';
import { formatNumber, formatCurrency, formatDateTime, formatPercentage } from '@/lib/utils';

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedView, setSelectedView] = useState('overview');
  const [isExporting, setIsExporting] = useState(false);
  const [showInsights, setShowInsights] = useState(true);

  // Static analytics data
  const analyticsData = [
    { date: 'Jan 1', production: 85.2, consumption: 65.8, efficiency: 92.5, peakPower: 18.3, costSavings: 45.2, carbonOffset: 95.8 },
    { date: 'Jan 2', production: 78.9, consumption: 62.1, efficiency: 89.7, peakPower: 17.1, costSavings: 42.8, carbonOffset: 88.4 },
    { date: 'Jan 3', production: 92.4, consumption: 68.5, efficiency: 94.2, peakPower: 19.8, costSavings: 48.9, carbonOffset: 102.6 },
    { date: 'Jan 4', production: 76.3, consumption: 59.2, efficiency: 87.3, peakPower: 16.5, costSavings: 40.1, carbonOffset: 84.7 },
    { date: 'Jan 5', production: 88.7, consumption: 64.9, efficiency: 91.8, peakPower: 18.9, costSavings: 46.3, carbonOffset: 96.2 },
    { date: 'Jan 6', production: 81.5, consumption: 61.4, efficiency: 90.1, peakPower: 17.6, costSavings: 43.7, carbonOffset: 89.8 },
    { date: 'Jan 7', production: 95.1, consumption: 70.2, efficiency: 95.6, peakPower: 20.3, costSavings: 50.8, carbonOffset: 105.4 },
    { date: 'Jan 8', production: 79.8, consumption: 63.7, efficiency: 88.9, peakPower: 17.2, costSavings: 41.5, carbonOffset: 86.3 },
    { date: 'Jan 9', production: 86.4, consumption: 66.3, efficiency: 91.2, peakPower: 18.5, costSavings: 44.9, carbonOffset: 93.1 },
    { date: 'Jan 10', production: 89.6, consumption: 67.8, efficiency: 93.1, peakPower: 19.1, costSavings: 47.2, carbonOffset: 98.5 },
    { date: 'Jan 11', production: 82.3, consumption: 62.8, efficiency: 89.5, peakPower: 17.8, costSavings: 43.1, carbonOffset: 90.2 },
    { date: 'Jan 12', production: 91.8, consumption: 69.1, efficiency: 94.7, peakPower: 19.5, costSavings: 49.1, carbonOffset: 101.8 },
    { date: 'Jan 13', production: 77.5, consumption: 60.5, efficiency: 87.8, peakPower: 16.8, costSavings: 40.8, carbonOffset: 85.4 },
    { date: 'Jan 14', production: 87.2, consumption: 65.4, efficiency: 92.1, peakPower: 18.7, costSavings: 45.9, carbonOffset: 95.3 },
    { date: 'Jan 15', production: 93.7, consumption: 71.3, efficiency: 95.9, peakPower: 20.1, costSavings: 51.2, carbonOffset: 103.7 },
    { date: 'Jan 16', production: 80.1, consumption: 61.9, efficiency: 88.6, peakPower: 17.3, costSavings: 42.3, carbonOffset: 87.9 },
    { date: 'Jan 17', production: 85.9, consumption: 66.7, efficiency: 91.5, peakPower: 18.4, costSavings: 44.6, carbonOffset: 92.8 },
    { date: 'Jan 18', production: 90.3, consumption: 68.9, efficiency: 93.8, peakPower: 19.3, costSavings: 47.8, carbonOffset: 99.1 },
    { date: 'Jan 19', production: 83.6, consumption: 63.2, efficiency: 89.2, peakPower: 17.9, costSavings: 43.4, carbonOffset: 91.5 },
    { date: 'Jan 20', production: 88.1, consumption: 67.1, efficiency: 92.7, peakPower: 18.8, costSavings: 46.1, carbonOffset: 96.9 },
    { date: 'Jan 21', production: 94.2, consumption: 70.8, efficiency: 95.3, peakPower: 20.0, costSavings: 50.5, carbonOffset: 104.2 },
    { date: 'Jan 22', production: 78.4, consumption: 62.5, efficiency: 87.1, peakPower: 16.9, costSavings: 41.2, carbonOffset: 85.8 },
    { date: 'Jan 23', production: 86.8, consumption: 66.1, efficiency: 91.9, peakPower: 18.6, costSavings: 45.1, carbonOffset: 94.7 },
    { date: 'Jan 24', production: 89.1, consumption: 68.3, efficiency: 93.4, peakPower: 19.2, costSavings: 47.5, carbonOffset: 97.8 },
    { date: 'Jan 25', production: 82.7, consumption: 63.8, efficiency: 89.8, peakPower: 17.7, costSavings: 43.8, carbonOffset: 90.9 },
    { date: 'Jan 26', production: 91.5, consumption: 69.7, efficiency: 94.5, peakPower: 19.7, costSavings: 49.6, carbonOffset: 102.1 },
    { date: 'Jan 27', production: 77.8, consumption: 60.8, efficiency: 87.5, peakPower: 16.7, costSavings: 40.5, carbonOffset: 84.9 },
    { date: 'Jan 28', production: 87.9, consumption: 66.8, efficiency: 92.3, peakPower: 18.9, costSavings: 46.2, carbonOffset: 95.7 },
    { date: 'Jan 29', production: 93.1, consumption: 71.1, efficiency: 95.7, peakPower: 20.2, costSavings: 51.0, carbonOffset: 103.9 },
    { date: 'Jan 30', production: 80.5, consumption: 62.3, efficiency: 88.4, peakPower: 17.4, costSavings: 42.1, carbonOffset: 87.2 }
  ];

  // Calculate key metrics
  const totalProduction = analyticsData.reduce((sum, day) => sum + day.production, 0);
  const totalConsumption = analyticsData.reduce((sum, day) => sum + day.consumption, 0);
  const averageEfficiency = analyticsData.length > 0 ? analyticsData.reduce((sum, day) => sum + day.efficiency, 0) / analyticsData.length : 0;
  const totalSavings = analyticsData.reduce((sum, day) => sum + day.costSavings, 0);
  const totalCarbonOffset = analyticsData.reduce((sum, day) => sum + day.carbonOffset, 0);
  
  // Performance insights
  const insights = [
    {
      type: 'positive',
      title: 'Peak Performance Day',
      value: 'March 15, 2024',
      description: 'Highest production recorded at 98.5 kWh',
      icon: TrendingUp,
      color: 'text-solar-green-600'
    },
    {
      type: 'warning',
      title: 'Efficiency Drop',
      value: 'March 12, 2024',
      description: 'Efficiency dropped to 78% due to cloudy weather',
      icon: AlertTriangle,
      color: 'text-solar-amber-600'
    },
    {
      type: 'info',
      title: 'Cost Savings Milestone',
      value: '$1,250',
      description: 'Monthly savings target exceeded by 15%',
      icon: DollarSign,
      color: 'text-solar-blue-600'
    }
  ];

  // Generate chart data
  const chartData = useMemo(() => {
    if (analyticsData.length === 0) return { labels: [], productionData: [], consumptionData: [], efficiencyData: [] };
    
    const labels = analyticsData.map(day => day.date);
    const productionData = analyticsData.map(day => day.production);
    const consumptionData = analyticsData.map(day => day.consumption);
    const efficiencyData = analyticsData.map(day => day.efficiency);
    
    return { labels, productionData, consumptionData, efficiencyData };
  }, [analyticsData]);

  // Export functionality
  const handleExport = async () => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExporting(false);
    // In a real app, this would generate and download a CSV/PDF
  };



  return (
    <div className="space-y-6">
        {/* Enhanced Header with Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-solar-dark-800 dark:text-white">
              Analytics & Reports
            </h1>
            <p className="text-solar-dark-600 dark:text-solar-dark-300 mt-2">
              Comprehensive analysis of your solar energy system performance and insights
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Button
                variant={selectedPeriod === '7d' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('7d')}
              >
                7D
              </Button>
              <Button
                variant={selectedPeriod === '30d' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('30d')}
              >
                30D
              </Button>
              <Button
                variant={selectedPeriod === '90d' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('90d')}
              >
                90D
              </Button>
              <Button
                variant={selectedPeriod === '1y' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('1y')}
              >
                1Y
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center space-x-2"
            >
              <Download className={`w-4 h-4 ${isExporting ? 'animate-spin' : ''}`} />
              <span>{isExporting ? 'Exporting...' : 'Export'}</span>
            </Button>
          </div>
        </motion.div>

        {/* Enhanced Key Metrics with Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-solar-yellow-400/10 to-solar-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-solar-dark-600 dark:text-solar-dark-300">
                    Total Production
                  </p>
                  <p className="text-2xl font-bold text-solar-yellow-600 dark:text-solar-yellow-400">
                    {formatNumber(totalProduction)} kWh
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <ArrowUpRight className="w-3 h-3 text-solar-green-500" />
                    <p className="text-xs text-solar-dark-600">+12.5% vs last period</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-yellow-100 dark:bg-solar-yellow-900/20">
                  <Zap className="w-6 h-6 text-solar-yellow-500" />
                </div>
              </div>
              <div className="mt-3 w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-1">
                <div 
                  className="bg-solar-yellow-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${(totalProduction / 5000) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-solar-green-400/10 to-solar-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-solar-dark-600 dark:text-solar-dark-300">
                    Average Efficiency
                  </p>
                  <p className="text-2xl font-bold text-solar-green-600 dark:text-solar-green-400">
                    {formatPercentage(averageEfficiency)}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <ArrowUpRight className="w-3 h-3 text-solar-green-500" />
                    <p className="text-xs text-solar-dark-600">+3.2% vs last period</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-green-100 dark:bg-solar-green-900/20">
                  <Gauge className="w-6 h-6 text-solar-green-500" />
                </div>
              </div>
              <div className="mt-3 w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-1">
                <div 
                  className="bg-solar-green-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${averageEfficiency}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-solar-blue-400/10 to-solar-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-solar-dark-600 dark:text-solar-dark-300">
                    Cost Savings
                  </p>
                  <p className="text-2xl font-bold text-solar-blue-600 dark:text-solar-blue-400">
                    {formatCurrency(totalSavings)}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <ArrowUpRight className="w-3 h-3 text-solar-green-500" />
                    <p className="text-xs text-solar-dark-600">+18.7% vs last period</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-blue-100 dark:bg-solar-blue-900/20">
                  <DollarSign className="w-6 h-6 text-solar-blue-500" />
                </div>
              </div>
              <div className="mt-3 w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-1">
                <div 
                  className="bg-solar-blue-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${(totalSavings / 2000) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-solar-emerald-400/10 to-solar-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-solar-dark-600 dark:text-solar-dark-300">
                    CO₂ Offset
                  </p>
                  <p className="text-2xl font-bold text-solar-emerald-600 dark:text-solar-emerald-400">
                    {formatNumber(totalCarbonOffset)} kg
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <ArrowUpRight className="w-3 h-3 text-solar-green-500" />
                    <p className="text-xs text-solar-dark-600">+22.1% vs last period</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-emerald-100 dark:bg-solar-emerald-900/20">
                  <Leaf className="w-6 h-6 text-solar-emerald-500" />
                </div>
              </div>
              <div className="mt-3 w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-1">
                <div 
                  className="bg-solar-emerald-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${(totalCarbonOffset / 5000) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Insights */}
        {showInsights && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-solar-blue-500" />
                    <span>Performance Insights</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowInsights(false)}
                    className="text-solar-dark-600 hover:text-solar-dark-800"
                  >
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border ${
                        insight.type === 'positive' ? 'bg-solar-green-50 dark:bg-solar-green-900/10 border-solar-green-200 dark:border-solar-green-800' :
                        insight.type === 'warning' ? 'bg-solar-amber-50 dark:bg-solar-amber-900/10 border-solar-amber-200 dark:border-solar-amber-800' :
                        'bg-solar-blue-50 dark:bg-solar-blue-900/10 border-solar-blue-200 dark:border-solar-blue-800'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          insight.type === 'positive' ? 'bg-solar-green-100 dark:bg-solar-green-900/20' :
                          insight.type === 'warning' ? 'bg-solar-amber-100 dark:bg-solar-amber-900/20' :
                          'bg-solar-blue-100 dark:bg-solar-blue-900/20'
                        }`}>
                          <insight.icon className={`w-4 h-4 ${insight.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-solar-dark-800 dark:text-white text-sm">
                            {insight.title}
                          </h4>
                          <p className="text-lg font-bold text-solar-dark-800 dark:text-white mt-1">
                            {insight.value}
                          </p>
                          <p className="text-solar-dark-600 dark:text-solar-dark-300 text-xs mt-1">
                            {insight.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Advanced Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Production vs Consumption Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart className="w-5 h-5 text-solar-blue-500" />
                    <span>Production vs Consumption</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-solar-yellow-500 rounded"></div>
                      <span>Production</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-solar-green-500 rounded"></div>
                      <span>Consumption</span>
                    </div>
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
                  
                  {/* Production Line Chart */}
                  <svg className="absolute inset-0 w-full h-full" style={{ padding: '16px' }}>
                    <polyline
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={chartData.productionData.map((value, index) => {
                        const x = (index / (chartData.productionData.length - 1)) * 100;
                        const y = 100 - ((value / 150) * 100);
                        return `${x}%,${y}%`;
                      }).join(' ')}
                    />
                    {/* Production data points */}
                    {chartData.productionData.map((value, index) => {
                      const x = (index / (chartData.productionData.length - 1)) * 100;
                      const y = 100 - ((value / 150) * 100);
                      return (
                        <circle
                          key={index}
                          cx={`${x}%`}
                          cy={`${y}%`}
                          r="4"
                          fill="#f59e0b"
                          className="transition-all duration-300 hover:r-6"
                        />
                      );
                    })}
                  </svg>
                  
                  {/* Consumption Line Chart */}
                  <svg className="absolute inset-0 w-full h-full" style={{ padding: '16px' }}>
                    <polyline
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={chartData.consumptionData.map((value, index) => {
                        const x = (index / (chartData.consumptionData.length - 1)) * 100;
                        const y = 100 - ((value / 150) * 100);
                        return `${x}%,${y}%`;
                      }).join(' ')}
                    />
                    {/* Consumption data points */}
                    {chartData.consumptionData.map((value, index) => {
                      const x = (index / (chartData.consumptionData.length - 1)) * 100;
                      const y = 100 - ((value / 150) * 100);
                      return (
                        <circle
                          key={index}
                          cx={`${x}%`}
                          cy={`${y}%`}
                          r="4"
                          fill="#10b981"
                          className="transition-all duration-300 hover:r-6"
                        />
                      );
                    })}
                  </svg>
                  
                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
                    {chartData.labels.map((label, index) => (
                      <span key={index} className="text-xs text-solar-dark-500">
                        {index % 5 === 0 ? label : ''}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-solar-yellow-50 dark:bg-solar-yellow-900/10 rounded-lg">
                    <p className="text-sm text-solar-dark-600">Avg Production</p>
                    <p className="text-lg font-bold text-solar-yellow-600">
                      {formatNumber(totalProduction / analyticsData.length)} kWh
                    </p>
                  </div>
                  <div className="text-center p-3 bg-solar-green-50 dark:bg-solar-green-900/10 rounded-lg">
                    <p className="text-sm text-solar-dark-600">Avg Consumption</p>
                    <p className="text-lg font-bold text-solar-green-600">
                      {formatNumber(totalConsumption / analyticsData.length)} kWh
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Efficiency Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-solar-green-500" />
                    <span>Efficiency Trend</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-solar-dark-400" />
                    <span className="text-sm text-solar-dark-600">Target: 90%</span>
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
                  
                  {/* Target line */}
                  <div className="absolute inset-0" style={{ padding: '16px' }}>
                    <div className="w-full border-t-2 border-dashed border-solar-green-400" style={{ top: '10%' }}></div>
                    <div className="absolute top-2 right-4 text-xs text-solar-green-600 font-medium">Target: 90%</div>
                  </div>
                  
                  {/* Efficiency Line Chart */}
                  <svg className="absolute inset-0 w-full h-full" style={{ padding: '16px' }}>
                    <polyline
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={chartData.efficiencyData.map((value, index) => {
                        const x = (index / (chartData.efficiencyData.length - 1)) * 100;
                        const y = 100 - (value);
                        return `${x}%,${y}%`;
                      }).join(' ')}
                    />
                    {/* Efficiency data points */}
                    {chartData.efficiencyData.map((value, index) => {
                      const x = (index / (chartData.efficiencyData.length - 1)) * 100;
                      const y = 100 - value;
                      const color = value >= 90 ? '#10b981' : value >= 80 ? '#f59e0b' : '#ef4444';
                      return (
                        <circle
                          key={index}
                          cx={`${x}%`}
                          cy={`${y}%`}
                          r="4"
                          fill={color}
                          className="transition-all duration-300 hover:r-6"
                        />
                      );
                    })}
                  </svg>
                  
                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
                    {chartData.labels.map((label, index) => (
                      <span key={index} className="text-xs text-solar-dark-500">
                        {index % 5 === 0 ? label : ''}
                      </span>
                    ))}
                  </div>
                  
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-4 px-2">
                    <span className="text-xs text-solar-dark-500">100%</span>
                    <span className="text-xs text-solar-dark-500">75%</span>
                    <span className="text-xs text-solar-dark-500">50%</span>
                    <span className="text-xs text-solar-dark-500">25%</span>
                    <span className="text-xs text-solar-dark-500">0%</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center p-2 bg-solar-green-50 dark:bg-solar-green-900/10 rounded-lg">
                    <p className="text-xs text-solar-dark-600">Excellent</p>
                    <p className="text-sm font-bold text-solar-green-600">≥90%</p>
                  </div>
                  <div className="text-center p-2 bg-solar-amber-50 dark:bg-solar-amber-900/10 rounded-lg">
                    <p className="text-xs text-solar-dark-600">Good</p>
                    <p className="text-sm font-bold text-solar-amber-600">80-89%</p>
                  </div>
                  <div className="text-center p-2 bg-red-50 dark:bg-red-900/10 rounded-lg">
                    <p className="text-xs text-solar-dark-600">Needs Attention</p>
                    <p className="text-sm font-bold text-red-600">&lt;80%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Performance Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-solar-blue-500" />
                  <span>Performance Comparison</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">This Period</Button>
                  <Button variant="outline" size="sm">Previous Period</Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-solar-yellow-50 dark:bg-solar-yellow-900/10 rounded-lg">
                  <p className="text-sm text-solar-dark-600">Production</p>
                  <p className="text-2xl font-bold text-solar-yellow-600">
                    {formatNumber(totalProduction)} kWh
                  </p>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <ArrowUpRight className="w-4 h-4 text-solar-green-500" />
                    <span className="text-sm text-solar-green-600">+12.5%</span>
                  </div>
                </div>
                <div className="text-center p-4 bg-solar-green-50 dark:bg-solar-green-900/10 rounded-lg">
                  <p className="text-sm text-solar-dark-600">Efficiency</p>
                  <p className="text-2xl font-bold text-solar-green-600">
                    {formatPercentage(averageEfficiency)}
                  </p>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <ArrowUpRight className="w-4 h-4 text-solar-green-500" />
                    <span className="text-sm text-solar-green-600">+3.2%</span>
                  </div>
                </div>
                <div className="text-center p-4 bg-solar-blue-50 dark:bg-solar-blue-900/10 rounded-lg">
                  <p className="text-sm text-solar-dark-600">Savings</p>
                  <p className="text-2xl font-bold text-solar-blue-600">
                    {formatCurrency(totalSavings)}
                  </p>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <ArrowUpRight className="w-4 h-4 text-solar-green-500" />
                    <span className="text-sm text-solar-green-600">+18.7%</span>
                  </div>
                </div>
                <div className="text-center p-4 bg-solar-emerald-50 dark:bg-solar-emerald-900/10 rounded-lg">
                  <p className="text-sm text-solar-dark-600">CO₂ Offset</p>
                  <p className="text-2xl font-bold text-solar-emerald-600">
                    {formatNumber(totalCarbonOffset)} kg
                  </p>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <ArrowUpRight className="w-4 h-4 text-solar-green-500" />
                    <span className="text-sm text-solar-green-600">+22.1%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Data Table with Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-solar-dark-500" />
                  <span>Detailed Production Data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">Filter</Button>
                  <Button variant="outline" size="sm">Sort</Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-solar-dark-200 dark:border-solar-dark-700">
                      <th className="text-left py-3 px-4 font-medium text-solar-dark-700 dark:text-solar-dark-300">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-solar-dark-700 dark:text-solar-dark-300">
                        Production (kWh)
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-solar-dark-700 dark:text-solar-dark-300">
                        Consumption (kWh)
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-solar-dark-700 dark:text-solar-dark-300">
                        Efficiency (%)
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-solar-dark-700 dark:text-solar-dark-300">
                        Peak Power (kW)
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-solar-dark-700 dark:text-solar-dark-300">
                        Savings ($)
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-solar-dark-700 dark:text-solar-dark-300">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.slice(-10).map((day, index) => (
                      <tr key={index} className="border-b border-solar-dark-100 dark:border-solar-dark-800 hover:bg-solar-dark-50 dark:hover:bg-solar-dark-800/50 transition-colors">
                        <td className="py-3 px-4 text-solar-dark-800 dark:text-white font-medium">
                          {day.date}
                        </td>
                        <td className="py-3 px-4 text-solar-dark-800 dark:text-white">
                          {day.production.toFixed(1)}
                        </td>
                        <td className="py-3 px-4 text-solar-dark-800 dark:text-white">
                          {day.consumption.toFixed(1)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-medium ${
                            day.efficiency >= 90 ? 'text-solar-green-500' :
                            day.efficiency >= 80 ? 'text-solar-amber-500' : 'text-red-500'
                          }`}>
                            {day.efficiency.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-solar-dark-800 dark:text-white">
                          {day.peakPower.toFixed(1)}
                        </td>
                        <td className="py-3 px-4 text-solar-dark-800 dark:text-white">
                          {formatCurrency(day.costSavings)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            day.efficiency >= 90 ? 'bg-solar-green-100 text-solar-green-800 dark:bg-solar-green-900/20 dark:text-solar-green-400' :
                            day.efficiency >= 80 ? 'bg-solar-amber-100 text-solar-amber-800 dark:bg-solar-amber-900/20 dark:text-solar-amber-400' :
                            'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {day.efficiency >= 90 ? 'Excellent' :
                             day.efficiency >= 80 ? 'Good' : 'Needs Attention'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-solar-dark-600">
                  Showing last 10 days of {analyticsData.length} total records
                </p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
  );
}
