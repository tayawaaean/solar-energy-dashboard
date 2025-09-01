'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Power, 
  PowerOff, 
  Search, 
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Activity,
  Battery,
  Sun,
  Wifi,
  WifiOff,
  Gauge,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  EyeOff,
  Play,
  Pause,
  RotateCcw,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Shield,
  Bell,
  Plus,
  Grid,
  List,
  Download,
  Upload,
  Target,
  Calendar,
  MapPin,
  Cpu,
  HardDrive,
  Monitor,
  Smartphone,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockDevices } from '@/lib/mockData';
import { getStatusColor, getStatusBgColor, formatDateTime, formatNumber } from '@/lib/utils';

export default function DevicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [deviceStates, setDeviceStates] = useState<Record<string, boolean>>({});
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showOfflineDevices, setShowOfflineDevices] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const devicesPerPage = 6;

  // Static device data
  const devices = mockDevices.map((device, index) => ({
    ...device,
    realTimePower: device.powerUsage + 0.2,
    temperature: 25 + (index % 8), // Static values based on index
    humidity: 60 + (index % 15), // Static values based on index
    voltage: 220 + (index % 8), // Static values based on index
    current: device.powerUsage * 4.5 + 0.5,
    uptime: 500 + (index * 25), // Static values based on index
    alerts: index % 3 // Static values based on index
  }));

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    const matchesType = typeFilter === 'all' || device.type === typeFilter;
    const matchesOffline = showOfflineDevices || device.status !== 'offline';
    return matchesSearch && matchesStatus && matchesType && matchesOffline;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDevices.length / devicesPerPage);
  const startIndex = (currentPage - 1) * devicesPerPage;
  const endIndex = startIndex + devicesPerPage;
  const currentDevices = filteredDevices.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter, showOfflineDevices]);

  const toggleDevice = (deviceId: string) => {
    setDeviceStates(prev => ({
      ...prev,
      [deviceId]: !prev[deviceId]
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-solar-green-500" />;
      case 'offline':
        return <XCircle className="w-4 h-4 text-solar-dark-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-solar-amber-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-solar-dark-400" />;
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'solar_panel':
        return <Sun className="w-5 h-5 text-solar-yellow-500" />;
      case 'battery':
        return <Battery className="w-5 h-5 text-solar-green-500" />;
      case 'inverter':
        return <Cpu className="w-5 h-5 text-solar-blue-500" />;
      case 'pump':
        return <Droplets className="w-5 h-5 text-solar-blue-500" />;
      case 'lighting':
        return <Zap className="w-5 h-5 text-solar-yellow-500" />;
      case 'appliance':
        return <Monitor className="w-5 h-5 text-solar-dark-500" />;
      default:
        return <Zap className="w-5 h-5 text-solar-dark-500" />;
    }
  };

  // Calculate system metrics
  const totalDevices = devices.length;
  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const warningDevices = devices.filter(d => d.status === 'warning').length;
  const errorDevices = devices.filter(d => d.status === 'error').length;
  const totalPower = devices.reduce((sum, device) => sum + device.realTimePower, 0);
  const averageEfficiency = devices.length > 0 ? devices.reduce((sum, device) => sum + device.efficiency, 0) / devices.length : 0;

  // Recent alerts
  const recentAlerts = [
    {
      id: 1,
      device: 'Solar Panel Array 1',
      type: 'warning',
      message: 'Efficiency dropped below 85%',
      time: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: 2,
      device: 'Battery Bank 2',
      type: 'info',
      message: 'Charging cycle completed',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 3,
      device: 'Inverter 1',
      type: 'error',
      message: 'Temperature exceeded threshold',
      time: new Date(Date.now() - 4 * 60 * 60 * 1000)
    }
  ];



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
                Device Management
              </h1>
              <p className="text-solar-dark-600 dark:text-solar-dark-300 mt-2">
                Monitor and control all connected devices in your solar energy system
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
              <Plus className="w-4 h-4" />
              <span>Add Device</span>
            </Button>
          </div>
        </motion.div>

        {/* Enhanced System Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-solar-blue-400/10 to-solar-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-solar-dark-600 dark:text-solar-dark-300">
                    Total Devices
                  </p>
                  <p className="text-2xl font-bold text-solar-blue-600 dark:text-solar-blue-400">
                    {totalDevices}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-solar-green-500" />
                    <p className="text-xs text-solar-dark-600">+2 this month</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-blue-100 dark:bg-solar-blue-900/20">
                  <Activity className="w-6 h-6 text-solar-blue-500" />
                </div>
              </div>
              <div className="mt-3 w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-1">
                <div 
                  className="bg-solar-blue-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${(onlineDevices / totalDevices) * 100}%` }}
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
                    Online Devices
                  </p>
                  <p className="text-2xl font-bold text-solar-green-600 dark:text-solar-green-400">
                    {onlineDevices}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <CheckCircle className="w-3 h-3 text-solar-green-500" />
                    <p className="text-xs text-solar-dark-600">{((onlineDevices / totalDevices) * 100).toFixed(1)}% operational</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-green-100 dark:bg-solar-green-900/20">
                  <Wifi className="w-6 h-6 text-solar-green-500" />
                </div>
              </div>
              <div className="mt-3 w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-1">
                <div 
                  className="bg-solar-green-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${(onlineDevices / totalDevices) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

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
                    <TrendingUp className="w-3 h-3 text-solar-green-500" />
                    <p className="text-xs text-solar-dark-600">+5.2% from yesterday</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-yellow-100 dark:bg-solar-yellow-900/20">
                  <Power className="w-6 h-6 text-solar-yellow-500" />
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
            <div className="absolute inset-0 bg-gradient-to-r from-solar-emerald-400/10 to-solar-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-solar-dark-600 dark:text-solar-dark-300">
                    Avg Efficiency
                  </p>
                  <p className="text-2xl font-bold text-solar-emerald-600 dark:text-solar-emerald-400">
                    {averageEfficiency.toFixed(1)}%
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Target className="w-3 h-3 text-solar-emerald-500" />
                    <p className="text-xs text-solar-dark-600">Target: 90%</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-emerald-100 dark:bg-solar-emerald-900/20">
                  <Gauge className="w-6 h-6 text-solar-emerald-500" />
                </div>
              </div>
              <div className="mt-3 w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-1">
                <div 
                  className="bg-solar-emerald-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${averageEfficiency}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-solar-dark-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search devices by name or location..."
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
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 border border-solar-dark-300 dark:border-solar-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 bg-white dark:bg-solar-dark-800 text-solar-dark-800 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="solar_panel">Solar Panels</option>
              <option value="battery">Batteries</option>
              <option value="inverter">Inverters</option>
              <option value="pump">Pumps</option>
              <option value="lighting">Lighting</option>
              <option value="appliance">Appliances</option>
            </select>
            <Button
              variant="outline"
              onClick={() => setShowOfflineDevices(!showOfflineDevices)}
              className="flex items-center space-x-2"
            >
              {showOfflineDevices ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
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

        {/* Recent Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-solar-amber-500" />
                  <span>Recent Alerts</span>
                </div>
                <Button variant="ghost" size="sm" className="text-solar-dark-600 hover:text-solar-dark-800">
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentAlerts.map((alert, index) => (
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
                        {alert.type === 'error' ? <XCircle className="w-4 h-4 text-red-600" /> :
                         alert.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-solar-amber-600" /> :
                         <CheckCircle className="w-4 h-4 text-solar-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-solar-dark-800 dark:text-white text-sm">
                          {alert.device}
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

                 {/* Enhanced Device Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.4 }}
           className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
        >
           <AnimatePresence>
             {currentDevices.map((device, index) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                                 <Card className={`hover:shadow-lg transition-all duration-200 cursor-pointer group h-full flex flex-col ${
                   viewMode === 'list' ? 'flex-row items-center' : ''
                 }`} onClick={() => setSelectedDevice(device.id)}>
                   <CardHeader className={`pb-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-solar-dark-100 dark:bg-solar-dark-800">
                      {getDeviceIcon(device.type)}
                        </div>
                      <div>
                        <CardTitle className="text-lg">{device.name}</CardTitle>
                          <div className="flex items-center space-x-2 text-sm text-solar-dark-600 dark:text-solar-dark-300">
                            <MapPin className="w-3 h-3" />
                            <span>{device.location}</span>
                          </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(device.status)}
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusBgColor(device.status)} ${getStatusColor(device.status)}`}>
                        {device.status}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                                     <CardContent className={`${viewMode === 'list' ? 'flex-1' : 'flex-1'} flex flex-col`}>
                     <div className={`${viewMode === 'list' ? 'grid grid-cols-4 gap-4' : 'space-y-3'} flex-1`}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Power Usage</span>
                      <span className="font-medium text-solar-dark-800 dark:text-white">
                           {device.realTimePower.toFixed(2)} kW
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Efficiency</span>
                      <span className="font-medium text-solar-dark-800 dark:text-white">
                        {device.efficiency}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                         <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Temperature</span>
                         <span className="font-medium text-solar-dark-800 dark:text-white">
                           {device.temperature.toFixed(1)}°C
                         </span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Uptime</span>
                         <span className="font-medium text-solar-dark-800 dark:text-white">
                           {device.uptime}h
                      </span>
                       </div>
                    </div>
                    
                     {/* Device Control - Always present but conditionally styled */}
                     <div className={`${viewMode === 'list' ? 'col-span-4' : ''} pt-3 border-t border-solar-dark-200 dark:border-solar-dark-700 mt-auto`}>
                        <div className="flex items-center justify-between">
                         <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Power Control</span>
                         <div className="flex items-center space-x-2">
                           {device.type !== 'solar_panel' ? (
                             <>
                          <Button
                            variant={deviceStates[device.id] ? "default" : "outline"}
                            size="sm"
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   toggleDevice(device.id);
                                 }}
                            className={`flex items-center space-x-1 ${
                              deviceStates[device.id] 
                                ? 'bg-solar-green-500 hover:bg-solar-green-600 text-white' 
                                : 'text-solar-dark-600 dark:text-solar-dark-300'
                            }`}
                          >
                            {deviceStates[device.id] ? (
                              <>
                                <Power className="w-3 h-3" />
                                <span>ON</span>
                              </>
                            ) : (
                              <>
                                <PowerOff className="w-3 h-3" />
                                <span>OFF</span>
                              </>
                            )}
                          </Button>
                               <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   // Restart device
                                 }}
                                 className="text-solar-dark-600 dark:text-solar-dark-300"
                               >
                                 <RotateCcw className="w-3 h-3" />
                               </Button>
                             </>
                           ) : (
                             <div className="text-xs text-solar-dark-500 dark:text-solar-dark-400 italic">
                               Solar panels are always active
                      </div>
                    )}
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
             transition={{ duration: 0.5, delay: 0.5 }}
             className="flex items-center justify-between"
           >
             <div className="text-sm text-solar-dark-600 dark:text-solar-dark-300">
               Showing {startIndex + 1} to {Math.min(endIndex, filteredDevices.length)} of {filteredDevices.length} devices
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

        {/* Device Performance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-solar-blue-500" />
                <span>Device Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-solar-green-50 dark:bg-solar-green-900/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-solar-green-500" />
                <div>
                      <p className="font-medium text-solar-dark-800 dark:text-white">Online Devices</p>
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">{onlineDevices} devices</p>
                    </div>
                </div>
                  <div className="text-right">
                    <p className="font-bold text-solar-green-600">{((onlineDevices / totalDevices) * 100).toFixed(1)}%</p>
                </div>
              </div>
                <div className="flex items-center justify-between p-3 bg-solar-amber-50 dark:bg-solar-amber-900/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-solar-amber-500" />
                <div>
                      <p className="font-medium text-solar-dark-800 dark:text-white">Warning Devices</p>
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">{warningDevices} devices</p>
                    </div>
                </div>
                  <div className="text-right">
                    <p className="font-bold text-solar-amber-600">{((warningDevices / totalDevices) * 100).toFixed(1)}%</p>
                </div>
              </div>
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <XCircle className="w-5 h-5 text-red-500" />
                <div>
                      <p className="font-medium text-solar-dark-800 dark:text-white">Error Devices</p>
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">{errorDevices} devices</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">{((errorDevices / totalDevices) * 100).toFixed(1)}%</p>
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
                  <div className="bg-solar-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-solar-blue-50 dark:bg-solar-blue-900/10 rounded-lg">
                    <p className="text-sm text-solar-dark-600">Avg Response</p>
                    <p className="text-lg font-bold text-solar-blue-600">45ms</p>
                  </div>
                  <div className="text-center p-3 bg-solar-green-50 dark:bg-solar-green-900/10 rounded-lg">
                    <p className="text-sm text-solar-dark-600">Uptime</p>
                    <p className="text-lg font-bold text-solar-green-600">99.8%</p>
                </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
  );
}
