import React, { useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { AdUnit } from '../types/prebid';
import { requestBids } from '../services/prebid';
import { errorTracker } from '../services/errorTracking';
import { getFallbackAd } from '../services/fallbackAds';
import { validateBid } from '../services/bidValidation';
import { ErrorBoundary } from './ErrorBoundary';


declare global {
  interface Window {
    googletag: {
      cmd: Array<() => void>;
      display: (id: string) => void;
    };
  }
}

interface AdvertisementProps {
  adUnit: AdUnit;
}

export const Advertisement: React.FC<AdvertisementProps> = ({ adUnit }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(adRef);
  
  useEffect(() => {
    if (!isInView) return;

    const timeoutId = setTimeout(() => {
      errorTracker.trackError('timeout', 'Bid request timeout', { adUnit: adUnit.code });
      const fallbackAd = getFallbackAd(`${adUnit.mediaTypes.banner.sizes[0][0]}x${adUnit.mediaTypes.banner.sizes[0][1]}`);
      if (fallbackAd && adRef.current) {
        adRef.current.innerHTML = fallbackAd.html;
      }
    }, 3000);

    const loadAd = async () => {
      try {
        const bids = await requestBids([adUnit]);
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
        
        const fallbackAd = getFallbackAd(`${adUnit.mediaTypes.banner.sizes[0][0]}x${adUnit.mediaTypes.banner.sizes[0][1]}`);
        if (fallbackAd && adRef.current) {
          adRef.current.innerHTML = fallbackAd.html;
        }
      }
    };

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
        className="
          w-full mx-auto
          min-h-[50px] max-w-[300px]
          xs:min-h-[90px] xs:max-w-[320px]
          sm:min-h-[250px] sm:max-w-[468px]
          md:min-h-[90px] md:max-w-[728px]
          lg:min-h-[250px] lg:max-w-[970px]
          xl:max-w-[1200px]
          bg-gray-100 dark:bg-gray-800 
          rounded-lg shadow-sm 
          overflow-hidden
          transition-all duration-300 ease-in-out
          hover:shadow-md
          relative
          flex items-center justify-center
        "
        style={{
          aspectRatio: `${adUnit.mediaTypes.banner.sizes[0][0]} / ${adUnit.mediaTypes.banner.sizes[0][1]}`
        }}
      />
    </ErrorBoundary>
  );
};