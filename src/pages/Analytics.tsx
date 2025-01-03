import React, { useState } from 'react';
import { LineChart, BarChart3, PieChart, ArrowUpRight, ArrowDownRight, TrendingUp, Filter } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';

interface BidderData {
  name: string;
  bids: number;
  wins: number;
  revenue: number;
  trend: {
    bids: number;
    wins: number;
    revenue: number;
  };
}

export const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof BidderData | 'winRate';
    direction: 'asc' | 'desc';
  }>({ key: 'revenue', direction: 'desc' });
  const [filterVisible, setFilterVisible] = useState(false);
  const [minRevenue, setMinRevenue] = useState<number>(0);

  // Sample data for different time ranges
  const timeRangeData = {
    '24h': [
      { 
        name: 'AppNexus',
        bids: 1250,
        wins: 380,
        revenue: 950.25,
        trend: { bids: 5.2, wins: 3.8, revenue: 7.5 }
      },
      { 
        name: 'Rubicon',
        bids: 980,
        wins: 290,
        revenue: 725.50,
        trend: { bids: -2.1, wins: -1.5, revenue: -0.8 }
      },
      { 
        name: 'OpenX',
        bids: 850,
        wins: 245,
        revenue: 612.75,
        trend: { bids: 8.4, wins: 6.2, revenue: 9.1 }
      },
      { 
        name: 'PubMatic',
        bids: 720,
        wins: 210,
        revenue: 525.00,
        trend: { bids: 1.5, wins: 2.8, revenue: 3.2 }
      },
    ],
    '7d': [
      { 
        name: 'AppNexus',
        bids: 8750,
        wins: 2660,
        revenue: 6650.75,
        trend: { bids: 7.2, wins: 5.8, revenue: 8.5 }
      },
      { 
        name: 'Rubicon',
        bids: 6800,
        wins: 2140,
        revenue: 5000.00,
        trend: { bids: -1.5, wins: -0.8, revenue: -0.5 }
      },
      { 
        name: 'OpenX',
        bids: 5800,
        wins: 1700,
        revenue: 4000.00,
        trend: { bids: 6.0, wins: 4.0, revenue: 6.0 }
      },
      { 
        name: 'PubMatic',
        bids: 4800,
        wins: 1400,
        revenue: 3200.00,
        trend: { bids: 1.0, wins: 1.5, revenue: 2.0 }
      },
    ],
    '30d': [
      { 
        name: 'AppNexus',
        bids: 37500,
        wins: 11400,
        revenue: 28507.25,
        trend: { bids: 9.2, wins: 7.8, revenue: 10.5 }
      },
      { 
        name: 'Rubicon',
        bids: 29000,
        wins: 8700,
        revenue: 21000.00,
        trend: { bids: -0.5, wins: -0.2, revenue: -0.3 }
      },
      { 
        name: 'OpenX',
        bids: 25000,
        wins: 7500,
        revenue: 17000.00,
        trend: { bids: 7.0, wins: 5.0, revenue: 8.0 }
      },
      { 
        name: 'PubMatic',
        bids: 20000,
        wins: 6000,
        revenue: 12000.00,
        trend: { bids: 2.0, wins: 1.0, revenue: 3.0 }
      },
    ]
  };

  const [bidderData, setBidderData] = useState<BidderData[]>(timeRangeData['24h']);

  // Update data when time range changes
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    setBidderData(timeRangeData[range as keyof typeof timeRangeData]);
  };

  const handleSort = (key: keyof BidderData | 'winRate') => {
    setSortConfig({
      key,
      direction: 
        sortConfig.key === key && sortConfig.direction === 'desc' 
          ? 'asc' 
          : 'desc'
    });
  };

  const sortedData = [...bidderData].sort((a, b) => {
    let aValue = sortConfig.key === 'winRate' 
      ? (a.wins / a.bids) 
      : a[sortConfig.key];
    let bValue = sortConfig.key === 'winRate' 
      ? (b.wins / b.bids) 
      : b[sortConfig.key];

    return sortConfig.direction === 'desc' 
      ? (bValue as number) - (aValue as number)
      : (aValue as number) - (bValue as number);
  }).filter(bidder => bidder.revenue >= minRevenue);

  const getTrendIcon = (value: number) => {
    if (value > 0) {
      return <ArrowUpRight className="w-4 h-4 text-green-500" />;
    } else if (value < 0) {
      return <ArrowDownRight className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Bidding Analytics</h1>
          <div className="flex gap-2">
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <button
              onClick={() => setFilterVisible(!filterVisible)}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {filterVisible && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Minimum Revenue
                </label>
                <input
                  type="number"
                  value={minRevenue}
                  onChange={(e) => setMinRevenue(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <DashboardCard
            title="Total Bids"
            value={sortedData.reduce((sum, bidder) => sum + bidder.bids, 0).toLocaleString()}
            icon={<BarChart3 className="h-5 w-5 text-indigo-600" />}
            trend={{ value: 8.2, isPositive: true }}
          />
          <DashboardCard
            title="Total Revenue"
            value={`$${sortedData.reduce((sum, bidder) => sum + bidder.revenue, 0).toLocaleString()}`}
            icon={<LineChart className="h-5 w-5 text-indigo-600" />}
            trend={{ value: 12.5, isPositive: true }}
          />
          <DashboardCard
            title="Average Win Rate"
            value={`${(sortedData.reduce((sum, bidder) => sum + (bidder.wins / bidder.bids), 0) / sortedData.length * 100).toFixed(1)}%`}
            icon={<PieChart className="h-5 w-5 text-indigo-600" />}
            trend={{ value: 4.8, isPositive: true }}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Bidder Performance</h2>
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {[
                    { key: 'name', label: 'Bidder' },
                    { key: 'bids', label: 'Total Bids' },
                    { key: 'wins', label: 'Wins' },
                    { key: 'revenue', label: 'Revenue' },
                    { key: 'winRate', label: 'Win Rate' }
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key as keyof BidderData | 'winRate')}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center space-x-1">
                        <span>{label}</span>
                        {sortConfig.key === key && (
                          <TrendingUp className={`w-4 h-4 ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {sortedData.map((bidder) => (
                  <tr key={bidder.name} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{bidder.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 dark:text-gray-300">{bidder.bids.toLocaleString()}</span>
                        {getTrendIcon(bidder.trend.bids)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 dark:text-gray-300">{bidder.wins.toLocaleString()}</span>
                        {getTrendIcon(bidder.trend.wins)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 dark:text-gray-300">${bidder.revenue.toLocaleString()}</span>
                        {getTrendIcon(bidder.trend.revenue)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
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