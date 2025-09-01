'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, MessageCircle, Phone, Mail, Search, 
  BookOpen, Video, FileText, Users, Settings, Zap,
  AlertCircle, CheckCircle, Clock, Star, ChevronDown, ChevronRight,
  ExternalLink, Download, Play, Headphones, Smartphone, Monitor,
  Globe, Shield, Lock, Database, BarChart3, Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // FAQ Data
  const faqs = [
    {
      id: 1,
      category: 'general',
      question: 'How do I reset my password?',
      answer: 'To reset your password, go to Settings > Account and click "Change Password". You can also contact support if you need assistance.',
      tags: ['password', 'account', 'security']
    },
    {
      id: 2,
      category: 'system',
      question: 'Why is my solar panel showing offline?',
      answer: 'Check the physical connections, ensure the inverter is powered on, and verify network connectivity. If issues persist, contact technical support.',
      tags: ['offline', 'connection', 'inverter']
    },
    {
      id: 3,
      category: 'data',
      question: 'How do I export my energy data?',
      answer: 'Navigate to Analytics > Reports and use the export function. You can download data in CSV, JSON, or PDF formats.',
      tags: ['export', 'data', 'reports']
    },
    {
      id: 4,
      category: 'notifications',
      question: 'How do I configure email notifications?',
      answer: 'Go to Settings > Notifications and enable email notifications. You can customize which alerts you want to receive.',
      tags: ['email', 'notifications', 'alerts']
    },
    {
      id: 5,
      category: 'system',
      question: 'What does the battery status indicator mean?',
      answer: 'Green: Fully charged, Yellow: Partially charged, Red: Low battery, Gray: Offline or error state.',
      tags: ['battery', 'status', 'indicators']
    },
    {
      id: 6,
      category: 'general',
      question: 'How do I add a new user to the system?',
      answer: 'Go to Users page and click "Add User". Fill in the required information and assign appropriate permissions.',
      tags: ['users', 'permissions', 'administration']
    }
  ];

  // Support Categories
  const supportCategories = [
    {
      id: 'general',
      title: 'General',
      icon: HelpCircle,
      color: 'text-solar-blue-500',
      count: 2
    },
    {
      id: 'system',
      title: 'System Issues',
      icon: Settings,
      color: 'text-solar-green-500',
      count: 2
    },
    {
      id: 'data',
      title: 'Data & Reports',
      icon: BarChart3,
      color: 'text-solar-yellow-500',
      count: 1
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: MessageCircle,
      color: 'text-solar-purple-500',
      count: 1
    }
  ];

  // Contact Methods
  const contactMethods = [
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: MessageCircle,
      color: 'text-solar-blue-500',
      bgColor: 'bg-solar-blue-50 dark:bg-solar-blue-900/10',
      action: 'Start Chat',
      available: true
    },
    {
      title: 'Phone Support',
      description: 'Call us directly',
      icon: Phone,
      color: 'text-solar-green-500',
      bgColor: 'bg-solar-green-50 dark:bg-solar-green-900/10',
      action: 'Call Now',
      available: true,
      number: '+1 (555) 123-4567'
    },
    {
      title: 'Email Support',
      description: 'Send us an email',
      icon: Mail,
      color: 'text-solar-yellow-500',
      bgColor: 'bg-solar-yellow-50 dark:bg-solar-yellow-900/10',
      action: 'Send Email',
      available: true,
      email: 'support@solarfarm.com'
    },
    {
      title: 'Remote Support',
      description: 'Get remote assistance',
      icon: Monitor,
      color: 'text-solar-purple-500',
      bgColor: 'bg-solar-purple-50 dark:bg-solar-purple-900/10',
      action: 'Request Access',
      available: false
    }
  ];

  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-solar-dark-800 dark:text-white">
            Help & Support
          </h1>
          <p className="text-solar-dark-600 dark:text-solar-dark-300 mt-2">
            Get help with your solar energy system and find answers to common questions
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
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-solar-dark-300 dark:border-solar-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 bg-white dark:bg-solar-dark-800 text-solar-dark-800 dark:text-white"
            />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-solar-yellow-500" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {contactMethods.map((method, index) => (
                  <div
                    key={method.title}
                    className={`p-4 rounded-lg border transition-all hover:shadow-md ${method.bgColor} ${method.available ? 'cursor-pointer hover:scale-105' : 'opacity-50 cursor-not-allowed'}`}
                  >
                    <div className="flex items-center space-x-3">
                      <method.icon className={`w-6 h-6 ${method.color}`} />
                      <div className="flex-1">
                        <h3 className="font-medium text-solar-dark-800 dark:text-white">
                          {method.title}
                        </h3>
                        <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">
                          {method.description}
                        </p>
                        {method.number && (
                          <p className="text-sm font-medium text-solar-dark-800 dark:text-white mt-1">
                            {method.number}
                          </p>
                        )}
                        {method.email && (
                          <p className="text-sm font-medium text-solar-dark-800 dark:text-white mt-1">
                            {method.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant={method.available ? "default" : "outline"}
                      size="sm"
                      className="w-full mt-3"
                      disabled={!method.available}
                    >
                      {method.action}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-solar-blue-500" />
                <span>Frequently Asked Questions</span>
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
                  All ({faqs.length})
                </Button>
                {supportCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center space-x-2"
                  >
                    <category.icon className="w-4 h-4" />
                    <span>{category.title} ({category.count})</span>
                  </Button>
                ))}
              </div>

              {/* FAQ List */}
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-solar-dark-200 dark:border-solar-dark-700 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full p-4 text-left hover:bg-solar-dark-50 dark:hover:bg-solar-dark-900/10 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-solar-dark-800 dark:text-white">
                          {faq.question}
                        </h3>
                        {expandedFaq === faq.id ? (
                          <ChevronDown className="w-5 h-5 text-solar-dark-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-solar-dark-400" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        {faq.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-solar-dark-100 dark:bg-solar-dark-800 text-solar-dark-600 dark:text-solar-dark-300 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>
                    <AnimatePresence>
                      {expandedFaq === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 pb-4"
                        >
                          <p className="text-solar-dark-600 dark:text-solar-dark-300">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-8">
                  <HelpCircle className="w-12 h-12 text-solar-dark-400 mx-auto mb-4" />
                  <p className="text-solar-dark-600 dark:text-solar-dark-300">
                    No FAQs found matching your search criteria.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-solar-green-500" />
                <span>Additional Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-solar-dark-200 dark:border-solar-dark-700 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <Video className="w-6 h-6 text-solar-blue-500" />
                    <h3 className="font-medium text-solar-dark-800 dark:text-white">Video Tutorials</h3>
                  </div>
                  <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300 mb-3">
                    Watch step-by-step video guides for common tasks
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Videos
                  </Button>
                </div>

                <div className="p-4 border border-solar-dark-200 dark:border-solar-dark-700 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <Download className="w-6 h-6 text-solar-green-500" />
                    <h3 className="font-medium text-solar-dark-800 dark:text-white">User Manual</h3>
                  </div>
                  <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300 mb-3">
                    Download the complete user manual in PDF format
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>

                <div className="p-4 border border-solar-dark-200 dark:border-solar-dark-700 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <Users className="w-6 h-6 text-solar-purple-500" />
                    <h3 className="font-medium text-solar-dark-800 dark:text-white">Community Forum</h3>
                  </div>
                  <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300 mb-3">
                    Connect with other users and share experiences
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Forum
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-solar-amber-500" />
                <span>System Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-solar-green-50 dark:bg-solar-green-900/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-solar-green-500" />
                  <div>
                    <p className="font-medium text-solar-dark-800 dark:text-white">All Systems Operational</p>
                    <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">No known issues</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-solar-blue-50 dark:bg-solar-blue-900/10 rounded-lg">
                  <Clock className="w-5 h-5 text-solar-blue-500" />
                  <div>
                    <p className="font-medium text-solar-dark-800 dark:text-white">Response Time</p>
                    <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">Under 2 hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-solar-yellow-50 dark:bg-solar-yellow-900/10 rounded-lg">
                  <Star className="w-5 h-5 text-solar-yellow-500" />
                  <div>
                    <p className="font-medium text-solar-dark-800 dark:text-white">Satisfaction Rate</p>
                    <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300">98% satisfied</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
  );
}
