import { SSPProvider, BidRequest, BidResponse } from '../../../types/ssp';
import { createOpenRTBRequest } from '../../openrtb';

export class PubMaticSSP implements SSPProvider {
  readonly name = 'PubMatic';
  readonly endpoint = 'https://hbopenbid.pubmatic.com/translator?source=prebid-server';

  async requestBids(request: BidRequest): Promise<BidResponse[]> {
    const openRTBRequest = createOpenRTBRequest(request);
    
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(openRTBRequest)
      });

      if (!response.ok) {
        throw new Error(`PubMatic bid request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return this.transformResponse(data);
    } catch (error) {
      console.error('PubMatic bid error:', error);
      return [];
    }
  }

  private transformResponse(response: any): BidResponse[] {
    if (!response.seatbid?.[0]?.bid) return [];

    return response.seatbid[0].bid.map(bid => ({
      bidder: this.name,
      cpm: bid.price,
      currency: response.cur || 'USD',
      width: bid.w,
      height: bid.h,
      ad: bid.adm,
      meta: {
        advertiserDomains: bid.adomain || [],
        mediaType: 'banner'
      }
    }));
  }
} 