'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color?: string;
}

export default function StatCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon,
  color = 'text-solar-yellow-500'
}: StatCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-solar-green-500';
      case 'negative':
        return 'text-red-500';
      default:
        return 'text-solar-dark-400';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return '↗';
      case 'negative':
        return '↘';
      default:
        return '→';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-solar-dark-600 dark:text-solar-dark-300">
                {title}
              </p>
              <p className="text-2xl font-bold text-solar-dark-800 dark:text-white mt-1">
                {value}
              </p>
              {change && (
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${getChangeColor()}`}>
                    {getChangeIcon()} {change}
                  </span>
                </div>
              )}
            </div>
            <div className={`p-3 rounded-lg bg-solar-dark-100 dark:bg-solar-dark-700 ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
