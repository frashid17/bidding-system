import React from 'react';
import { LineChart, BarChart3, PieChart } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';

const bidderData = [
  { name: 'AppNexus', bids: 1250, wins: 380, revenue: 950.25 },
  { name: 'Rubicon', bids: 980, wins: 290, revenue: 725.50 },
  { name: 'OpenX', bids: 850, wins: 245, revenue: 612.75 },
  { name: 'PubMatic', bids: 720, wins: 210, revenue: 525.00 },
];

export const Analytics: React.FC = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Bidding Analytics</h1>
          <div className="flex gap-2">
            <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <DashboardCard
            title="Total Bids"
            value="3,800"
            icon={<BarChart3 className="h-5 w-5 text-indigo-600" />}
            trend={{ value: 8.2, isPositive: true }}
          />
          <DashboardCard
            title="Total Revenue"
            value="$2,813.50"
            icon={<LineChart className="h-5 w-5 text-indigo-600" />}
            trend={{ value: 12.5, isPositive: true }}
          />
          <DashboardCard
            title="Win Rate"
            value="29.6%"
            icon={<PieChart className="h-5 w-5 text-indigo-600" />}
            trend={{ value: 4.8, isPositive: true }}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Bidder Performance</h2>
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bidder</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Bids</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wins</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Win Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bidderData.map((bidder) => (
                  <tr key={bidder.name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bidder.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bidder.bids.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bidder.wins.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${bidder.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {((bidder.wins / bidder.bids) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};