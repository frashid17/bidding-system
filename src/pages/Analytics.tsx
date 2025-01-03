import React, { useState } from 'react';
import { 
  LineChart, 
  BarChart3, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  Filter,
  Download,
  RefreshCcw
} from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  Legend
} from 'recharts';

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

interface BidderTimeData {
  hour: string;
  AppNexus: number;
  Rubicon: number;
  OpenX: number;
  PubMatic: number;
}

// Define the type for legend payload
type LegendPayloadItem = {
  value: string;
  id?: string;
  type?: string;
  color?: string;
  dataKey?: string | number | ((obj: any) => any);
};

export const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof BidderData | 'winRate';
    direction: 'asc' | 'desc';
  }>({ key: 'revenue', direction: 'desc' });
  const [filterVisible, setFilterVisible] = useState(false);
  const [minRevenue, setMinRevenue] = useState<number>(0);
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'bids' | 'wins'>('revenue');

  // Hourly data for the chart
  const hourlyData: BidderTimeData[] = [
    { hour: '00:00', AppNexus: 120, Rubicon: 80, OpenX: 60, PubMatic: 40 },
    { hour: '04:00', AppNexus: 180, Rubicon: 120, OpenX: 90, PubMatic: 70 },
    { hour: '08:00', AppNexus: 240, Rubicon: 160, OpenX: 120, PubMatic: 90 },
    { hour: '12:00', AppNexus: 300, Rubicon: 200, OpenX: 150, PubMatic: 110 },
    { hour: '16:00', AppNexus: 280, Rubicon: 180, OpenX: 140, PubMatic: 100 },
    { hour: '20:00', AppNexus: 220, Rubicon: 140, OpenX: 110, PubMatic: 80 },
    { hour: '23:59', AppNexus: 150, Rubicon: 100, OpenX: 80, PubMatic: 60 }
  ];

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

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    setBidderData(timeRangeData[range as keyof typeof timeRangeData]);
  };

  const handleExportData = () => {
    const csvContent = [
      ['Bidder', 'Bids', 'Wins', 'Revenue', 'Win Rate'].join(','),
      ...sortedData.map(bidder => [
        bidder.name,
        bidder.bids,
        bidder.wins,
        bidder.revenue,
        ((bidder.wins / bidder.bids) * 100).toFixed(1) + '%'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `bidder-analytics-${timeRange}.csv`;
    link.click();
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

  // Add custom legend formatter
  const renderLegend = (value: string) => {
    return value.replace(/([A-Z])/g, ' $1').trim(); // Adds space before capital letters
  };

  // Add custom tooltip formatter
  const formatTooltipValue = (value: number, name: string, metric: string) => {
    if (metric === 'revenue') {
      return [`$${value.toLocaleString()}`, name];
    }
    return [value.toLocaleString(), name];
  };

  // Add new state for visible bidders
  const [visibleBidders, setVisibleBidders] = useState<{ [key: string]: boolean }>({
    AppNexus: true,
    Rubicon: true,
    OpenX: true,
    PubMatic: true
  });

  // Add legend click handler
  const handleLegendClick = (entry: LegendPayloadItem) => {
    if (!entry.dataKey) return;
    
    const dataKeyString = typeof entry.dataKey === 'function' 
      ? 'function'
      : String(entry.dataKey);
      
    setVisibleBidders(prev => {
      const allFalse = Object.values({ ...prev, [dataKeyString]: !prev[dataKeyString] }).every(v => !v);
      // If all would be false, reset to all true
      if (allFalse) {
        return Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: true }), {});
      }
      return { ...prev, [dataKeyString]: !prev[dataKeyString] };
    });
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
              className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 
                dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <button
              onClick={() => setFilterVisible(!filterVisible)}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 
                hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            <button
              onClick={handleExportData}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 
                hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Download className="w-5 h-5 text-gray-500 dark:text-gray-400" />
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

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Hourly Performance</h2>
              <div className="flex space-x-4">
                {['revenue', 'bids', 'wins'].map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setSelectedMetric(metric as typeof selectedMetric)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      selectedMetric === metric
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    {metric.charAt(0).toUpperCase() + metric.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={hourlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="hour" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                    tickFormatter={(value) => selectedMetric === 'revenue' ? `$${value}` : value}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.375rem'
                    }}
                    formatter={(value: number, name: string) => 
                      formatTooltipValue(value, name, selectedMetric)
                    }
                  />
                  <Legend 
                    formatter={renderLegend}
                    wrapperStyle={{
                      paddingTop: '20px'
                    }}
                    onClick={(entry) => handleLegendClick(entry)}
                  />
                  {Object.keys(hourlyData[0])
                    .filter(key => key !== 'hour')
                    .map((bidder, index) => (
                      <Bar
                        key={bidder}
                        dataKey={bidder}
                        fill={`hsl(${index * 90}, 70%, 60%)`}
                        stackId="stack"
                        name={bidder}
                        hide={!visibleBidders[bidder]}
                      >
                        <animate attributeName="opacity" from="0" to="1" dur="0s" />
                        <animate attributeName="y" from="0" to="0" dur="0s" />
                        <animate attributeName="height" from="0" to="0" dur="0s" />
                      </Bar>
                    ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Win Rate Analysis</h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={sortedData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.375rem'
                    }}
                    formatter={(value: number) => [`${value.toFixed(1)}%`, 'Win Rate']}
                  />
                  <Legend 
                    formatter={() => 'Win Rate'}
                    wrapperStyle={{
                      paddingTop: '20px'
                    }}
                  />
                  <Bar
                    dataKey={(data: BidderData) => ((data.wins / data.bids) * 100)}
                    fill="#6366F1"
                    name="Win Rate"
                  >
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Bidder Performance</h2>
            <button
              onClick={() => setBidderData([...bidderData])}
              className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 dark:text-gray-300 
                hover:text-gray-900 dark:hover:text-white"
            >
              <RefreshCcw className="w-4 h-4" />
              Refresh
            </button>
          </div>
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