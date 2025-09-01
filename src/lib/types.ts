export interface SolarData {
  currentPower: number; // kW
  dailyEnergy: number; // kWh
  weeklyEnergy: number; // kWh
  monthlyEnergy: number; // kWh
  totalEnergy: number; // kWh
  efficiency: number; // percentage
  batteryLevel: number; // percentage
  systemStatus: 'online' | 'offline' | 'warning' | 'error';
  lastUpdated: Date;
}

export interface EnergyProduction {
  timestamp: Date;
  power: number; // kW
  energy: number; // kWh
}

export interface EnergyConsumption {
  timestamp: Date;
  power: number; // kW
  energy: number; // kWh
  source: 'pump' | 'lighting' | 'appliances' | 'other';
}

export interface Device {
  id: string;
  name: string;
  type: 'solar_panel' | 'battery' | 'inverter' | 'pump' | 'lighting' | 'appliance';
  status: 'online' | 'offline' | 'warning' | 'error';
  powerUsage: number; // kW
  efficiency: number; // percentage
  lastSeen: Date;
  location: string;
}

export interface WeatherData {
  temperature: number; // Celsius
  humidity: number; // percentage
  windSpeed: number; // m/s
  solarIrradiance: number; // W/m²
  condition: 'sunny' | 'cloudy' | 'rainy' | 'partly_cloudy';
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  date: Date;
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'partly_cloudy';
  solarIrradiance: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  avatar?: string;
  lastLogin: Date;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface DashboardStats {
  totalPowerGenerated: number;
  totalEnergySaved: number;
  carbonOffset: number;
  costSavings: number;
  systemEfficiency: number;
}
