'use client';

import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Bell, 
  Search, 
  Moon, 
  Sun, 
  User,
  Settings,
  LogOut,
  ChevronDown,
  Home,
  BarChart3,
  Zap,
  Sun as SunIcon,
  Battery,
  Users,
  Cog,
  Plus,
  Filter,
  RefreshCw,
  HelpCircle,
  ExternalLink,
  Mail,
  Phone,
  Shield,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockUser, mockNotifications } from '@/lib/mockData';
import { formatDateTime } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

const Header = memo(function Header() {
  const { theme, setTheme, isDark } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Memoize unread notifications count
  const unreadNotifications = useMemo(() => 
    mockNotifications.filter(n => !n.read).length, 
    []
  );

  // Memoize page info to prevent unnecessary recalculations
  const { pageTitle, breadcrumbs } = useMemo(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const pageTitle = pathSegments[pathSegments.length - 1] || 'Dashboard';
    
    const breadcrumbs = pathSegments.map((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/');
      const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
      return { title, href };
    });

    return { pageTitle, breadcrumbs };
  }, [pathname]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    router.push('/login');
  }, [router]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showNotifications || showProfile) {
        setShowNotifications(false);
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications, showProfile]);

  return (
    <header className="bg-white dark:bg-solar-dark-800 border-b border-solar-dark-200 dark:border-solar-dark-700 px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Breadcrumbs and Page Title */}
        <div className="flex items-center space-x-4">
          {/* Breadcrumbs */}
          <nav className="hidden md:flex items-center space-x-2 text-sm">
            <Home className="w-4 h-4 text-solar-dark-400" />
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center space-x-2">
                <ChevronDown className="w-3 h-3 text-solar-dark-400 rotate-[-90deg]" />
                <span className="text-solar-dark-600 dark:text-solar-dark-300 capitalize">
                  {crumb.title}
                </span>
              </div>
            ))}
          </nav>

          {/* Page Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-solar-gradient rounded-lg flex items-center justify-center">
              {pageTitle === 'Dashboard' && <Home className="w-4 h-4 text-solar-dark-800" />}
              {pageTitle === 'Analytics' && <BarChart3 className="w-4 h-4 text-solar-dark-800" />}
              {pageTitle === 'Devices' && <Zap className="w-4 h-4 text-solar-dark-800" />}
              {pageTitle === 'Solar Panels' && <SunIcon className="w-4 h-4 text-solar-dark-800" />}
              {pageTitle === 'Battery' && <Battery className="w-4 h-4 text-solar-dark-800" />}
              {pageTitle === 'Users' && <Users className="w-4 h-4 text-solar-dark-800" />}
              {pageTitle === 'Settings' && <Cog className="w-4 h-4 text-solar-dark-800" />}
            </div>
            <div>
              <h1 className="text-xl font-bold text-solar-dark-800 dark:text-white capitalize">
                {pageTitle}
              </h1>
              <p className="text-xs text-solar-dark-500 dark:text-solar-dark-400">
                {breadcrumbs.length > 1 ? `${breadcrumbs.length} levels deep` : 'Main section'}
              </p>
            </div>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-solar-dark-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search across the system..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-solar-dark-50 dark:bg-solar-dark-700 border border-solar-dark-200 dark:border-solar-dark-600 rounded-lg text-solar-dark-800 dark:text-white placeholder-solar-dark-400 focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 focus:border-transparent transition-all duration-200"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 text-solar-dark-400 hover:text-solar-dark-600"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2">
          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-solar-dark-600 dark:text-solar-dark-300 hover:bg-solar-dark-100 dark:hover:bg-solar-dark-700"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-solar-dark-600 dark:text-solar-dark-300 hover:bg-solar-dark-100 dark:hover:bg-solar-dark-700"
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-solar-dark-600 dark:text-solar-dark-300 hover:bg-solar-dark-100 dark:hover:bg-solar-dark-700"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="text-solar-dark-600 dark:text-solar-dark-300 hover:bg-solar-dark-100 dark:hover:bg-solar-dark-700"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-solar-dark-600 dark:text-solar-dark-300 hover:bg-solar-dark-100 dark:hover:bg-solar-dark-700 relative"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                >
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </motion.span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-96 bg-white dark:bg-solar-dark-800 border border-solar-dark-200 dark:border-solar-dark-700 rounded-xl shadow-xl z-50"
                >
                  <div className="p-4 border-b border-solar-dark-200 dark:border-solar-dark-700">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-solar-dark-800 dark:text-white">Notifications</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-solar-dark-400 hover:text-solar-dark-600"
                      >
                        Mark all read
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {mockNotifications.length > 0 ? (
                      mockNotifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-4 border-b border-solar-dark-100 dark:border-solar-dark-700 hover:bg-solar-dark-50 dark:hover:bg-solar-dark-700/50 transition-colors ${
                            !notification.read ? 'bg-solar-yellow-50 dark:bg-solar-yellow-900/10' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              notification.type === 'success' ? 'bg-solar-green-500' :
                              notification.type === 'warning' ? 'bg-solar-amber-500' :
                              notification.type === 'error' ? 'bg-red-500' : 'bg-solar-blue-500'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <h4 className="font-medium text-solar-dark-800 dark:text-white text-sm">
                                  {notification.title}
                                </h4>
                                <span className="text-xs text-solar-dark-400 ml-2">
                                  {formatDateTime(notification.timestamp)}
                                </span>
                              </div>
                              <p className="text-solar-dark-600 dark:text-solar-dark-300 text-xs mt-1">
                                {notification.message}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <Bell className="w-8 h-8 text-solar-dark-400 mx-auto mb-2" />
                        <p className="text-solar-dark-500 dark:text-solar-dark-400 text-sm">No notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-solar-dark-200 dark:border-solar-dark-700">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-solar-dark-600 dark:text-solar-dark-300 hover:bg-solar-dark-100 dark:hover:bg-solar-dark-700"
                    >
                      View all notifications
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 text-solar-dark-800 dark:text-white hover:bg-solar-dark-100 dark:hover:bg-solar-dark-700"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-solar-gradient flex items-center justify-center">
                {mockUser.avatar ? (
                  <img 
                    src={mockUser.avatar} 
                    alt={mockUser.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <User className="w-4 h-4 text-solar-dark-800 hidden" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{mockUser.name}</p>
                <p className="text-xs text-solar-dark-500 dark:text-solar-dark-400">Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-solar-dark-400" />
            </Button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-solar-dark-800 border border-solar-dark-200 dark:border-solar-dark-700 rounded-xl shadow-xl z-50"
                >
                  <div className="p-4 border-b border-solar-dark-200 dark:border-solar-dark-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-solar-gradient flex items-center justify-center">
                        {mockUser.avatar ? (
                          <img 
                            src={mockUser.avatar} 
                            alt={mockUser.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <User className="w-6 h-6 text-solar-dark-800 hidden" />
                      </div>
                      <div>
                        <p className="font-semibold text-solar-dark-800 dark:text-white">{mockUser.name}</p>
                        <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">{mockUser.email}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Shield className="w-3 h-3 text-solar-green-500" />
                          <span className="text-xs text-solar-green-600 dark:text-solar-green-400">Administrator</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-solar-dark-600 dark:text-solar-dark-300 hover:bg-solar-dark-100 dark:hover:bg-solar-dark-700"
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-solar-dark-600 dark:text-solar-dark-300 hover:bg-solar-dark-100 dark:hover:bg-solar-dark-700"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-solar-dark-600 dark:text-solar-dark-300 hover:bg-solar-dark-100 dark:hover:bg-solar-dark-700"
                    >
                      <HelpCircle className="w-4 h-4 mr-3" />
                      Help & Support
                    </Button>
                    <div className="border-t border-solar-dark-200 dark:border-solar-dark-700 my-1" />
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
