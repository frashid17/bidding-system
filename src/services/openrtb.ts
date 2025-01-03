import { BidRequest } from '../types/ssp';

export const createOpenRTBRequest = (request: BidRequest) => {
  return {
    id: request.id,
    imp: [{
      id: request.adUnitCode,
      banner: {
        w: request.sizes[0][0],
        h: request.sizes[0][1],
        format: request.sizes.map(([w, h]) => ({ w, h }))
      },
      bidfloor: request.floor,
      bidfloorcur: 'USD'
    }],
    site: {
      id: request.siteId,
      domain: window.location.hostname,
      page: window.location.href,
      ref: document.referrer
    },
    device: {
      ua: navigator.userAgent,
      ip: '127.0.0.1', // Will be set by SSP
      language: navigator.language
    },
    user: {
      id: request.userId
    },
    at: 1, // First price auction
    tmax: request.timeout,
    cur: ['USD']
  };
};