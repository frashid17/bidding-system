import { getFloorPrice } from '../services/floorPricing';
import { AdUnit } from '../types/prebid';

export const adUnits: AdUnit[] = [
  {
    code: 'div-gpt-ad-1234567890-0',
    mediaTypes: {
      banner: {
        sizes: [[300, 250], [300, 600]]
      }
    },
    floors: {
      currency: 'USD',
      schema: {
        fields: ['mediaType', 'size', 'domain']
      },
      values: {
        'banner|300x250|example.com': 1.20,
        'banner|300x600|example.com': 1.80
      }
    },
    bids: [
      {
        bidder: 'appnexus',
        params: {
          placementId: 13144370
        }
      },
      {
        bidder: 'rubicon',
        params: {
          accountId: '9999',
          siteId: '99999',
          zoneId: '999999'
        }
      },
      {
        bidder: 'openx',
        params: {
          unit: '123456789',
          delDomain: 'publisher-d.openx.net'
        }
      },
      {
        bidder: 'pubmatic',
        params: {
          publisherId: '123456',
          adSlot: '987654'
        }
      },
      {
        bidder: 'ix',
        params: {
          siteId: '123456'
        }
      }
    ],
    getFloorData: () => getFloorPrice('banner', [300, 250], window.location.hostname)
  }
];