'use client';

import { motion } from 'framer-motion';
import { Battery, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BatteryGaugeProps {
  level: number; // 0-100
  charging?: boolean;
}

export default function BatteryGauge({ level, charging = false }: BatteryGaugeProps) {
  const getBatteryColor = (level: number) => {
    if (level > 70) return 'text-solar-green-500';
    if (level > 30) return 'text-solar-amber-500';
    return 'text-red-500';
  };

  const getBatteryBgColor = (level: number) => {
    if (level > 70) return 'bg-solar-green-100 dark:bg-solar-green-900/20';
    if (level > 30) return 'bg-solar-amber-100 dark:bg-solar-amber-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Battery className="w-5 h-5" />
            <span>Battery Status</span>
            {charging && <Zap className="w-4 h-4 text-solar-yellow-500 animate-pulse" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Battery Visual */}
            <div className="flex justify-center">
              <div className="relative w-32 h-16 border-2 border-solar-dark-300 dark:border-solar-dark-600 rounded-lg">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-solar-dark-300 dark:bg-solar-dark-600 rounded-r-sm"></div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-l-lg ${getBatteryBgColor(level)}`}
                >
                  <div className={`h-full rounded-l-lg ${getBatteryColor(level)} bg-opacity-20`}></div>
                </motion.div>
              </div>
            </div>

            {/* Level Display */}
            <div className="text-center">
              <div className={`text-3xl font-bold ${getBatteryColor(level)}`}>
                {level}%
              </div>
              <p className="text-sm text-solar-dark-600 dark:text-solar-dark-300 mt-1">
                {charging ? 'Charging' : level > 20 ? 'Ready' : 'Low Battery'}
              </p>
            </div>

            {/* Status Bar */}
            <div className="w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-2 rounded-full ${getBatteryColor(level).replace('text-', 'bg-')}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
