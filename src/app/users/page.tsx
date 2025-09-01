'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, UserPlus, Shield, Mail, Phone, MapPin, Search, Filter, 
  MoreHorizontal, Edit, Trash2, Eye, Lock, Unlock, Download, Upload,
  ChevronUp, ChevronDown, CheckCircle, XCircle, AlertCircle, Clock,
  Calendar, Settings, RefreshCw, Plus, ArrowUpDown, Filter as FilterIcon, Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockUser, mockNotifications } from '@/lib/mockData';
import { formatDateTime, formatDate } from '@/lib/utils';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const usersPerPage = 10;

  // Enhanced mock users data
  const mockUsers = [
    {
      id: '1',
      name: 'John Solar',
      email: 'john@solarfarm.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'active',
      phone: '+1 (555) 123-4567',
      location: 'Solar Farm, CA',
      department: 'Management',
      joinDate: new Date('2023-01-15'),
      permissions: ['dashboard', 'analytics', 'devices', 'users', 'settings'],
      loginCount: 156,
      lastActivity: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: '2',
      name: 'Sarah Technician',
      email: 'sarah.tech@solarfarm.com',
      role: 'technician',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: 'active',
      phone: '+1 (555) 234-5678',
      location: 'Maintenance Hub',
      department: 'Maintenance',
      joinDate: new Date('2023-03-20'),
      permissions: ['dashboard', 'devices', 'battery'],
      loginCount: 89,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '3',
      name: 'Mike Operator',
      email: 'mike.op@solarfarm.com',
      role: 'operator',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000),
      status: 'active',
      phone: '+1 (555) 345-6789',
      location: 'Control Room',
      department: 'Operations',
      joinDate: new Date('2023-02-10'),
      permissions: ['dashboard', 'analytics', 'devices'],
      loginCount: 234,
      lastActivity: new Date(Date.now() - 45 * 60 * 1000),
    },
    {
      id: '4',
      name: 'Lisa Analyst',
      email: 'lisa.analyst@solarfarm.com',
      role: 'analyst',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastLogin: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: 'inactive',
      phone: '+1 (555) 456-7890',
      location: 'Data Center',
      department: 'Analytics',
      joinDate: new Date('2023-04-05'),
      permissions: ['dashboard', 'analytics'],
      loginCount: 67,
      lastActivity: new Date(Date.now() - 8 * 60 * 60 * 1000),
    },
    {
      id: '5',
      name: 'David Engineer',
      email: 'david.eng@solarfarm.com',
      role: 'technician',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      lastLogin: new Date(Date.now() - 12 * 60 * 60 * 1000),
      status: 'active',
      phone: '+1 (555) 567-8901',
      location: 'Engineering Lab',
      department: 'Engineering',
      joinDate: new Date('2023-05-12'),
      permissions: ['dashboard', 'devices', 'solar-panels'],
      loginCount: 123,
      lastActivity: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
      id: '6',
      name: 'Emma Manager',
      email: 'emma.manager@solarfarm.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      lastLogin: new Date(Date.now() - 30 * 60 * 1000),
      status: 'active',
      phone: '+1 (555) 678-9012',
      location: 'Headquarters',
      department: 'Management',
      joinDate: new Date('2022-11-08'),
      permissions: ['dashboard', 'analytics', 'devices', 'users', 'settings'],
      loginCount: 298,
      lastActivity: new Date(Date.now() - 15 * 60 * 1000),
    },
    {
      id: '7',
      name: 'Alex Monitor',
      email: 'alex.monitor@solarfarm.com',
      role: 'operator',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      lastLogin: new Date(Date.now() - 3 * 60 * 60 * 1000),
      status: 'active',
      phone: '+1 (555) 789-0123',
      location: 'Monitoring Station',
      department: 'Operations',
      joinDate: new Date('2023-06-18'),
      permissions: ['dashboard', 'analytics'],
      loginCount: 78,
      lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
    {
      id: '8',
      name: 'Rachel Support',
      email: 'rachel.support@solarfarm.com',
      role: 'analyst',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'inactive',
      phone: '+1 (555) 890-1234',
      location: 'Support Center',
      department: 'Support',
      joinDate: new Date('2023-07-22'),
      permissions: ['dashboard'],
      loginCount: 45,
      lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ];

  // Filter and sort users
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue = a[sortField as keyof typeof a];
    let bValue = b[sortField as keyof typeof b];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = sortedUsers.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter]);

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for users:`, selectedUsers);
    setSelectedUsers([]);
  };

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'technician':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'operator':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'analyst':
        return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
      default:
        return 'text-solar-dark-600 bg-solar-dark-50 dark:bg-solar-dark-900/20 border-solar-dark-200 dark:border-solar-dark-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'text-solar-green-600 bg-solar-green-50 dark:bg-solar-green-900/20 border-solar-green-200 dark:border-solar-green-800'
      : 'text-solar-dark-400 bg-solar-dark-50 dark:bg-solar-dark-900/20 border-solar-dark-200 dark:border-solar-dark-800';
  };

  const getStatusIcon = (status: string) => {
    return status === 'active' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />;
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
              User Management
            </h1>
            <p className="text-solar-dark-600 dark:text-solar-dark-300 mt-2">
              Manage system users, roles, and permissions
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Add User</span>
            </Button>
          </div>
        </motion.div>

        {/* Enhanced Stats Overview */}
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
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-solar-blue-600 dark:text-solar-blue-400">
                    {mockUsers.length}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Users className="w-3 h-3 text-solar-blue-500" />
                    <p className="text-xs text-solar-dark-600">All departments</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-blue-100 dark:bg-solar-blue-900/20">
                  <Users className="w-6 h-6 text-solar-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-solar-green-400/10 to-solar-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-solar-dark-600 dark:text-solar-dark-300">
                    Active Users
                  </p>
                  <p className="text-2xl font-bold text-solar-green-600 dark:text-solar-green-400">
                    {mockUsers.filter(u => u.status === 'active').length}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <CheckCircle className="w-3 h-3 text-solar-green-500" />
                    <p className="text-xs text-solar-dark-600">Currently online</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-green-100 dark:bg-solar-green-900/20">
                  <Shield className="w-6 h-6 text-solar-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-solar-dark-600 dark:text-solar-dark-300">
                    Admins
                  </p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {mockUsers.filter(u => u.role === 'admin').length}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Shield className="w-3 h-3 text-red-500" />
                    <p className="text-xs text-solar-dark-600">Full access</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20">
                  <Shield className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-solar-amber-400/10 to-solar-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-solar-dark-600 dark:text-solar-dark-300">
                    New This Month
                  </p>
                  <p className="text-2xl font-bold text-solar-amber-600 dark:text-solar-amber-400">
                    {mockUsers.filter(u => u.joinDate > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Calendar className="w-3 h-3 text-solar-amber-500" />
                    <p className="text-xs text-solar-dark-600">Recent hires</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-solar-amber-100 dark:bg-solar-amber-900/20">
                  <UserPlus className="w-6 h-6 text-solar-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-solar-dark-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-solar-dark-300 dark:border-solar-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 bg-white dark:bg-solar-dark-800 text-solar-dark-800 dark:text-white"
              />
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-3 border border-solar-dark-300 dark:border-solar-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 bg-white dark:bg-solar-dark-800 text-solar-dark-800 dark:text-white"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="technician">Technician</option>
                <option value="operator">Operator</option>
                <option value="analyst">Analyst</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-solar-dark-300 dark:border-solar-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 bg-white dark:bg-solar-dark-800 text-solar-dark-800 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <FilterIcon className="w-4 h-4" />
                <span>Filters</span>
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-solar-blue-50 dark:bg-solar-blue-900/10 rounded-lg border border-solar-blue-200 dark:border-solar-blue-800"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-solar-blue-500" />
                <span className="text-solar-dark-800 dark:text-white font-medium">
                  {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('activate')}
                  className="flex items-center space-x-1"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Activate</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('deactivate')}
                  className="flex items-center space-x-1"
                >
                  <Lock className="w-4 h-4" />
                  <span>Deactivate</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('delete')}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-solar-blue-500" />
                  <span>Users ({filteredUsers.length})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <Upload className="w-4 h-4" />
                    <span>Import</span>
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-solar-dark-50 dark:bg-solar-dark-900/10 border-b border-solar-dark-200 dark:border-solar-dark-700">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers(currentUsers.map(u => u.id));
                              } else {
                                setSelectedUsers([]);
                              }
                            }}
                            className="rounded border-solar-dark-300 dark:border-solar-dark-600"
                          />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <button
                          onClick={() => handleSort('name')}
                          className="flex items-center space-x-1 hover:text-solar-blue-500 transition-colors"
                        >
                          <span className="font-medium">User</span>
                          {sortField === 'name' ? (
                            sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ArrowUpDown className="w-4 h-4" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <button
                          onClick={() => handleSort('role')}
                          className="flex items-center space-x-1 hover:text-solar-blue-500 transition-colors"
                        >
                          <span className="font-medium">Role</span>
                          {sortField === 'role' ? (
                            sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ArrowUpDown className="w-4 h-4" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <button
                          onClick={() => handleSort('department')}
                          className="flex items-center space-x-1 hover:text-solar-blue-500 transition-colors"
                        >
                          <span className="font-medium">Department</span>
                          {sortField === 'department' ? (
                            sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ArrowUpDown className="w-4 h-4" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <button
                          onClick={() => handleSort('status')}
                          className="flex items-center space-x-1 hover:text-solar-blue-500 transition-colors"
                        >
                          <span className="font-medium">Status</span>
                          {sortField === 'status' ? (
                            sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ArrowUpDown className="w-4 h-4" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <button
                          onClick={() => handleSort('lastLogin')}
                          className="flex items-center space-x-1 hover:text-solar-blue-500 transition-colors"
                        >
                          <span className="font-medium">Last Login</span>
                          {sortField === 'lastLogin' ? (
                            sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ArrowUpDown className="w-4 h-4" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <span className="font-medium">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-solar-dark-200 dark:divide-solar-dark-700">
                    <AnimatePresence>
                      {currentUsers.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="hover:bg-solar-dark-50 dark:hover:bg-solar-dark-900/10 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedUsers([...selectedUsers, user.id]);
                                } else {
                                  setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                                }
                              }}
                              className="rounded border-solar-dark-300 dark:border-solar-dark-600"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-solar-gradient flex items-center justify-center">
                                {user.avatar ? (
                                  <img 
                                    src={user.avatar} 
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                      target.nextElementSibling?.classList.remove('hidden');
                                    }}
                                  />
                                ) : null}
                                <span className="text-sm font-semibold text-solar-dark-800 hidden">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-solar-dark-800 dark:text-white">
                                  {user.name}
                                </div>
                                <div className="text-sm text-solar-dark-600 dark:text-solar-dark-300">
                                  {user.email}
                                </div>
                                <div className="text-xs text-solar-dark-500 flex items-center space-x-1">
                                  <Phone className="w-3 h-3" />
                                  <span>{user.phone}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-solar-dark-800 dark:text-white font-medium">
                              {user.department}
                            </div>
                            <div className="text-sm text-solar-dark-600 dark:text-solar-dark-300">
                              {user.location}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                                {getStatusIcon(user.status)}
                                <span className="ml-1">{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
                              </span>
                            </div>
                            <div className="text-xs text-solar-dark-500 mt-1">
                              {user.loginCount} logins
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-solar-dark-800 dark:text-white">
                              {formatDateTime(user.lastLogin)}
                            </div>
                            <div className="text-xs text-solar-dark-500">
                              {user.lastActivity && `Last activity: ${formatDateTime(user.lastActivity)}`}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-solar-blue-600 hover:text-solar-blue-700 hover:bg-solar-blue-50 dark:hover:bg-solar-blue-900/20"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-solar-green-600 hover:text-solar-green-700 hover:bg-solar-green-50 dark:hover:bg-solar-green-900/20"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-solar-amber-600 hover:text-solar-amber-700 hover:bg-solar-amber-50 dark:hover:bg-solar-amber-900/20"
                              >
                                <Settings className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-solar-dark-200 dark:border-solar-dark-700">
                  <div className="text-sm text-solar-dark-600 dark:text-solar-dark-300">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center space-x-1"
                    >
                      <ChevronUp className="w-4 h-4 rotate-90" />
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
                      <ChevronDown className="w-4 h-4 rotate-90" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-solar-blue-500" />
                <span>Recent User Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockNotifications.slice(0, 5).map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-solar-dark-50 dark:bg-solar-dark-900/10 rounded-lg hover:bg-solar-dark-100 dark:hover:bg-solar-dark-900/20 transition-colors"
                  >
                    <div className="w-2 h-2 bg-solar-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-solar-dark-800 dark:text-white">
                        {notification.title}
                      </p>
                      <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">
                        {notification.message}
                      </p>
                      <p className="text-xs text-solar-dark-500 dark:text-solar-dark-400 mt-1">
                        {formatDateTime(notification.timestamp)}
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
