'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sun, Eye, EyeOff, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('admin@solarfarm.com');
  const [password, setPassword] = useState('demo123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Demo authentication logic
    if (email === 'admin@solarfarm.com' && password === 'demo123') {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store authentication state (in a real app, you'd use a proper auth system)
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      
      // Redirect to dashboard
      router.push('/dashboard');
    } else {
      setError('Invalid email or password. Please use the demo credentials.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-solar-gradient dark:bg-solar-dark-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/95 dark:bg-solar-dark-800/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-solar-gradient rounded-2xl flex items-center justify-center">
                <Sun className="w-8 h-8 text-solar-dark-800 dark:text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-solar-dark-800 dark:text-white">
              SolarFarm Dashboard
            </CardTitle>
            <p className="text-solar-dark-600 dark:text-solar-dark-300 mt-2">
              Sign in to monitor your solar energy system
            </p>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-solar-dark-700 dark:text-solar-dark-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-solar-dark-300 dark:border-solar-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 focus:border-transparent bg-white dark:bg-solar-dark-700 text-solar-dark-800 dark:text-white placeholder-solar-dark-500 dark:placeholder-solar-dark-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-solar-dark-700 dark:text-solar-dark-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-solar-dark-300 dark:border-solar-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-solar-yellow-400 focus:border-transparent bg-white dark:bg-solar-dark-700 text-solar-dark-800 dark:text-white placeholder-solar-dark-500 dark:placeholder-solar-dark-400"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-solar-dark-400 dark:text-solar-dark-500 hover:text-solar-dark-600 dark:hover:text-solar-dark-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-solar-yellow-400 border-solar-dark-300 dark:border-solar-dark-600 rounded focus:ring-solar-yellow-400 bg-white dark:bg-solar-dark-700"
                  />
                  <span className="ml-2 text-sm text-solar-dark-600 dark:text-solar-dark-400">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-solar-yellow-500 hover:text-solar-yellow-600"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@solarfarm.com');
                    setPassword('demo123');
                  }}
                  className="text-sm text-solar-yellow-500 hover:text-solar-yellow-600 underline"
                >
                  Fill Demo Credentials
                </button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-solar-yellow-400 hover:bg-solar-yellow-500 text-solar-dark-800 font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-solar-dark-800 border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
                              <p className="text-sm text-solar-dark-600 dark:text-solar-dark-400">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/register"
                    className="text-solar-yellow-500 hover:text-solar-yellow-600 font-medium"
                  >
                    Sign up
                  </Link>
                </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <div className="bg-white/20 dark:bg-solar-dark-800/20 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-sm font-medium text-white dark:text-solar-dark-200 mb-2">Demo Credentials</h3>
            <div className="text-xs text-white/90 dark:text-solar-dark-300 space-y-1">
              <p>Email: admin@solarfarm.com</p>
              <p>Password: demo123</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
