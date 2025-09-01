'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  MapPin,
  Activity,
  Gauge,
  Target,
  Clock,
  Calendar,
  Cloud,
  Wind,
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
  Battery,
  Leaf,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause,
  RotateCcw,
  Search,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockSolarData, mockDevices } from '@/lib/mockData';
import { formatNumber, formatPercentage, formatCurrency, formatDateTime } from '@/lib/utils';

export default function SolarPanelsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const [showOfflinePanels, setShowOfflinePanels] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const panelsPerPage = 6;

  // Static solar panel data
  const solarPanels = mockDevices.filter(device => device.type === 'solar_panel').map((panel, index) => ({
    ...panel,
    realTimePower: panel.powerUsage + 0.3,
    temperature: 28 + (index % 6), // Static values based on index
    voltage: 230 + (index % 15), // Static values based on index
    current: panel.powerUsage * 4.5 + 0.8,
    irradiance: 850 + (index * 25), // Static values based on index
    tiltAngle: 35 + (index % 8), // Static values based on index
    azimuth: 180 + (index % 8), // Static values based on index
    soiling: 2 + (index % 4), // Static values based on index
    degradation: 0.5 + (index % 2), // Static values based on index
    uptime: 600 + (index * 30), // Static values based on index
    dailyEnergy: 35 + (index * 2), // Static values based on index
    monthlyEnergy: 800 + (index * 50), // Static values based on index
    lifetimeEnergy: 25000 + (index * 1000), // Static values based on index
    alerts: index % 2, // Static values based on index
    lastMaintenance: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000), // Static dates based on index
    nextMaintenance: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000) // Static dates based on index
  }));

  // Filter panels
  const filteredPanels = solarPanels.filter(panel => {
    const matchesSearch = panel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         panel.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || panel.status === statusFilter;
    const matchesOffline = showOfflinePanels || panel.status !== 'offline';
    return matchesSearch && matchesStatus && matchesOffline;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPanels.length / panelsPerPage);
  const startIndex = (currentPage - 1) * panelsPerPage;
  const endIndex = startIndex + panelsPerPage;
  const currentPanels = filteredPanels.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, showOfflinePanels]);

  // Calculate metrics
  const totalPower = solarPanels.reduce((sum, panel) => sum + panel.realTimePower, 0);
  const averageEfficiency = solarPanels.reduce((sum, panel) => sum + panel.efficiency, 0) / solarPanels.length;
  const totalDailyEnergy = solarPanels.reduce((sum, panel) => sum + panel.dailyEnergy, 0);
  const totalMonthlyEnergy = solarPanels.reduce((sum, panel) => sum + panel.monthlyEnergy, 0);
  const totalLifetimeEnergy = solarPanels.reduce((sum, panel) => sum + panel.lifetimeEnergy, 0);
  const onlinePanels = solarPanels.filter(p => p.status === 'online').length;
  const warningPanels = solarPanels.filter(p => p.status === 'warning').length;
  const errorPanels = solarPanels.filter(p => p.status === 'error').length;

  // Weather data
  const weatherData = {
    temperature: 28,
    condition: 'Sunny',
    humidity: 45,
    windSpeed: 12,
    irradiance: 950,
    uvIndex: 8,
    visibility: 'Excellent'
  };

  // Performance data for charts
  const generatePerformanceData = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return hours.map(hour => ({
      hour,
      power: Math.sin((hour - 6) * Math.PI / 12) * 15 + 5 + Math.random() * 3,
      efficiency: 85 + Math.sin((hour - 6) * Math.PI / 12) * 10 + Math.random() * 5,
      irradiance: Math.sin((hour - 6) * Math.PI / 12) * 800 + 200 + Math.random() * 100
    }));
  };

  const performanceData = generatePerformanceData();

  // Maintenance alerts
  const maintenanceAlerts = [
    {
      id: 1,
      panel: 'Solar Panel Array 1',
      type: 'warning',
      message: 'Cleaning due in 3 days',
      priority: 'medium',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      panel: 'Solar Panel Array 3',
      type: 'info',
      message: 'Annual inspection completed',
      priority: 'low',
      time: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: 3,
      panel: 'Solar Panel Array 2',
      type: 'error',
      message: 'Inverter connection issue detected',
      priority: 'high',
      time: new Date(Date.now() - 1 * 60 * 60 * 1000)
    }
  ];

  const getPanelStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-solar-green-500';
      case 'warning':
        return 'text-solar-amber-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-solar-dark-400';
    }
  };

  const getPanelStatusBg = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-solar-green-50 dark:bg-solar-green-900/10';
      case 'warning':
        return 'bg-solar-amber-50 dark:bg-solar-amber-900/10';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/10';
      default:
        return 'bg-solar-dark-50 dark:bg-solar-dark-900/10';
    }
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
              Solar Panels
            </h1>
            <p className="text-solar-dark-600 dark:text-solar-dark-300 mt-2">
              Monitor and manage your solar panel arrays and performance
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
            <div className="absolute inset-0 bg-gradient-to-r from-solar-yellow-400/10 to-solar-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-solar-dark-600 dark:text-solar-dark-300">
                    Total Power
                  </p>
                  <p className="text-2xl font-bold text-solar-yellow-600 dark:text-solar-yellow-400">
                    {formatNumber(totalPower)} kW
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <ArrowUpRight className="w-3 h-3 text-solar-green-500" />
                    <p className="text-xs text-solar-dark-600">+8.2% vs yesterday</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-yellow-100 dark:bg-solar-yellow-900/20">
                  <Zap className="w-6 h-6 text-solar-yellow-500" />
                </div>
              </div>
              <div className="mt-3 w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-1">
                <div 
                  className="bg-solar-yellow-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${(totalPower / 50) * 100}%` }}
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
                    Daily Energy
                  </p>
                  <p className="text-2xl font-bold text-solar-green-600 dark:text-solar-green-400">
                    {formatNumber(totalDailyEnergy)} kWh
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <ArrowUpRight className="w-3 h-3 text-solar-green-500" />
                    <p className="text-xs text-solar-dark-600">+12.5% vs yesterday</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-green-100 dark:bg-solar-green-900/20">
                  <Sun className="w-6 h-6 text-solar-green-500" />
                </div>
              </div>
              <div className="mt-3 w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-1">
                <div 
                  className="bg-solar-green-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${(totalDailyEnergy / 200) * 100}%` }}
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
                    Avg Efficiency
                  </p>
                  <p className="text-2xl font-bold text-solar-blue-600 dark:text-solar-blue-400">
                    {formatPercentage(averageEfficiency)}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Target className="w-3 h-3 text-solar-blue-500" />
                    <p className="text-xs text-solar-dark-600">Target: 90%</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-blue-100 dark:bg-solar-blue-900/20">
                  <Gauge className="w-6 h-6 text-solar-blue-500" />
                </div>
              </div>
              <div className="mt-3 w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-1">
                <div 
                  className="bg-solar-blue-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${averageEfficiency}%` }}
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
                    Online Panels
                  </p>
                  <p className="text-2xl font-bold text-solar-emerald-600 dark:text-solar-emerald-400">
                    {onlinePanels}/{solarPanels.length}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <CheckCircle className="w-3 h-3 text-solar-emerald-500" />
                    <p className="text-xs text-solar-dark-600">{((onlinePanels / solarPanels.length) * 100).toFixed(1)}% operational</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-emerald-100 dark:bg-solar-emerald-900/20">
                  <Activity className="w-6 h-6 text-solar-emerald-500" />
                </div>
              </div>
              <div className="mt-3 w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-1">
                <div 
                  className="bg-solar-emerald-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${(onlinePanels / solarPanels.length) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weather and Performance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Weather Widget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cloud className="w-5 h-5 text-solar-blue-500" />
                <span>Weather Conditions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-solar-blue-50 dark:bg-solar-blue-900/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Thermometer className="w-5 h-5 text-solar-blue-500" />
                    <div>
                      <p className="font-medium text-solar-dark-800 dark:text-white">Temperature</p>
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Current</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-solar-blue-600">{weatherData.temperature}°C</p>
                    <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">{weatherData.condition}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2 p-2 bg-solar-green-50 dark:bg-solar-green-900/10 rounded-lg">
                    <Sun className="w-4 h-4 text-solar-green-500" />
                    <div>
                      <p className="text-sm font-medium text-solar-dark-800 dark:text-white">{weatherData.irradiance} W/m²</p>
                      <p className="text-xs text-solar-dark-600 dark:text-solar-dark-300">Irradiance</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-solar-amber-50 dark:bg-solar-amber-900/10 rounded-lg">
                    <Wind className="w-4 h-4 text-solar-amber-500" />
                    <div>
                      <p className="text-sm font-medium text-solar-dark-800 dark:text-white">{weatherData.windSpeed} km/h</p>
                      <p className="text-xs text-solar-dark-600 dark:text-solar-dark-300">Wind Speed</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Chart */}
          <Card className="lg:col-span-2">
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
                
                {/* Power Output Line Chart */}
                <svg className="absolute inset-0 w-full h-full" style={{ padding: '16px' }}>
                  <polyline
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={performanceData.map((data, index) => {
                      const x = (index / (performanceData.length - 1)) * 100;
                      const y = 100 - ((data.power / 20) * 100);
                      return `${x}%,${y}%`;
                    }).join(' ')}
                  />
                  {/* Data points */}
                  {performanceData.map((data, index) => {
                    const x = (index / (performanceData.length - 1)) * 100;
                    const y = 100 - ((data.power / 20) * 100);
                    return (
                      <circle
                        key={index}
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="3"
                        fill="#f59e0b"
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
              placeholder="Search panels by name or location..."
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
              onClick={() => setShowOfflinePanels(!showOfflinePanels)}
              className="flex items-center space-x-2"
            >
              {showOfflinePanels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
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

        {/* Maintenance Alerts */}
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
                  <span>Maintenance Alerts</span>
                </div>
                <Button variant="ghost" size="sm" className="text-solar-dark-600 hover:text-solar-dark-800">
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {maintenanceAlerts.map((alert, index) => (
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
                          {alert.panel}
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

        {/* Enhanced Solar Panel Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
        >
          <AnimatePresence>
            {currentPanels.map((panel, index) => (
              <motion.div
                key={panel.id}
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
                        <div className="p-2 rounded-lg bg-solar-yellow-100 dark:bg-solar-yellow-900/20">
                          <Sun className="w-5 h-5 text-solar-yellow-500" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{panel.name}</CardTitle>
                          <div className="flex items-center space-x-2 text-sm text-solar-dark-600 dark:text-solar-dark-300">
                            <MapPin className="w-3 h-3" />
                            <span>{panel.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPanelStatusBg(panel.status)} ${getPanelStatusColor(panel.status)}`}>
                          {panel.status}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className={`${viewMode === 'list' ? 'flex-1' : 'flex-1'} flex flex-col`}>
                    <div className={`${viewMode === 'list' ? 'grid grid-cols-4 gap-4' : 'space-y-3'} flex-1`}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Power Output</span>
                        <span className="font-medium text-solar-dark-800 dark:text-white">
                          {panel.realTimePower.toFixed(2)} kW
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Efficiency</span>
                        <span className={`font-medium ${
                          panel.efficiency > 90 ? 'text-solar-green-500' :
                          panel.efficiency > 80 ? 'text-solar-amber-500' : 'text-red-500'
                        }`}>
                          {formatPercentage(panel.efficiency)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Temperature</span>
                        <span className="font-medium text-solar-dark-800 dark:text-white">
                          {panel.temperature.toFixed(1)}°C
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Daily Energy</span>
                        <span className="font-medium text-solar-dark-800 dark:text-white">
                          {panel.dailyEnergy.toFixed(1)} kWh
                        </span>
                      </div>
                    </div>
                    
                    {/* Panel Details */}
                    <div className={`${viewMode === 'list' ? 'col-span-4' : ''} pt-3 border-t border-solar-dark-200 dark:border-solar-dark-700 mt-auto`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Panel Details</span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              // View detailed panel info
                            }}
                            className="text-solar-dark-600 dark:text-solar-dark-300"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Restart panel
                            }}
                            className="text-solar-dark-600 dark:text-solar-dark-300"
                          >
                            <RotateCcw className="w-3 h-3" />
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
              Showing {startIndex + 1} to {Math.min(endIndex, filteredPanels.length)} of {filteredPanels.length} panels
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

        {/* Performance Summary */}
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
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Total generated</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-solar-green-600">{formatNumber(totalLifetimeEnergy)} kWh</p>
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
                    <p className="font-bold text-solar-blue-600">{formatCurrency(totalMonthlyEnergy * 0.12)}</p>
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
                  <div className="bg-solar-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-solar-green-50 dark:bg-solar-green-900/10 rounded-lg">
                    <p className="text-sm text-solar-dark-600">Online</p>
                    <p className="text-lg font-bold text-solar-green-600">{onlinePanels}</p>
                  </div>
                  <div className="text-center p-3 bg-solar-amber-50 dark:bg-solar-amber-900/10 rounded-lg">
                    <p className="text-sm text-solar-dark-600">Warnings</p>
                    <p className="text-lg font-bold text-solar-amber-600">{warningPanels}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
  );
}
