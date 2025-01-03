import { sspProviders } from './ssp';
import { BidResponse, SSPProvider } from '../types/ssp';
import { errorTracker } from './errorTracking';

// Add interface for SSP providers that support initialization
interface SSPProviderWithInit extends SSPProvider {
  initialize(config: PrebidConfig): void;
}

// Module-level config
let prebidConfig: PrebidConfig = {
  siteId: 'your-site-id',
  timeout: 1000
};

export const requestBids = async (adUnits: any[]): Promise<BidResponse[]> => {
  const bidRequests = adUnits.map(unit => ({
    id: crypto.randomUUID(),
    adUnitCode: unit.code,
    sizes: unit.mediaTypes.banner.sizes,
    floor: unit.getFloorData()?.floor || 0,
    timeout: 1000,
    siteId: 'your-site-id',
    userId: 'anonymous' // Replace with actual user ID if available
  }));

  const bidPromises = Object.values(sspProviders).map(async provider => {
    try {
      return await provider.requestBids(bidRequests[0]); // Assuming single ad unit for now
    } catch (error) {
      errorTracker.trackError('bidError', `${provider.name} bid request failed`, { error });
      return [];
    }
  });

  const results = await Promise.allSettled(bidPromises);
  const validBids = results
    .filter((result): result is PromiseFulfilledResult<BidResponse[]> => 
      result.status === 'fulfilled'
    )
    .flatMap(result => result.value);

  return validBids;
};

export interface PrebidConfig {
  siteId?: string;
  timeout?: number;
}

export const initializePrebid = (config: PrebidConfig) => {
  // Set default values if not provided
  const defaultConfig = {
    siteId: 'your-site-id',
    timeout: 1000
  };

  // Merge provided config with defaults
  prebidConfig = {
    ...defaultConfig,
    ...config
  };

  // Initialize SSP providers that support initialization
  Object.values(sspProviders).forEach(provider => {
    if ('initialize' in provider) {
      (provider as SSPProviderWithInit).initialize(prebidConfig);
    }
  });
};