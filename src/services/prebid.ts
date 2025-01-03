import { sspProviders } from './ssp';
import { BidRequest, BidResponse } from '../types/ssp';
import { errorTracker } from './errorTracking';

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
      errorTracker.trackError('sspError', `${provider.name} bid request failed`, { error });
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