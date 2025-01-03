import React, { useState } from 'react';
import { DashboardCard } from '../components/DashboardCard';
import { AdDisplay } from '../components/AdDisplay';
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Target, 
  BarChart, 
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdUnit {
  size: string;
  revenue: number;
  impressions: number;
  ctr: number;
  fillRate: number;
  ecpm: number;
}

interface ChartData {
  time: string;
  revenue: number;
  impressions: number;
}

export const Overview: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'impressions'>('revenue');

  const mockAdUnits: AdUnit[] = [
    { size: '300x250', revenue: 245.80, impressions: 12500, ctr: 2.1, fillRate: 92, ecpm: 1.85 },
    { size: '728x90', revenue: 186.40, impressions: 9800, ctr: 1.8, fillRate: 88, ecpm: 1.65 },
    { size: '300x600', revenue: 312.60, impressions: 7500, ctr: 2.4, fillRate: 95, ecpm: 2.10 },
    { size: '320x50', revenue: 156.30, impressions: 8900, ctr: 1.6, fillRate: 86, ecpm: 1.45 }
  ];

  const chartData: ChartData[] = [
    { time: '00:00', revenue: 120, impressions: 5000 },
    { time: '04:00', revenue: 180, impressions: 7500 },
    { time: '08:00', revenue: 240, impressions: 9000 },
    { time: '12:00', revenue: 300, impressions: 12000 },
    { time: '16:00', revenue: 280, impressions: 11000 },
    { time: '20:00', revenue: 220, impressions: 8500 },
    { time: '23:59', revenue: 150, impressions: 6000 }
  ];

  const formatValue = (value: number) => {
    return selectedMetric === 'revenue' 
      ? `$${value.toFixed(2)}` 
      : value.toLocaleString();
  };

  const getTrendIcon = (value: number) => {
    return value > 0 
      ? <ArrowUpRight className="w-4 h-4 text-green-500" />
      : <ArrowDownRight className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Header Bidding Dashboard</h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as '24h' | '7d' | '30d')}
            className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 
              dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
        
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

        {/* Revenue/Impressions Chart */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Performance Overview</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedMetric('revenue')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  selectedMetric === 'revenue'
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setSelectedMetric('impressions')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  selectedMetric === 'impressions'
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Impressions
              </button>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="time" 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                  tickFormatter={formatValue}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.375rem'
                  }}
                  formatter={(value: number) => [formatValue(value), selectedMetric]}
                />
                <Area
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke="#6366F1"
                  fillOpacity={1}
                  fill="url(#colorMetric)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ad Units Section */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Active Ad Units</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockAdUnits.map((adUnit) => (
              <AdDisplay
                key={adUnit.size}
                size={adUnit.size}
                revenue={adUnit.revenue}
                impressions={adUnit.impressions}
                ctr={adUnit.ctr}
                fillRate={adUnit.fillRate}
                ecpm={adUnit.ecpm}
              />
            ))}
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Performing Sizes</h3>
            <div className="space-y-4">
              {mockAdUnits
                .sort((a, b) => b.revenue - a.revenue)
                .map((adUnit) => (
                  <div key={adUnit.size} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BarChart className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {adUnit.size}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ${adUnit.revenue.toFixed(2)}
                      </span>
                      {getTrendIcon(Math.random() > 0.5 ? 1 : -1)}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Fill Rate by Size</h3>
            <div className="space-y-4">
              {mockAdUnits
                .sort((a, b) => b.fillRate - a.fillRate)
                .map((adUnit) => (
                  <div key={adUnit.size} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {adUnit.size}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {adUnit.fillRate}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${adUnit.fillRate}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};