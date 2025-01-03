import React from 'react';

export const Settings: React.FC = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

        <div className="mt-6">
          <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Bidder Configuration</h3>
              <div className="mt-4 space-y-4">
                {['AppNexus', 'Rubicon', 'OpenX', 'PubMatic'].map((bidder) => (
                  <div key={bidder} className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">{bidder}</label>
                      <p className="text-sm text-gray-500">Enabled</p>
                    </div>
                    <button className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md text-sm font-medium">
                      Configure
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Timeout Settings</h3>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Bid Timeout (ms)</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  defaultValue="1000"
                />
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Price Floors</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Desktop Floor Price</label>
                  <input
                    type="number"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue="1.20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile Floor Price</label>
                  <input
                    type="number"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue="0.80"
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
              <div className="mt-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable detailed bid logging</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};