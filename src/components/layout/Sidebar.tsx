'use client';

import { useState, useMemo, memo, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  Users, 
  Zap, 
  Sun, 
  Battery, 
  ChevronLeft,
  ChevronRight,
  LogOut,
  Search,
  Bell,
  User,
  Home,
  Activity,
  Shield,
  HelpCircle,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Enhanced menu structure with categories
const menuItems = [
  {
    category: 'Main',
    items: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        description: 'Overview & quick stats',
      },
    ]
  },
  {
    category: 'Monitoring',
    items: [
      {
        title: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
        description: 'Detailed reports & insights',
      },
      {
        title: 'Devices',
        href: '/devices',
        icon: Zap,
        description: 'Monitor & control devices',
      },
      {
        title: 'Solar Panels',
        href: '/solar-panels',
        icon: Sun,
        description: 'Panel monitoring',
      },
      {
        title: 'Battery',
        href: '/battery',
        icon: Battery,
        description: 'Storage management',
      },
    ]
  },
  {
    category: 'Management',
    items: [
      {
        title: 'Users',
        href: '/users',
        icon: Users,
        description: 'User management',
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
        description: 'System configuration',
      },
      {
        title: 'Help & Support',
        href: '/help-support',
        icon: HelpCircle,
        description: 'Get help and support',
      },
      {
        title: 'Documentation',
        href: '/documentation',
        icon: ExternalLink,
        description: 'System documentation',
      },
    ]
  }
];

const Sidebar = memo(function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Memoize filtered menu items to prevent unnecessary re-computations
  const filteredMenuItems = useMemo(() => 
    menuItems.map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.items.length > 0),
    [searchTerm]
  );

  // Memoize the logout handler to prevent unnecessary re-renders
  const handleLogout = useCallback(() => {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    router.push('/login');
  }, [router]);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="bg-solar-dark-800 text-white hover:bg-solar-dark-700 shadow-lg"
        >
          {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowMobileMenu(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ width: 280 }}
        animate={{ width: collapsed ? 80 : 280 }}
        className={cn(
          "h-screen bg-solar-dark-800 text-white border-r border-solar-dark-700 flex flex-col fixed lg:relative z-50",
          showMobileMenu ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-solar-dark-700">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: collapsed ? 0 : 1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-solar-gradient rounded-xl flex items-center justify-center shadow-lg">
                  <Sun className="w-6 h-6 text-solar-dark-800" />
                </div>
                <div>
                  <span className="font-bold text-lg">SolarFarm</span>
                  <p className="text-xs text-solar-dark-400">Energy Dashboard</p>
                </div>
              </motion.div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="text-white hover:bg-solar-dark-700 hidden lg:flex"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 border-b border-solar-dark-700"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-solar-dark-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-solar-dark-700 border border-solar-dark-600 rounded-lg text-white placeholder-solar-dark-400 focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 focus:border-transparent"
              />
            </div>
          </motion.div>
        )}

        {/* User Profile */}
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 border-b border-solar-dark-700"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-solar-gradient flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                  alt="Admin User"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <User className="w-5 h-5 text-solar-dark-800 hidden" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-solar-dark-400 truncate">admin@solarfarm.com</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-solar-dark-400 hover:text-white hover:bg-solar-dark-700"
              >
                <Bell className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {filteredMenuItems.map((category, categoryIndex) => (
            <div key={category.category}>
              {!collapsed && (
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="text-xs font-semibold text-solar-dark-400 uppercase tracking-wider mb-3 px-3"
                >
                  {category.category}
                </motion.h3>
              )}
              <div className="space-y-1">
                {category.items.map((item, itemIndex) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 cursor-pointer group relative",
                          isActive
                            ? "bg-solar-yellow-400 text-solar-dark-800 shadow-lg"
                            : "text-solar-dark-300 hover:bg-solar-dark-700 hover:text-white"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMobileMenu(false);
                        }}
                      >
                        <div className={cn(
                          "p-1.5 rounded-lg transition-colors",
                          isActive
                            ? "bg-solar-dark-800/20"
                            : "group-hover:bg-solar-dark-600/50"
                        )}>
                          <item.icon className="w-4 h-4 flex-shrink-0" />
                        </div>
                        {!collapsed && (
                          <div className="flex-1 min-w-0">
                            <motion.span
                              initial={{ opacity: 1 }}
                              animate={{ opacity: collapsed ? 0 : 1 }}
                              className="font-medium block"
                            >
                              {item.title}
                            </motion.span>
                            <motion.p
                              initial={{ opacity: 1 }}
                              animate={{ opacity: collapsed ? 0 : 1 }}
                              className="text-xs text-solar-dark-400 group-hover:text-solar-dark-300 truncate"
                            >
                              {item.description}
                            </motion.p>
                          </div>
                        )}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute right-2 w-2 h-2 bg-solar-dark-800 rounded-full"
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-solar-dark-700">
          {/* Logout Button */}
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
          >
            <LogOut className="w-4 h-4 mr-3" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </motion.div>
    </>
  );
});

export default Sidebar;
