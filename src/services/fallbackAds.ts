import { AdUnit } from '../types/prebid';

interface FallbackAd {
  id: string;
  html: string;
  size: [number, number];
}

const fallbackAds: Record<string, FallbackAd[]> = {
  '300x250': [
    {
      id: 'house-ad-1',
      html: '<div class="house-ad">Your House Ad Here</div>',
      size: [300, 250]
    }
  ],
  // Add more sizes as needed
};

export const getFallbackAd = (size: string): FallbackAd | null => {
  const ads = fallbackAds[size];
  if (!ads?.length) return null;
  
  // Randomly select a fallback ad
  return ads[Math.floor(Math.random() * ads.length)];
};