import React from 'react';
import { DollarSign } from 'lucide-react';

interface AdDisplayProps {
  size: string;
  revenue: number;
  impressions: number;
  ctr: number;
}

export const AdDisplay: React.FC<AdDisplayProps> = ({ size, revenue, impressions, ctr }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Ad Size: {size}
        </span>
        <div className="flex items-center text-green-600 dark:text-green-400">
          <DollarSign className="w-4 h-4 mr-1" />
          <span className="font-medium">${revenue.toFixed(2)}</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Impressions</span>
            <span className="font-medium text-gray-900 dark:text-white">{impressions.toLocaleString()}</span>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">CTR</span>
            <span className="font-medium text-gray-900 dark:text-white">{ctr}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};