'use client';

import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, Cloudy, Thermometer, Wind, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockWeatherData } from '@/lib/mockData';

const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case 'sunny':
      return <Sun className="w-8 h-8 text-solar-yellow-500" />;
    case 'cloudy':
      return <Cloud className="w-8 h-8 text-solar-dark-400" />;
    case 'rainy':
      return <CloudRain className="w-8 h-8 text-solar-blue-500" />;
    case 'partly_cloudy':
      return <Cloudy className="w-8 h-8 text-solar-dark-400" />;
    default:
      return <Sun className="w-8 h-8 text-solar-yellow-500" />;
  }
};

export default function WeatherWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Sun className="w-5 h-5 text-solar-yellow-500" />
            <span>Weather & Solar</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Current Weather */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getWeatherIcon(mockWeatherData.condition)}
                <div>
                  <div className="text-2xl font-bold text-solar-dark-800 dark:text-white">
                    {mockWeatherData.temperature}°C
                  </div>
                  <div className="text-sm text-solar-dark-600 dark:text-solar-dark-300 capitalize">
                    {mockWeatherData.condition.replace('_', ' ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-solar-dark-200 dark:border-solar-dark-700">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-4 h-4 text-solar-dark-400" />
                <div>
                  <div className="text-sm font-medium text-solar-dark-800 dark:text-white">
                    Humidity
                  </div>
                  <div className="text-xs text-solar-dark-600 dark:text-solar-dark-300">
                    {mockWeatherData.humidity}%
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="w-4 h-4 text-solar-dark-400" />
                <div>
                  <div className="text-sm font-medium text-solar-dark-800 dark:text-white">
                    Wind Speed
                  </div>
                  <div className="text-xs text-solar-dark-600 dark:text-solar-dark-300">
                    {mockWeatherData.windSpeed} m/s
                  </div>
                </div>
              </div>
            </div>

            {/* Solar Irradiance */}
            <div className="pt-4 border-t border-solar-dark-200 dark:border-solar-dark-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-solar-yellow-500" />
                  <span className="text-sm font-medium text-solar-dark-800 dark:text-white">
                    Solar Irradiance
                  </span>
                </div>
                <span className="text-sm font-bold text-solar-yellow-500">
                  {mockWeatherData.solarIrradiance} W/m²
                </span>
              </div>
              <div className="w-full bg-solar-dark-200 dark:bg-solar-dark-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(mockWeatherData.solarIrradiance / 1200) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-2 rounded-full bg-solar-yellow-500"
                />
              </div>
              <div className="flex justify-between text-xs text-solar-dark-400 mt-1">
                <span>0</span>
                <span>1200 W/m²</span>
              </div>
            </div>

            {/* Forecast Preview */}
            <div className="pt-4 border-t border-solar-dark-200 dark:border-solar-dark-700">
              <div className="text-sm font-medium text-solar-dark-800 dark:text-white mb-2">
                3-Day Forecast
              </div>
              <div className="flex space-x-2">
                {mockWeatherData.forecast.slice(1, 4).map((day, index) => (
                  <div key={index} className="flex-1 text-center">
                    <div className="text-xs text-solar-dark-600 dark:text-solar-dark-300">
                      {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="mt-1">
                      {getWeatherIcon(day.condition)}
                    </div>
                    <div className="text-xs font-medium text-solar-dark-800 dark:text-white">
                      {day.temperature.toFixed(0)}°C
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
