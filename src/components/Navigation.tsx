import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BarChart, Settings, Home, Activity } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Navigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mr-8">AdBid</span>
            <div className="flex space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Home className="w-4 h-4 mr-2" />
                Overview
              </Link>
              <Link
                to="/analytics"
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/analytics')
                    ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <BarChart className="w-4 h-4 mr-2" />
                Analytics
              </Link>
              <Link
                to="/performance"
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/performance')
                    ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Activity className="w-4 h-4 mr-2" />
                Performance
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              to="/settings"
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/settings')
                  ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};