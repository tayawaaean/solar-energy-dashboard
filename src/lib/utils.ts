import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function getStatusColor(status: 'online' | 'offline' | 'warning' | 'error'): string {
  switch (status) {
    case 'online':
      return 'text-solar-green-500';
    case 'offline':
      return 'text-solar-dark-400';
    case 'warning':
      return 'text-solar-amber-500';
    case 'error':
      return 'text-red-500';
    default:
      return 'text-solar-dark-400';
  }
}

export function getStatusBgColor(status: 'online' | 'offline' | 'warning' | 'error'): string {
  switch (status) {
    case 'online':
      return 'bg-solar-green-100 dark:bg-solar-green-900/20';
    case 'offline':
      return 'bg-solar-dark-100 dark:bg-solar-dark-800';
    case 'warning':
      return 'bg-solar-amber-100 dark:bg-solar-amber-900/20';
    case 'error':
      return 'bg-red-100 dark:bg-red-900/20';
    default:
      return 'bg-solar-dark-100 dark:bg-solar-dark-800';
  }
}
