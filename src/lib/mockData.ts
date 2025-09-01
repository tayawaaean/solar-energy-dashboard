import { 
  SolarData, 
  EnergyProduction, 
  EnergyConsumption, 
  Device, 
  WeatherData, 
  User, 
  Notification,
  DashboardStats 
} from './types';

// Generate mock solar data
export const mockSolarData: SolarData = {
  currentPower: 12.5,
  dailyEnergy: 89.2,
  weeklyEnergy: 623.8,
  monthlyEnergy: 2678.5,
  totalEnergy: 45678.9,
  efficiency: 87.3,
  batteryLevel: 78.5,
  systemStatus: 'online',
  lastUpdated: new Date(),
};

// Generate mock energy production data for the last 24 hours
export const mockEnergyProduction: EnergyProduction[] = Array.from({ length: 24 }, (_, i) => ({
  timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
  power: Math.random() * 15 + 5, // 5-20 kW
  energy: Math.random() * 2 + 0.5, // 0.5-2.5 kWh per hour
}));

// Generate mock energy consumption data
export const mockEnergyConsumption: EnergyConsumption[] = Array.from({ length: 24 }, (_, i) => ({
  timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
  power: Math.random() * 8 + 2, // 2-10 kW
  energy: Math.random() * 1.5 + 0.3, // 0.3-1.8 kWh per hour
  source: ['pump', 'lighting', 'appliances', 'other'][Math.floor(Math.random() * 4)] as any,
}));

// Generate mock devices data
export const mockDevices: Device[] = [
  {
    id: '1',
    name: 'Solar Panel Array 1',
    type: 'solar_panel',
    status: 'online',
    powerUsage: 5.2,
    efficiency: 92.1,
    lastSeen: new Date(),
    location: 'Roof - North',
  },
  {
    id: '2',
    name: 'Solar Panel Array 2',
    type: 'solar_panel',
    status: 'online',
    powerUsage: 4.8,
    efficiency: 89.7,
    lastSeen: new Date(),
    location: 'Roof - South',
  },
  {
    id: '3',
    name: 'Battery Bank 1',
    type: 'battery',
    status: 'online',
    powerUsage: 0.5,
    efficiency: 94.2,
    lastSeen: new Date(),
    location: 'Basement',
  },
  {
    id: '4',
    name: 'Inverter Main',
    type: 'inverter',
    status: 'online',
    powerUsage: 0.3,
    efficiency: 96.8,
    lastSeen: new Date(),
    location: 'Utility Room',
  },
  {
    id: '5',
    name: 'Water Pump',
    type: 'pump',
    status: 'online',
    powerUsage: 2.1,
    efficiency: 78.5,
    lastSeen: new Date(),
    location: 'Well House',
  },
  {
    id: '6',
    name: 'LED Lighting System',
    type: 'lighting',
    status: 'online',
    powerUsage: 1.2,
    efficiency: 85.3,
    lastSeen: new Date(),
    location: 'Main Building',
  },
  {
    id: '7',
    name: 'HVAC System',
    type: 'appliance',
    status: 'warning',
    powerUsage: 3.8,
    efficiency: 72.1,
    lastSeen: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    location: 'Main Building',
  },
  {
    id: '8',
    name: 'Refrigerator',
    type: 'appliance',
    status: 'online',
    powerUsage: 0.8,
    efficiency: 88.9,
    lastSeen: new Date(),
    location: 'Kitchen',
  },
];

// Generate mock weather data
export const mockWeatherData: WeatherData = {
  temperature: 24.5,
  humidity: 65,
  windSpeed: 12.3,
  solarIrradiance: 850,
  condition: 'sunny',
  forecast: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
    temperature: Math.random() * 20 + 15, // 15-35°C
    condition: ['sunny', 'cloudy', 'rainy', 'partly_cloudy'][Math.floor(Math.random() * 4)] as any,
    solarIrradiance: Math.random() * 1000 + 200, // 200-1200 W/m²
  })),
};

// Generate mock user data
export const mockUser: User = {
  id: '1',
  name: 'John Solar',
  email: 'john@solarfarm.com',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
};

// Generate mock notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'System Optimization Complete',
    message: 'Solar panel efficiency has been optimized to 92.1%',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'HVAC System Alert',
    message: 'HVAC system efficiency has dropped to 72.1%',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Weather Update',
    message: 'Clear skies expected for the next 3 days',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
  },
  {
    id: '4',
    type: 'success',
    title: 'Battery Charged',
    message: 'Battery bank has reached 78.5% capacity',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: true,
  },
];

// Generate mock dashboard stats
export const mockDashboardStats: DashboardStats = {
  totalPowerGenerated: 45678.9,
  totalEnergySaved: 34256.7,
  carbonOffset: 23456.8, // kg CO2
  costSavings: 12345.6, // USD
  systemEfficiency: 87.3,
};

// Generate monthly energy data for charts
export const mockMonthlyEnergyData = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' }),
  production: Math.random() * 3000 + 2000, // 2000-5000 kWh
  consumption: Math.random() * 2000 + 1500, // 1500-3500 kWh
  savings: Math.random() * 1000 + 500, // 500-1500 kWh
}));

// Generate consumption breakdown data
export const mockConsumptionBreakdown = [
  { name: 'Pump', value: 35, color: '#3b82f6' },
  { name: 'Lighting', value: 25, color: '#f59e0b' },
  { name: 'Appliances', value: 30, color: '#22c55e' },
  { name: 'Other', value: 10, color: '#64748b' },
];

// Generate daily production data for the last 30 days
export const mockDailyProductionData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  production: Math.random() * 100 + 50, // 50-150 kWh
  consumption: Math.random() * 80 + 40, // 40-120 kWh
  efficiency: Math.random() * 20 + 80, // 80-100%
}));
