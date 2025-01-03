import { BidResponse } from '../types/prebid';

export const validateBid = (bid: BidResponse): boolean => {
  if (!bid || typeof bid !== 'object') return false;

  // Price validation
  if (typeof bid.cpm !== 'number' || bid.cpm <= 0) return false;

  // Domain validation
  if (!bid.meta?.advertiserDomains?.length) return false;

  // Creative validation
  if (!bid.ad && !bid.vastXml) return false;

  // Size validation
  if (!bid.width || !bid.height) return false;

  return true;
};