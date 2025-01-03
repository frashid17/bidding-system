import React, { useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { useAdTracking } from '../hooks/useAdTracking';
import { AdUnit } from '../types/prebid';
import { requestBids } from '../services/prebid';
import { errorTracker } from '../services/errorTracking';
import { getFallbackAd } from '../services/fallbackAds';
import { validateBid } from '../services/bidValidation';
import { ErrorBoundary } from './ErrorBoundary';

interface AdvertisementProps {
  adUnit: AdUnit;
}

export const Advertisement: React.FC<AdvertisementProps> = ({ adUnit }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(adRef);
  const { timeoutId } = useAnalytics();
  
  useEffect(() => {
    if (!isInView) return;

    const timeoutId: number;
    
    const loadAd = async () => {
      try {
        const bids = await requestBids([adUnit]);
        
        // Validate bids
        const validBids = bids.filter(validateBid);
        if (validBids.length === 0) {
          throw new Error('No valid bids received');
        }

        window.googletag.cmd.push(() => {
          window.googletag.display(adUnit.code);
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        errorTracker.trackError('bidError', errorMessage, { adUnit: adUnit.code });
        
        // Load fallback ad
        const fallbackAd = getFallbackAd(`${adUnit.mediaTypes.banner.sizes[0][0]}x${adUnit.mediaTypes.banner.sizes[0][1]}`);
        if (fallbackAd && adRef.current) {
          adRef.current.innerHTML = fallbackAd.html;
        }
      }
    };

    // Set timeout for bid requests
    timeoutId = setTimeout(() => {
      errorTracker.trackError('timeout', 'Bid request timeout', { adUnit: adUnit.code });
      const fallbackAd = getFallbackAd(`${adUnit.mediaTypes.banner.sizes[0][0]}x${adUnit.mediaTypes.banner.sizes[0][1]}`);
      if (fallbackAd && adRef.current) {
        adRef.current.innerHTML = fallbackAd.html;
      }
    }, 3000); // 3 second timeout

    loadAd();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isInView, adUnit]);

  return (
    <ErrorBoundary>
      <div 
        ref={adRef}
        id={adUnit.code}
        className="w-full min-h-[250px] bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm"
      />
    </ErrorBoundary>
  );
};