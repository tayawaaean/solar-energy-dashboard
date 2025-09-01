'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, FileText, Code, Database, Settings, Zap,
  Search, ChevronDown, ChevronRight, ExternalLink, Download,
  Play, Users, Shield, Lock, BarChart3, Activity, 
  Monitor, Smartphone, Tablet, Globe, Wifi, Battery,
  Sun, Moon, Bell, AlertTriangle, CheckCircle, Clock,
  Star, ArrowRight, Book, Video, Headphones, Smartphone as PhoneIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Documentation Categories
  const docCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      color: 'text-solar-blue-500',
      bgColor: 'bg-solar-blue-50 dark:bg-solar-blue-900/10',
      articles: [
        {
          id: 'installation',
          title: 'System Installation Guide',
          description: 'Complete step-by-step installation instructions',
          difficulty: 'Beginner',
          timeToRead: '15 min',
          tags: ['installation', 'setup', 'hardware']
        },
        {
          id: 'first-login',
          title: 'First Login & Setup',
          description: 'How to access your dashboard for the first time',
          difficulty: 'Beginner',
          timeToRead: '5 min',
          tags: ['login', 'setup', 'account']
        },
        {
          id: 'dashboard-overview',
          title: 'Dashboard Overview',
          description: 'Understanding your main dashboard interface',
          difficulty: 'Beginner',
          timeToRead: '10 min',
          tags: ['dashboard', 'interface', 'overview']
        }
      ]
    },
    {
      id: 'user-guide',
      title: 'User Guide',
      icon: Users,
      color: 'text-solar-green-500',
      bgColor: 'bg-solar-green-50 dark:bg-solar-green-900/10',
      articles: [
        {
          id: 'monitoring',
          title: 'System Monitoring',
          description: 'How to monitor your solar energy production',
          difficulty: 'Intermediate',
          timeToRead: '12 min',
          tags: ['monitoring', 'production', 'real-time']
        },
        {
          id: 'analytics',
          title: 'Analytics & Reports',
          description: 'Understanding your energy analytics and reports',
          difficulty: 'Intermediate',
          timeToRead: '20 min',
          tags: ['analytics', 'reports', 'data']
        },
        {
          id: 'alerts',
          title: 'Alerts & Notifications',
          description: 'Configuring and managing system alerts',
          difficulty: 'Intermediate',
          timeToRead: '8 min',
          tags: ['alerts', 'notifications', 'settings']
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Documentation',
      icon: Code,
      color: 'text-solar-yellow-500',
      bgColor: 'bg-solar-yellow-50 dark:bg-solar-yellow-900/10',
      articles: [
        {
          id: 'api-reference',
          title: 'API Reference',
          description: 'Complete API documentation for developers',
          difficulty: 'Advanced',
          timeToRead: '45 min',
          tags: ['api', 'developers', 'integration']
        },
        {
          id: 'system-architecture',
          title: 'System Architecture',
          description: 'Technical architecture and system design',
          difficulty: 'Advanced',
          timeToRead: '30 min',
          tags: ['architecture', 'design', 'technical']
        },
        {
          id: 'troubleshooting',
          title: 'Troubleshooting Guide',
          description: 'Common issues and their solutions',
          difficulty: 'Intermediate',
          timeToRead: '25 min',
          tags: ['troubleshooting', 'issues', 'solutions']
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: Shield,
      color: 'text-solar-purple-500',
      bgColor: 'bg-solar-purple-50 dark:bg-solar-purple-900/10',
      articles: [
        {
          id: 'security-overview',
          title: 'Security Overview',
          description: 'Security measures and best practices',
          difficulty: 'Intermediate',
          timeToRead: '15 min',
          tags: ['security', 'privacy', 'best-practices']
        },
        {
          id: 'user-permissions',
          title: 'User Permissions & Roles',
          description: 'Managing user access and permissions',
          difficulty: 'Intermediate',
          timeToRead: '12 min',
          tags: ['permissions', 'roles', 'access-control']
        }
      ]
    }
  ];

  // Quick Start Guides
  const quickStartGuides = [
    {
      title: '5-Minute Setup',
      description: 'Get your system running in 5 minutes',
      icon: Zap,
      color: 'text-solar-yellow-500',
      time: '5 min',
      difficulty: 'Beginner'
    },
    {
      title: 'Dashboard Tour',
      description: 'Quick tour of your dashboard features',
      icon: Monitor,
      color: 'text-solar-blue-500',
      time: '8 min',
      difficulty: 'Beginner'
    },
    {
      title: 'First Alert Setup',
      description: 'Set up your first system alert',
      icon: Bell,
      color: 'text-solar-green-500',
      time: '3 min',
      difficulty: 'Beginner'
    }
  ];

  // Video Tutorials
  const videoTutorials = [
    {
      title: 'System Installation',
      description: 'Complete installation walkthrough',
      duration: '15:30',
      thumbnail: '📹',
      category: 'Installation'
    },
    {
      title: 'Dashboard Navigation',
      description: 'How to navigate your dashboard',
      duration: '8:45',
      thumbnail: '📹',
      category: 'User Guide'
    },
    {
      title: 'Analytics Deep Dive',
      description: 'Understanding your energy analytics',
      duration: '22:15',
      thumbnail: '📹',
      category: 'Analytics'
    },
    {
      title: 'Mobile App Setup',
      description: 'Setting up the mobile application',
      duration: '12:20',
      thumbnail: '📹',
      category: 'Mobile'
    }
  ];

  // Filter articles based on search
  const filteredCategories = docCategories.map(category => ({
    ...category,
    articles: category.articles.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(category => 
    selectedCategory === 'all' || category.id === selectedCategory
  );

  return (
    <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-solar-dark-800 dark:text-white">
            Documentation
          </h1>
          <p className="text-solar-dark-600 dark:text-solar-dark-300 mt-2">
            Comprehensive guides, tutorials, and technical documentation for your solar energy system
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-solar-dark-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search documentation, guides, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-solar-dark-300 dark:border-solar-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 bg-white dark:bg-solar-dark-800 text-solar-dark-800 dark:text-white"
            />
          </div>
        </motion.div>

        {/* Quick Start Guides */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-solar-yellow-500" />
                <span>Quick Start Guides</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickStartGuides.map((guide, index) => (
                  <div
                    key={guide.title}
                    className="p-4 border border-solar-dark-200 dark:border-solar-dark-700 rounded-lg hover:shadow-md transition-all hover:scale-105 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <guide.icon className={`w-6 h-6 ${guide.color}`} />
                      <div className="flex-1">
                        <h3 className="font-medium text-solar-dark-800 dark:text-white">
                          {guide.title}
                        </h3>
                        <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">
                          {guide.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-solar-dark-500 bg-solar-dark-100 dark:bg-solar-dark-800 px-2 py-1 rounded">
                        {guide.time}
                      </span>
                      <span className="text-xs text-solar-dark-500">
                        {guide.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Documentation Categories */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-solar-blue-500" />
                <span>Documentation Library</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  All Categories
                </Button>
                {docCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center space-x-2"
                  >
                    <category.icon className="w-4 h-4" />
                    <span>{category.title}</span>
                  </Button>
                ))}
              </div>

              {/* Documentation Sections */}
              <div className="space-y-4">
                {filteredCategories.map((category) => (
                  <div key={category.id} className="border border-solar-dark-200 dark:border-solar-dark-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedSection(expandedSection === category.id ? null : category.id)}
                      className={`w-full p-4 text-left transition-colors ${category.bgColor} hover:opacity-80`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <category.icon className={`w-6 h-6 ${category.color}`} />
                          <div>
                            <h3 className="font-medium text-solar-dark-800 dark:text-white">
                              {category.title}
                            </h3>
                            <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">
                              {category.articles.length} articles available
                            </p>
                          </div>
                        </div>
                        {expandedSection === category.id ? (
                          <ChevronDown className="w-5 h-5 text-solar-dark-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-solar-dark-400" />
                        )}
                      </div>
                    </button>
                    <AnimatePresence>
                      {expandedSection === category.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 bg-white dark:bg-solar-dark-800"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {category.articles.map((article) => (
                              <div
                                key={article.id}
                                className="p-4 border border-solar-dark-200 dark:border-solar-dark-700 rounded-lg hover:shadow-md transition-all cursor-pointer"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-medium text-solar-dark-800 dark:text-white">
                                    {article.title}
                                  </h4>
                                  <ArrowRight className="w-4 h-4 text-solar-dark-400" />
                                </div>
                                <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300 mb-3">
                                  {article.description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-solar-dark-500 bg-solar-dark-100 dark:bg-solar-dark-800 px-2 py-1 rounded">
                                      {article.timeToRead}
                                    </span>
                                    <span className="text-xs text-solar-dark-500">
                                      {article.difficulty}
                                    </span>
                                  </div>
                                  <div className="flex space-x-1">
                                    {article.tags.slice(0, 2).map((tag) => (
                                      <span
                                        key={tag}
                                        className="text-xs bg-solar-dark-100 dark:bg-solar-dark-800 text-solar-dark-600 dark:text-solar-dark-300 px-2 py-1 rounded"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Video Tutorials */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Video className="w-5 h-5 text-solar-green-500" />
                <span>Video Tutorials</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {videoTutorials.map((video, index) => (
                  <div
                    key={video.title}
                    className="p-4 border border-solar-dark-200 dark:border-solar-dark-700 rounded-lg hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="text-4xl mb-3">{video.thumbnail}</div>
                    <h3 className="font-medium text-solar-dark-800 dark:text-white mb-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300 mb-3">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-solar-dark-500 bg-solar-dark-100 dark:bg-solar-dark-800 px-2 py-1 rounded">
                        {video.duration}
                      </span>
                      <span className="text-xs text-solar-dark-500">
                        {video.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-solar-purple-500" />
                <span>Additional Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-solar-dark-200 dark:border-solar-dark-700 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <Download className="w-6 h-6 text-solar-blue-500" />
                    <h3 className="font-medium text-solar-dark-800 dark:text-white">Complete Manual</h3>
                  </div>
                  <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300 mb-3">
                    Download the complete system manual in PDF format
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>

                <div className="p-4 border border-solar-dark-200 dark:border-solar-dark-700 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <PhoneIcon className="w-6 h-6 text-solar-green-500" />
                    <h3 className="font-medium text-solar-dark-800 dark:text-white">Mobile App Guide</h3>
                  </div>
                  <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300 mb-3">
                    Learn how to use the mobile application
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Guide
                  </Button>
                </div>

                <div className="p-4 border border-solar-dark-200 dark:border-solar-dark-700 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <Headphones className="w-6 h-6 text-solar-purple-500" />
                    <h3 className="font-medium text-solar-dark-800 dark:text-white">Audio Guides</h3>
                  </div>
                  <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300 mb-3">
                    Listen to audio versions of our guides
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Listen Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Documentation Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-solar-amber-500" />
                <span>Documentation Statistics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-solar-blue-50 dark:bg-solar-blue-900/10 rounded-lg">
                  <div className="text-2xl font-bold text-solar-blue-600 dark:text-solar-blue-400">
                    {docCategories.reduce((total, cat) => total + cat.articles.length, 0)}
                  </div>
                  <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Total Articles</p>
                </div>
                <div className="text-center p-4 bg-solar-green-50 dark:bg-solar-green-900/10 rounded-lg">
                  <div className="text-2xl font-bold text-solar-green-600 dark:text-solar-green-400">
                    {videoTutorials.length}
                  </div>
                  <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Video Tutorials</p>
                </div>
                <div className="text-center p-4 bg-solar-yellow-50 dark:bg-solar-yellow-900/10 rounded-lg">
                  <div className="text-2xl font-bold text-solar-yellow-600 dark:text-solar-yellow-400">
                    {docCategories.length}
                  </div>
                  <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Categories</p>
                </div>
                <div className="text-center p-4 bg-solar-purple-50 dark:bg-solar-purple-900/10 rounded-lg">
                  <div className="text-2xl font-bold text-solar-purple-600 dark:text-solar-purple-400">
                    98%
                  </div>
                  <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Satisfaction Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
  );
}
