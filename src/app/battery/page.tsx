'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Battery, 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Activity,
  Gauge,
  Target,
  Clock,
  Calendar,
  Thermometer,
  Droplets,
  BarChart3,
  LineChart,
  PieChart,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Download,
  Upload,
  Bell,
  Shield,
  Leaf,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause,
  RotateCcw,
  Search,
  Filter,
  Power,
  PowerOff,
  Wifi,
  WifiOff,
  Cpu,
  HardDrive,
  Monitor,
  Smartphone,
  MapPin,
  Plus,
  Minus,
  Target as TargetIcon,
  Gauge as GaugeIcon,
  BatteryCharging,
  BatteryFull,
  BatteryLow,
  BatteryMedium
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockSolarData, mockDevices } from '@/lib/mockData';
import { formatNumber, formatPercentage, formatCurrency, formatDateTime } from '@/lib/utils';

export default function BatteryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const [showOfflineBatteries, setShowOfflineBatteries] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [batteryMode, setBatteryMode] = useState<'auto' | 'manual'>('auto');
  const batteriesPerPage = 6;

  // Static battery data
  const batteries = mockDevices.filter(device => device.type === 'battery').map((battery, index) => ({
    ...battery,
    realTimeLevel: 75 + (index % 20), // Static values based on index
    isCharging: index % 2 === 0, // Static boolean based on index
    temperature: 25 + (index % 6), // Static values based on index
    voltage: 48 + (index % 2), // Static values based on index
    current: 15 + (index % 15), // Static values based on index
    power: 5 + (index % 3), // Static values based on index
    capacity: 60 + (index % 12), // Static values based on index
    cycles: 800 + (index * 50), // Static values based on index
    health: 85 + (index % 10), // Static values based on index
    age: 2 + (index % 2), // Static values based on index
    lastMaintenance: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000), // Static dates based on index
    nextMaintenance: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000), // Static dates based on index
    dailyEnergy: 20 + (index * 2), // Static values based on index
    monthlyEnergy: 500 + (index * 25), // Static values based on index
    lifetimeEnergy: 25000 + (index * 1000), // Static values based on index
    alerts: index % 2, // Static values based on index
    efficiency: 88 + (index % 7), // Static values based on index
    soh: 92 + (index % 6), // Static values based on index
    soc: 70 + (index % 25), // Static values based on index
    dod: 30 + (index % 35), // Static values based on index
    chargeRate: 6 + (index % 3), // Static values based on index
    dischargeRate: 4 + (index % 3) // Static values based on index
  }));

  // Filter batteries
  const filteredBatteries = batteries.filter(battery => {
    const matchesSearch = battery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         battery.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || battery.status === statusFilter;
    const matchesOffline = showOfflineBatteries || battery.status !== 'offline';
    return matchesSearch && matchesStatus && matchesOffline;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBatteries.length / batteriesPerPage);
  const startIndex = (currentPage - 1) * batteriesPerPage;
  const endIndex = startIndex + batteriesPerPage;
  const currentBatteries = filteredBatteries.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, showOfflineBatteries]);

  // Calculate metrics
  const totalCapacity = batteries.reduce((sum, battery) => sum + battery.capacity, 0);
  const totalAvailable = batteries.reduce((sum, battery) => sum + (battery.capacity * battery.realTimeLevel / 100), 0);
  const averageHealth = batteries.reduce((sum, battery) => sum + battery.health, 0) / batteries.length;
  const totalCycles = batteries.reduce((sum, battery) => sum + battery.cycles, 0);
  const onlineBatteries = batteries.filter(b => b.status === 'online').length;
  const chargingBatteries = batteries.filter(b => b.isCharging).length;
  const dischargingBatteries = batteries.filter(b => !b.isCharging && b.realTimeLevel > 0).length;

  // Performance data for charts
  const generatePerformanceData = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return hours.map(hour => ({
      hour,
      level: 20 + Math.sin((hour - 6) * Math.PI / 12) * 60 + Math.random() * 10,
      power: Math.sin((hour - 6) * Math.PI / 12) * 8 + Math.random() * 2,
      temperature: 22 + Math.sin((hour - 6) * Math.PI / 12) * 8 + Math.random() * 3,
      efficiency: 85 + Math.sin((hour - 6) * Math.PI / 12) * 10 + Math.random() * 5
    }));
  };

  const performanceData = generatePerformanceData();

  // Battery alerts
  const batteryAlerts = [
    {
      id: 1,
      battery: 'Battery Bank 1',
      type: 'warning',
      message: 'Temperature approaching threshold',
      priority: 'medium',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      battery: 'Battery Bank 2',
      type: 'info',
      message: 'Charging cycle completed',
      priority: 'low',
      time: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: 3,
      battery: 'Battery Bank 3',
      type: 'error',
      message: 'Voltage fluctuation detected',
      priority: 'high',
      time: new Date(Date.now() - 1 * 60 * 60 * 1000)
    }
  ];

  const getBatteryColor = (level: number) => {
    if (level > 70) return 'text-solar-green-500';
    if (level > 30) return 'text-solar-amber-500';
    return 'text-red-500';
  };

  const getBatteryStatus = (level: number) => {
    if (level > 70) return 'Excellent';
    if (level > 30) return 'Good';
    return 'Low';
  };

  const getBatteryIcon = (level: number) => {
    if (level > 80) return <BatteryFull className="w-5 h-5 text-solar-green-500" />;
    if (level > 50) return <BatteryMedium className="w-5 h-5 text-solar-amber-500" />;
    return <BatteryLow className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="space-y-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-solar-dark-800 dark:text-white">
              Battery Management
            </h1>
            <p className="text-solar-dark-600 dark:text-solar-dark-300 mt-2">
              Monitor and manage your solar energy storage system
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Button>
          </div>
        </motion.div>

        {/* Enhanced Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-solar-green-400/10 to-solar-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-solar-dark-600 dark:text-solar-dark-300">
                    Total Capacity
                  </p>
                  <p className="text-2xl font-bold text-solar-green-600 dark:text-solar-green-400">
                    {formatNumber(totalCapacity)} kWh
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <BatteryFull className="w-3 h-3 text-solar-green-500" />
                    <p className="text-xs text-solar-dark-600">{batteries.length} batteries</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-green-100 dark:bg-solar-green-900/20">
                  <Battery className="w-6 h-6 text-solar-green-500" />
                </div>
              </div>
              <div className="mt-3 w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-1">
                <div 
                  className="bg-solar-green-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${(totalAvailable / totalCapacity) * 100}%` }}
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
                    Available Energy
                  </p>
                  <p className="text-2xl font-bold text-solar-blue-600 dark:text-solar-blue-400">
                    {formatNumber(totalAvailable)} kWh
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <ArrowUpRight className="w-3 h-3 text-solar-green-500" />
                    <p className="text-xs text-solar-dark-600">{((totalAvailable / totalCapacity) * 100).toFixed(1)}% available</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-blue-100 dark:bg-solar-blue-900/20">
                  <Zap className="w-6 h-6 text-solar-blue-500" />
                </div>
              </div>
              <div className="mt-3 w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-1">
                <div 
                  className="bg-solar-blue-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${(totalAvailable / totalCapacity) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-solar-amber-400/10 to-solar-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-solar-dark-600 dark:text-solar-dark-300">
                    Avg Health
                  </p>
                  <p className="text-2xl font-bold text-solar-amber-600 dark:text-solar-amber-400">
                    {formatPercentage(averageHealth)}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Target className="w-3 h-3 text-solar-amber-500" />
                    <p className="text-xs text-solar-dark-600">Target: 90%</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-amber-100 dark:bg-solar-amber-900/20">
                  <Gauge className="w-6 h-6 text-solar-amber-500" />
                </div>
              </div>
              <div className="mt-3 w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-1">
                <div 
                  className="bg-solar-amber-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${averageHealth}%` }}
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
                    Online Batteries
                  </p>
                  <p className="text-2xl font-bold text-solar-emerald-600 dark:text-solar-emerald-400">
                    {onlineBatteries}/{batteries.length}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <CheckCircle className="w-3 h-3 text-solar-emerald-500" />
                    <p className="text-xs text-solar-dark-600">{((onlineBatteries / batteries.length) * 100).toFixed(1)}% operational</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-emerald-100 dark:bg-solar-emerald-900/20">
                  <Activity className="w-6 h-6 text-solar-emerald-500" />
                </div>
              </div>
              <div className="mt-3 w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-1">
                <div 
                  className="bg-solar-emerald-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${(onlineBatteries / batteries.length) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Battery Performance & Weather */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Battery Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BatteryCharging className="w-5 h-5 text-solar-green-500" />
                <span>System Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-solar-green-50 dark:bg-solar-green-900/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <BatteryCharging className="w-5 h-5 text-solar-green-500" />
                    <div>
                      <p className="font-medium text-solar-dark-800 dark:text-white">Charging</p>
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">{chargingBatteries} batteries</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-solar-green-600">{chargingBatteries}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-solar-blue-50 dark:bg-solar-blue-900/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Battery className="w-5 h-5 text-solar-blue-500" />
                    <div>
                      <p className="font-medium text-solar-dark-800 dark:text-white">Discharging</p>
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">{dischargingBatteries} batteries</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-solar-blue-600">{dischargingBatteries}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-solar-amber-50 dark:bg-solar-amber-900/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Thermometer className="w-5 h-5 text-solar-amber-500" />
                    <div>
                      <p className="font-medium text-solar-dark-800 dark:text-white">Avg Temperature</p>
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">System wide</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-solar-amber-600">24°C</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <LineChart className="w-5 h-5 text-solar-green-500" />
                  <span>24-Hour Performance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={selectedTimeframe === '24h' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTimeframe('24h')}
                  >
                    24H
                  </Button>
                  <Button
                    variant={selectedTimeframe === '7d' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTimeframe('7d')}
                  >
                    7D
                  </Button>
                </div>
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
                  <span className="text-xs text-solar-dark-500">75%</span>
                  <span className="text-xs text-solar-dark-500">50%</span>
                  <span className="text-xs text-solar-dark-500">25%</span>
                  <span className="text-xs text-solar-dark-500">0%</span>
                </div>
                
                {/* Battery Level Line Chart */}
                <svg className="absolute inset-0 w-full h-full" style={{ padding: '16px' }}>
                  <polyline
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={performanceData.map((data, index) => {
                      const x = (index / (performanceData.length - 1)) * 100;
                      const y = 100 - data.level;
                      return `${x}%,${y}%`;
                    }).join(' ')}
                  />
                  {/* Data points */}
                  {performanceData.map((data, index) => {
                    const x = (index / (performanceData.length - 1)) * 100;
                    const y = 100 - data.level;
                    const color = data.level > 80 ? '#22c55e' : data.level > 50 ? '#f59e0b' : '#ef4444';
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
                  <span className="text-xs text-solar-dark-500">6AM</span>
                  <span className="text-xs text-solar-dark-500">12PM</span>
                  <span className="text-xs text-solar-dark-500">6PM</span>
                </div>
                
                {/* Chart legend */}
                <div className="absolute top-2 right-2 flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-solar-green-500 rounded-full"></div>
                    <span className="text-solar-dark-600">Battery Level</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Temperature & Efficiency Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Thermometer className="w-5 h-5 text-solar-amber-500" />
                <span>Temperature & Efficiency</span>
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
                  <span className="text-xs text-solar-dark-500">75%</span>
                  <span className="text-xs text-solar-dark-500">50%</span>
                  <span className="text-xs text-solar-dark-500">25%</span>
                  <span className="text-xs text-solar-dark-500">0%</span>
                </div>
                
                {/* Temperature Line Chart */}
                <svg className="absolute inset-0 w-full h-full" style={{ padding: '16px' }}>
                  <polyline
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={performanceData.map((data, index) => {
                      const x = (index / (performanceData.length - 1)) * 100;
                      const y = 100 - ((data.temperature - 15) / 20) * 100;
                      return `${x}%,${y}%`;
                    }).join(' ')}
                  />
                  {/* Temperature data points */}
                  {performanceData.map((data, index) => {
                    const x = (index / (performanceData.length - 1)) * 100;
                    const y = 100 - ((data.temperature - 15) / 20) * 100;
                    return (
                      <circle
                        key={`temp-${index}`}
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="3"
                        fill="#f59e0b"
                        className="transition-all duration-300 hover:r-5"
                      />
                    );
                  })}
                </svg>
                
                {/* Efficiency Line Chart */}
                <svg className="absolute inset-0 w-full h-full" style={{ padding: '16px' }}>
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={performanceData.map((data, index) => {
                      const x = (index / (performanceData.length - 1)) * 100;
                      const y = 100 - data.efficiency;
                      return `${x}%,${y}%`;
                    }).join(' ')}
                  />
                  {/* Efficiency data points */}
                  {performanceData.map((data, index) => {
                    const x = (index / (performanceData.length - 1)) * 100;
                    const y = 100 - data.efficiency;
                    return (
                      <circle
                        key={`eff-${index}`}
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
                    <div className="w-3 h-3 bg-solar-amber-500 rounded-full"></div>
                    <span className="text-solar-dark-600">Temperature</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-solar-blue-500 rounded-full"></div>
                    <span className="text-solar-dark-600">Efficiency</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Battery Health Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gauge className="w-5 h-5 text-solar-green-500" />
                <span>Health Trend</span>
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
                  <span className="text-xs text-solar-dark-500">75%</span>
                  <span className="text-xs text-solar-dark-500">50%</span>
                  <span className="text-xs text-solar-dark-500">25%</span>
                  <span className="text-xs text-solar-dark-500">0%</span>
                </div>
                
                {/* Health Trend Line Chart */}
                <svg className="absolute inset-0 w-full h-full" style={{ padding: '16px' }}>
                  <polyline
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={performanceData.map((data, index) => {
                      const x = (index / (performanceData.length - 1)) * 100;
                      const y = 100 - (85 + Math.sin((index - 6) * Math.PI / 12) * 5 + Math.random() * 3);
                      return `${x}%,${y}%`;
                    }).join(' ')}
                  />
                  {/* Health data points */}
                  {performanceData.map((data, index) => {
                    const x = (index / (performanceData.length - 1)) * 100;
                    const y = 100 - (85 + Math.sin((index - 6) * Math.PI / 12) * 5 + Math.random() * 3);
                    const healthValue = 85 + Math.sin((index - 6) * Math.PI / 12) * 5 + Math.random() * 3;
                    const color = healthValue > 90 ? '#22c55e' : healthValue > 80 ? '#f59e0b' : '#ef4444';
                    return (
                      <circle
                        key={`health-${index}`}
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
                  <span className="text-xs text-solar-dark-500">6AM</span>
                  <span className="text-xs text-solar-dark-500">12PM</span>
                  <span className="text-xs text-solar-dark-500">6PM</span>
                </div>
                
                {/* Chart legend */}
                <div className="absolute top-2 right-2 flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-solar-green-500 rounded-full"></div>
                    <span className="text-solar-dark-600">Health</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col lg:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-solar-dark-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search batteries by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-solar-dark-300 dark:border-solar-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 bg-white dark:bg-solar-dark-800 text-solar-dark-800 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-solar-dark-300 dark:border-solar-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 bg-white dark:bg-solar-dark-800 text-solar-dark-800 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
            <Button
              variant="outline"
              onClick={() => setShowOfflineBatteries(!showOfflineBatteries)}
              className="flex items-center space-x-2"
            >
              {showOfflineBatteries ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>Offline</span>
            </Button>
            <div className="flex items-center space-x-1 border border-solar-dark-300 dark:border-solar-dark-600 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Battery Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-solar-amber-500" />
                  <span>Battery Alerts</span>
                </div>
                <Button variant="ghost" size="sm" className="text-solar-dark-600 hover:text-solar-dark-800">
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {batteryAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${
                      alert.type === 'error' ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800' :
                      alert.type === 'warning' ? 'bg-solar-amber-50 dark:bg-solar-amber-900/10 border-solar-amber-200 dark:border-solar-amber-800' :
                      'bg-solar-blue-50 dark:bg-solar-blue-900/10 border-solar-blue-200 dark:border-solar-blue-800'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        alert.type === 'error' ? 'bg-red-100 dark:bg-red-900/20' :
                        alert.type === 'warning' ? 'bg-solar-amber-100 dark:bg-solar-amber-900/20' :
                        'bg-solar-blue-100 dark:bg-solar-blue-900/20'
                      }`}>
                        {alert.type === 'error' ? <AlertTriangle className="w-4 h-4 text-red-600" /> :
                         alert.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-solar-amber-600" /> :
                         <CheckCircle className="w-4 h-4 text-solar-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-solar-dark-800 dark:text-white text-sm">
                          {alert.battery}
                        </h4>
                        <p className="text-solar-dark-600 dark:text-solar-dark-300 text-xs mt-1">
                          {alert.message}
                        </p>
                        <p className="text-solar-dark-400 text-xs mt-2">
                          {formatDateTime(alert.time)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Battery Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
        >
          <AnimatePresence>
            {currentBatteries.map((battery, index) => (
              <motion.div
                key={battery.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <Card className={`hover:shadow-lg transition-all duration-200 cursor-pointer group h-full flex flex-col ${
                  viewMode === 'list' ? 'flex-row items-center' : ''
                }`}>
                  <CardHeader className={`pb-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-solar-green-100 dark:bg-solar-green-900/20">
                          {getBatteryIcon(battery.realTimeLevel)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{battery.name}</CardTitle>
                          <div className="flex items-center space-x-2 text-sm text-solar-dark-600 dark:text-solar-dark-300">
                            <MapPin className="w-3 h-3" />
                            <span>{battery.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          battery.status === 'online' ? 'bg-solar-green-100 text-solar-green-800 dark:bg-solar-green-900/20 dark:text-solar-green-400' :
                          battery.status === 'warning' ? 'bg-solar-amber-100 text-solar-amber-800 dark:bg-solar-amber-900/20 dark:text-solar-amber-400' :
                          battery.status === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                          'bg-solar-dark-100 text-solar-dark-800 dark:bg-solar-dark-900/20 dark:text-solar-dark-400'
                        }`}>
                          {battery.status}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className={`${viewMode === 'list' ? 'flex-1' : 'flex-1'} flex flex-col`}>
                    <div className={`${viewMode === 'list' ? 'grid grid-cols-4 gap-4' : 'space-y-3'} flex-1`}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Charge Level</span>
                        <span className={`font-medium ${getBatteryColor(battery.realTimeLevel)}`}>
                          {formatPercentage(battery.realTimeLevel)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Capacity</span>
                        <span className="font-medium text-solar-dark-800 dark:text-white">
                          {formatNumber(battery.capacity)} kWh
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Temperature</span>
                        <span className="font-medium text-solar-dark-800 dark:text-white">
                          {battery.temperature.toFixed(1)}°C
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Health</span>
                        <span className="font-medium text-solar-dark-800 dark:text-white">
                          {formatPercentage(battery.health)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Battery Controls */}
                    <div className={`${viewMode === 'list' ? 'col-span-4' : ''} pt-3 border-t border-solar-dark-200 dark:border-solar-dark-700 mt-auto`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Battery Control</span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant={battery.isCharging ? "default" : "outline"}
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Toggle charging
                            }}
                            className={`flex items-center space-x-1 ${
                              battery.isCharging 
                                ? 'bg-solar-green-500 hover:bg-solar-green-600 text-white' 
                                : 'text-solar-dark-600 dark:text-solar-dark-300'
                            }`}
                          >
                            {battery.isCharging ? (
                              <>
                                <BatteryCharging className="w-3 h-3" />
                                <span>Charging</span>
                              </>
                            ) : (
                              <>
                                <Battery className="w-3 h-3" />
                                <span>Standby</span>
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              // View detailed battery info
                            }}
                            className="text-solar-dark-600 dark:text-solar-dark-300"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-between"
          >
            <div className="text-sm text-solar-dark-600 dark:text-solar-dark-300">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredBatteries.length)} of {filteredBatteries.length} batteries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-1"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Battery Performance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-solar-blue-500" />
                <span>Performance Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-solar-green-50 dark:bg-solar-green-900/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Leaf className="w-5 h-5 text-solar-green-500" />
                    <div>
                      <p className="font-medium text-solar-dark-800 dark:text-white">Lifetime Energy</p>
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Total stored</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-solar-green-600">{formatNumber(batteries.reduce((sum, b) => sum + b.lifetimeEnergy, 0))} kWh</p>
                    <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">CO₂ saved</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-solar-blue-50 dark:bg-solar-blue-900/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-solar-blue-500" />
                    <div>
                      <p className="font-medium text-solar-dark-800 dark:text-white">Monthly Savings</p>
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Cost reduction</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-solar-blue-600">{formatCurrency(batteries.reduce((sum, b) => sum + b.monthlyEnergy, 0) * 0.12)}</p>
                    <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">vs grid power</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-solar-green-500" />
                <span>System Health</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Overall Health</span>
                  <span className="text-lg font-bold text-solar-green-600">Excellent</span>
                </div>
                <div className="w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-2">
                  <div className="bg-solar-green-500 h-2 rounded-full" style={{ width: `${averageHealth}%` }}></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-solar-green-50 dark:bg-solar-green-900/10 rounded-lg">
                    <p className="text-sm text-solar-dark-600">Total Cycles</p>
                    <p className="text-lg font-bold text-solar-green-600">{formatNumber(totalCycles)}</p>
                  </div>
                  <div className="text-center p-3 bg-solar-amber-50 dark:bg-solar-amber-900/10 rounded-lg">
                    <p className="text-sm text-solar-dark-600">Avg Age</p>
                    <p className="text-lg font-bold text-solar-amber-600">{batteries.reduce((sum, b) => sum + b.age, 0) / batteries.length} years</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
  );
}
