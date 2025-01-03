import React, { useState } from 'react';
import { Settings as SettingsIcon, ChevronRight, Settings2, X } from 'lucide-react';

interface BidderConfig {
  name: string;
  enabled: boolean;
  timeout?: number;
  bidFloor?: number;
  currency?: string;
  refreshInterval?: number;
}

interface ModalProps {
  bidder: BidderConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedConfig: BidderConfig) => void;
}

const ConfigModal: React.FC<ModalProps> = ({ bidder, isOpen, onClose, onSave }) => {
  const [config, setConfig] = useState<BidderConfig>(bidder);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Configure {bidder.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.enabled}
                onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 
                  focus:ring-indigo-500 dark:bg-gray-700"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-200">Enabled</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Timeout (ms)
            </label>
            <input
              type="number"
              value={config.timeout || 1000}
              onChange={(e) => setConfig({ ...config, timeout: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                dark:text-gray-100 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Bid Floor
            </label>
            <input
              type="number"
              step="0.01"
              value={config.bidFloor || 0}
              onChange={(e) => setConfig({ ...config, bidFloor: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                dark:text-gray-100 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Refresh Interval (seconds)
            </label>
            <input
              type="number"
              value={config.refreshInterval || 0}
              onChange={(e) => setConfig({ ...config, refreshInterval: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                dark:text-gray-100 sm:text-sm"
            />
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 
              hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(config);
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 
              hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-gray-800"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export const Settings: React.FC = () => {
  const [activeMobileSection, setActiveMobileSection] = useState<string | null>(null);
  const [selectedBidder, setSelectedBidder] = useState<BidderConfig | null>(null);
  const [bidders, setBidders] = useState<BidderConfig[]>([
    { name: 'AppNexus', enabled: true, timeout: 1000, bidFloor: 0.5, refreshInterval: 30 },
    { name: 'Rubicon', enabled: true, timeout: 1000, bidFloor: 0.8, refreshInterval: 45 },
    { name: 'OpenX', enabled: true, timeout: 800, bidFloor: 0.4, refreshInterval: 30 },
    { name: 'PubMatic', enabled: true, timeout: 1200, bidFloor: 0.6, refreshInterval: 60 }
  ]);

  const handleBidderSave = (updatedConfig: BidderConfig) => {
    setBidders(bidders.map(bidder => 
      bidder.name === updatedConfig.name ? updatedConfig : bidder
    ));
  };

  const sections = [
    {
      title: "Bidder Configuration",
      content: (
        <div className="space-y-4">
          {bidders.map((bidder) => (
            <button
              key={bidder.name}
              onClick={() => setSelectedBidder(bidder)}
              className="w-full group bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 
                transition-colors duration-150 ease-in-out rounded-lg p-4 border border-gray-200 
                dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3">
                    <Settings2 className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {bidder.name}
                    </span>
                  </div>
                  <div className="mt-1 ml-8 space-y-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {bidder.enabled ? 'Enabled' : 'Disabled'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Floor: ${bidder.bidFloor?.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Timeout: {bidder.timeout}ms
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      )
    },
    {
      title: "Timeout Settings",
      content: (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Bid Timeout (ms)</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 shadow-sm 
              focus:border-indigo-500 focus:ring-indigo-500 
              dark:text-gray-100 sm:text-sm"
            defaultValue="1000"
          />
        </div>
      )
    },
    {
      title: "Price Floors",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Desktop Floor Price</label>
            <input
              type="number"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 shadow-sm 
                focus:border-indigo-500 focus:ring-indigo-500 
                dark:text-gray-100 sm:text-sm"
              defaultValue="1.20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Mobile Floor Price</label>
            <input
              type="number"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 shadow-sm 
                focus:border-indigo-500 focus:ring-indigo-500 
                dark:text-gray-100 sm:text-sm"
              defaultValue="0.80"
            />
          </div>
        </div>
      )
    },
    {
      title: "Analytics",
      content: (
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 dark:border-gray-600 
                text-indigo-600 shadow-sm 
                focus:border-indigo-500 focus:ring-indigo-500"
              defaultChecked
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-200">Enable detailed bid logging</span>
          </label>
        </div>
      )
    }
  ];

  return (
    <div className="py-6 min-h-screen pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 mb-6">
          <SettingsIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {sections.map((section) => (
            <div key={section.title} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
              <button
                className="w-full p-4 flex items-center justify-between text-left"
                onClick={() => setActiveMobileSection(
                  activeMobileSection === section.title ? null : section.title
                )}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{section.title}</h3>
                <ChevronRight
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    activeMobileSection === section.title ? 'rotate-90' : ''
                  }`}
                />
              </button>
              {activeMobileSection === section.title && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
            {sections.map((section) => (
              <div key={section.title} className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{section.title}</h3>
                {section.content}
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 mt-6 bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 md:relative md:bg-transparent md:border-0 md:p-0 md:mt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button className="w-full md:w-auto bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium 
              hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              transition-colors duration-200">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {selectedBidder && (
        <ConfigModal
          bidder={selectedBidder}
          isOpen={true}
          onClose={() => setSelectedBidder(null)}
          onSave={handleBidderSave}
        />
      )}
    </div>
  );
};