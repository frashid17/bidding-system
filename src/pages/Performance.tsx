import React from 'react';
import { Timer, Zap, AlertTriangle } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';

const latencyData = [
  { bidder: 'AppNexus', avgLatency: 185, timeout: '2%' },
  { bidder: 'Rubicon', avgLatency: 210, timeout: '3%' },
  { bidder: 'OpenX', avgLatency: 165, timeout: '1.5%' },
  { bidder: 'PubMatic', avgLatency: 195, timeout: '2.5%' },
];

export const Performance: React.FC = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">System Performance</h1>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <DashboardCard
            title="Average Response Time"
            value="189ms"
            icon={<Timer className="h-5 w-5 text-indigo-600" />}
            trend={{ value: 12, isPositive: true }}
          />
          <DashboardCard
            title="Timeout Rate"
            value="2.25%"
            icon={<Zap className="h-5 w-5 text-indigo-600" />}
            trend={{ value: 0.5, isPositive: true }}
          />
          <DashboardCard
            title="Error Rate"
            value="0.8%"
            icon={<AlertTriangle className="h-5 w-5 text-indigo-600" />}
            trend={{ value: 0.2, isPositive: true }}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Bidder Latency</h2>
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bidder</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Latency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeout Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {latencyData.map((item) => (
                  <tr key={item.bidder}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.bidder}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.avgLatency}ms</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.timeout}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Healthy
                      </span>
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