import React from 'react';
import { DashboardCard } from '../components/DashboardCard';
import { AdDisplay } from '../components/AdDisplay';
import { DollarSign, TrendingUp, Clock, Target } from 'lucide-react';

const mockAdUnits = [
  { size: '300x250', revenue: 245.80, impressions: 12500, ctr: 2.1 },
  { size: '728x90', revenue: 186.40, impressions: 9800, ctr: 1.8 },
  { size: '300x600', revenue: 312.60, impressions: 7500, ctr: 2.4 }
];

export const Overview: React.FC = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Header Bidding Dashboard</h1>
        
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Average CPM"
            value="$2.45"
            icon={<DollarSign className="h-5 w-5" />}
            trend={{ value: 12.5, isPositive: true }}
          />
          <DashboardCard
            title="Fill Rate"
            value="94%"
            icon={<Target className="h-5 w-5" />}
            trend={{ value: 3.2, isPositive: true }}
          />
          <DashboardCard
            title="Bid Response Time"
            value="285ms"
            icon={<Clock className="h-5 w-5" />}
            trend={{ value: 15, isPositive: false }}
          />
          <DashboardCard
            title="Win Rate"
            value="68%"
            icon={<TrendingUp className="h-5 w-5" />}
            trend={{ value: 5.8, isPositive: true }}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Active Ad Units</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAdUnits.map((adUnit) => (
              <AdDisplay
                key={adUnit.size}
                size={adUnit.size}
                revenue={adUnit.revenue}
                impressions={adUnit.impressions}
                ctr={adUnit.ctr}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};