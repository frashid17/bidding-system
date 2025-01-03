import React from 'react';
import { Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceMetric {
  label: string;
  value: number;
  change: number;
}

interface ChartData {
  date: string;
  revenue: number;
  impressions: number;
}

export const Performance: React.FC = () => {
  const metrics: PerformanceMetric[] = [
    { label: 'Revenue', value: 1234.56, change: 12.3 },
    { label: 'Impressions', value: 45678, change: -5.2 },
    { label: 'CTR', value: 2.34, change: 8.7 },
    { label: 'Fill Rate', value: 85.4, change: 3.1 }
  ];

  // Sample data for the chart
  const chartData: ChartData[] = [
    { date: '2024-01-14', revenue: 1200, impressions: 42000 },
    { date: '2024-01-15', revenue: 1350, impressions: 45000 },
    { date: '2024-01-16', revenue: 1450, impressions: 48000 },
    { date: '2024-01-17', revenue: 1300, impressions: 44000 },
    { date: '2024-01-18', revenue: 1600, impressions: 52000 },
    { date: '2024-01-19', revenue: 1750, impressions: 56000 },
    { date: '2024-01-20', revenue: 1900, impressions: 58000 },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatRevenue = (value: number) => `$${value.toFixed(2)}`;

  return (
    <div className="py-6 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 mb-6">
          <Activity className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Performance</h1>
        </div>

        {/* Metrics Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.label}</span>
                <span className={`text-sm ${metric.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {metric.change >= 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {metric.label === 'Revenue' ? `$${metric.value.toFixed(2)}` : metric.value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section with actual chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Revenue Trend</h2>
          </div>
          <div className="p-4">
            <div className="h-[300px] sm:h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatDate}
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    tickFormatter={formatRevenue}
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.375rem'
                    }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                    labelFormatter={formatDate}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366F1"
                    fillOpacity={1}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Table Section - Responsive with horizontal scroll on mobile */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Detailed Metrics</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Impressions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CTR</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {/* Table rows would go here */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">2024-01-20</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$1,234.56</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">45,678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">2.34%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};