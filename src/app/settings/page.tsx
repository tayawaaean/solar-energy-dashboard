'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Sun, Moon, Bell, Shield, User, Database, Zap, 
  Monitor, Smartphone, Tablet, Globe, Lock, Eye, EyeOff,
  Download, Upload, RotateCcw, Save, CheckCircle, AlertCircle,
  RefreshCw, Clock, Calendar, Mail, Phone, MapPin, Key,
  Trash2, AlertTriangle, Info, ChevronRight, ChevronDown,
  Wifi, WifiOff, Battery, BatteryCharging, HardDrive,
  Activity, BarChart3, LineChart, PieChart, Gauge
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsPage() {
  const { theme, setTheme, isDark } = useTheme();
  const [notifications, setNotifications] = useState({
    system: true,
    alerts: true,
    maintenance: false,
    reports: true,
    email: true,
    push: false
  });
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [showPassword, setShowPassword] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  // Form states
  const [profile, setProfile] = useState({
    name: 'John Solar',
    email: 'admin@solarfarm.com',
    phone: '+1 (555) 123-4567',
    location: 'Solar Farm, CA',
    role: 'Administrator',
    department: 'Management'
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5
  });

  const [system, setSystem] = useState({
    language: 'en',
    timezone: 'America/Los_Angeles',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    currency: 'USD'
  });

  // Handle save
  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSavedSuccessfully(true);
    setTimeout(() => setSavedSuccessfully(false), 3000);
  };

  // Handle export
  const handleExport = () => {
    const data = {
      profile,
      notifications,
      security,
      system,
      theme,
      autoRefresh,
      refreshInterval
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'solar-farm-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle reset
  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      // Reset all settings to default
      setNotifications({
        system: true,
        alerts: true,
        maintenance: false,
        reports: true,
        email: true,
        push: false
      });
      setAutoRefresh(true);
      setRefreshInterval(30);
      setTheme('system');
      // Add more resets as needed
    }
  };

  return (
    <div className="space-y-4">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-2"
        >
            <div>
              <h1 className="text-3xl font-bold text-solar-dark-800 dark:text-white">
              System Settings
              </h1>
            <p className="text-solar-dark-600 dark:text-solar-dark-300 mt-1">
              Configure your solar energy system preferences and account settings
              </p>
            </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleExport}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
              <Save className="w-4 h-4" />
              )}
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </Button>
          </div>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {savedSuccessfully && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center space-x-2 p-4 bg-solar-green-50 dark:bg-solar-green-900/10 border border-solar-green-200 dark:border-solar-green-800 rounded-lg"
            >
              <CheckCircle className="w-5 h-5 text-solar-green-500" />
              <span className="text-solar-green-700 dark:text-solar-green-300 font-medium">
                Settings saved successfully!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Appearance Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-solar-yellow-400/10 to-solar-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center space-x-2">
                  <Sun className="w-5 h-5 text-solar-yellow-500" />
                  <span>Appearance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative">
                {/* Theme Selection */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-solar-dark-800 dark:text-white mb-2">Theme</h3>
                    <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300 mb-4">
                      Choose your preferred color scheme
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setTheme('light')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          theme === 'light'
                            ? 'border-solar-yellow-500 bg-solar-yellow-50 dark:bg-solar-yellow-900/20'
                            : 'border-solar-dark-200 dark:border-solar-dark-700 hover:border-solar-yellow-300'
                        }`}
                      >
                        <Sun className="w-6 h-6 mx-auto mb-2 text-solar-yellow-500" />
                        <span className="text-sm font-medium">Light</span>
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          theme === 'dark'
                            ? 'border-solar-yellow-500 bg-solar-yellow-50 dark:bg-solar-yellow-900/20'
                            : 'border-solar-dark-200 dark:border-solar-dark-700 hover:border-solar-yellow-300'
                        }`}
                      >
                        <Moon className="w-6 h-6 mx-auto mb-2 text-solar-blue-500" />
                        <span className="text-sm font-medium">Dark</span>
                      </button>
                      <button
                        onClick={() => setTheme('system')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          theme === 'system'
                            ? 'border-solar-yellow-500 bg-solar-yellow-50 dark:bg-solar-yellow-900/20'
                            : 'border-solar-dark-200 dark:border-solar-dark-700 hover:border-solar-yellow-300'
                        }`}
                      >
                        <Monitor className="w-6 h-6 mx-auto mb-2 text-solar-green-500" />
                        <span className="text-sm font-medium">System</span>
                      </button>
                    </div>
                  </div>

                  {/* Current Theme Info */}
                  <div className="p-3 bg-solar-dark-50 dark:bg-solar-dark-900/10 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">
                        Current Theme:
                      </span>
                      <span className="text-sm font-medium text-solar-dark-800 dark:text-white">
                        {theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'}
                        {theme === 'system' && (
                          <span className="ml-1 text-solar-dark-500">
                            ({isDark ? 'Dark' : 'Light'})
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-solar-blue-400/10 to-solar-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-solar-blue-500" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-solar-dark-50 dark:bg-solar-dark-900/10 rounded-lg">
                    <div>
                      <h3 className="font-medium text-solar-dark-800 dark:text-white capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">
                        {key === 'system' && 'System alerts and updates'}
                        {key === 'alerts' && 'Critical system alerts'}
                        {key === 'maintenance' && 'Maintenance reminders'}
                        {key === 'reports' && 'Daily and weekly reports'}
                        {key === 'email' && 'Email notifications'}
                        {key === 'push' && 'Push notifications'}
                      </p>
                    </div>
                    <Button
                      variant={value ? "default" : "outline"}
                      onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                      size="sm"
                      className="min-w-[80px]"
                    >
                      {value ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* System Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-solar-green-400/10 to-solar-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-solar-green-500" />
                  <span>System</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                {/* Auto Refresh */}
                <div className="flex items-center justify-between p-3 bg-solar-dark-50 dark:bg-solar-dark-900/10 rounded-lg">
                  <div>
                    <h3 className="font-medium text-solar-dark-800 dark:text-white">Auto Refresh</h3>
                    <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">
                      Automatically update data
                    </p>
                  </div>
                  <Button
                    variant={autoRefresh ? "default" : "outline"}
                    onClick={() => setAutoRefresh(!autoRefresh)}
                    size="sm"
                  >
                    {autoRefresh ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>

                {/* Refresh Interval */}
                {autoRefresh && (
                  <div className="p-3 bg-solar-dark-50 dark:bg-solar-dark-900/10 rounded-lg">
                    <label className="text-sm font-medium text-solar-dark-800 dark:text-white">
                      Refresh Interval: {refreshInterval} seconds
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="300"
                      step="10"
                      value={refreshInterval}
                      onChange={(e) => setRefreshInterval(Number(e.target.value))}
                      className="w-full mt-2"
                    />
                    <div className="flex justify-between text-xs text-solar-dark-500 mt-1">
                      <span>10s</span>
                      <span>300s</span>
                    </div>
                  </div>
                )}

                {/* Language */}
                <div className="p-3 bg-solar-dark-50 dark:bg-solar-dark-900/10 rounded-lg">
                  <label className="text-sm font-medium text-solar-dark-800 dark:text-white">
                    Language
                  </label>
                  <select
                    value={system.language}
                    onChange={(e) => setSystem(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full mt-2 px-3 py-2 border border-solar-dark-300 dark:border-solar-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 bg-white dark:bg-solar-dark-800 text-solar-dark-800 dark:text-white"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                {/* Timezone */}
                <div className="p-3 bg-solar-dark-50 dark:bg-solar-dark-900/10 rounded-lg">
                  <label className="text-sm font-medium text-solar-dark-800 dark:text-white">
                    Timezone
                  </label>
                  <select
                    value={system.timezone}
                    onChange={(e) => setSystem(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full mt-2 px-3 py-2 border border-solar-dark-300 dark:border-solar-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 bg-white dark:bg-solar-dark-800 text-solar-dark-800 dark:text-white"
                  >
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-solar-purple-400/10 to-solar-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-solar-purple-500" />
                  <span>Account</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                {/* Profile Information */}
                <div className="space-y-3">
                  <div className="p-3 bg-solar-dark-50 dark:bg-solar-dark-900/10 rounded-lg">
                    <label className="text-sm font-medium text-solar-dark-700 dark:text-solar-dark-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 border border-solar-dark-300 dark:border-solar-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 bg-white dark:bg-solar-dark-800 text-solar-dark-800 dark:text-white"
                    />
                  </div>
                  
                  <div className="p-3 bg-solar-dark-50 dark:bg-solar-dark-900/10 rounded-lg">
                    <label className="text-sm font-medium text-solar-dark-700 dark:text-solar-dark-300">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 border border-solar-dark-300 dark:border-solar-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 bg-white dark:bg-solar-dark-800 text-solar-dark-800 dark:text-white"
                    />
                  </div>

                  <div className="p-3 bg-solar-dark-50 dark:bg-solar-dark-900/10 rounded-lg">
                    <label className="text-sm font-medium text-solar-dark-700 dark:text-solar-dark-300">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 border border-solar-dark-300 dark:border-solar-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 bg-white dark:bg-solar-dark-800 text-solar-dark-800 dark:text-white"
                    />
                  </div>

                  <div className="p-3 bg-solar-dark-50 dark:bg-solar-dark-900/10 rounded-lg">
                    <label className="text-sm font-medium text-solar-dark-700 dark:text-solar-dark-300">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 border border-solar-dark-300 dark:border-solar-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 bg-white dark:bg-solar-dark-800 text-solar-dark-800 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Key className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Shield className="w-4 h-4 mr-2" />
                    2FA Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Advanced Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4"
        >
            <Card>
              <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-solar-amber-500" />
                  <span>Advanced Settings</span>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center space-x-2"
                >
                  {showAdvanced ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <span>{showAdvanced ? 'Hide' : 'Show'}</span>
                </Button>
                </CardTitle>
              </CardHeader>
            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="space-y-6">
                    {/* Security Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-medium text-solar-dark-800 dark:text-white flex items-center space-x-2">
                          <Lock className="w-4 h-4" />
                          <span>Security</span>
                        </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                            <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Two-Factor Authentication</span>
                            <Button
                              variant={security.twoFactor ? "default" : "outline"}
                              onClick={() => setSecurity(prev => ({ ...prev, twoFactor: !prev.twoFactor }))}
                              size="sm"
                            >
                              {security.twoFactor ? 'Enabled' : 'Disabled'}
                            </Button>
                  </div>
                  <div className="flex items-center justify-between">
                            <span className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Session Timeout (minutes)</span>
                            <select
                              value={security.sessionTimeout}
                              onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: Number(e.target.value) }))}
                              className="px-2 py-1 border border-solar-dark-300 dark:border-solar-dark-600 rounded text-sm bg-white dark:bg-solar-dark-800"
                            >
                              <option value={15}>15</option>
                              <option value={30}>30</option>
                              <option value={60}>60</option>
                              <option value={120}>120</option>
                            </select>
                  </div>
                    </div>
                  </div>

                      <div className="space-y-4">
                        <h3 className="font-medium text-solar-dark-800 dark:text-white flex items-center space-x-2">
                          <Database className="w-4 h-4" />
                          <span>Data Management</span>
                        </h3>
                        <div className="space-y-3">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Download className="w-4 h-4 mr-2" />
                            Export All Data
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Upload className="w-4 h-4 mr-2" />
                            Import Settings
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Clear Cache
                          </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
            </Card>
          </motion.div>

        {/* System Information */}
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-4"
        >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-solar-blue-500" />
                <span>System Information</span>
                </CardTitle>
              </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border border-solar-dark-200 dark:border-solar-dark-700 rounded-lg">
                  <h3 className="font-medium text-solar-dark-800 dark:text-white mb-2 flex items-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <span>System Status</span>
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-solar-dark-600 dark:text-solar-dark-300">Status:</span>
                      <span className="text-solar-green-600 font-medium">Operational</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-solar-dark-600 dark:text-solar-dark-300">Uptime:</span>
                      <span className="text-solar-dark-800 dark:text-white">99.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-solar-dark-600 dark:text-solar-dark-300">Last Restart:</span>
                      <span className="text-solar-dark-800 dark:text-white">7 days ago</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-solar-dark-200 dark:border-solar-dark-700 rounded-lg">
                  <h3 className="font-medium text-solar-dark-800 dark:text-white mb-2 flex items-center space-x-2">
                    <HardDrive className="w-4 h-4" />
                    <span>Storage</span>
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-solar-dark-600 dark:text-solar-dark-300">Used:</span>
                      <span className="text-solar-dark-800 dark:text-white">2.4 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-solar-dark-600 dark:text-solar-dark-300">Available:</span>
                      <span className="text-solar-dark-800 dark:text-white">47.6 GB</span>
                    </div>
                    <div className="w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-2">
                      <div className="bg-solar-blue-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-solar-dark-200 dark:border-solar-dark-700 rounded-lg">
                  <h3 className="font-medium text-solar-dark-800 dark:text-white mb-2 flex items-center space-x-2">
                    <Battery className="w-4 h-4" />
                    <span>Performance</span>
                  </h3>
                  <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                      <span className="text-solar-dark-600 dark:text-solar-dark-300">CPU Usage:</span>
                      <span className="text-solar-dark-800 dark:text-white">12%</span>
                </div>
                <div className="flex justify-between">
                      <span className="text-solar-dark-600 dark:text-solar-dark-300">Memory:</span>
                      <span className="text-solar-dark-800 dark:text-white">45%</span>
                </div>
                <div className="flex justify-between">
                      <span className="text-solar-dark-600 dark:text-solar-dark-300">Network:</span>
                      <span className="text-solar-dark-800 dark:text-white">2.1 MB/s</span>
                    </div>
                  </div>
                </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
  );
}
