import { useEffect, useRef } from 'react';
import { analytics } from '../services/analytics';

interface AdMetrics {
  impressions: number;
  clicks: number;
  viewability: number;
}

export const useAdTracking = (adUnitCode: string) => {
  const metrics = useRef<AdMetrics>({
    impressions: 0,
    clicks: 0,
    viewability: 0
  });

  useEffect(() => {
    const trackImpression = () => {
      metrics.current.impressions++;
      analytics.trackEvent('impression', { adUnitCode });
    };

    const trackClick = () => {
      metrics.current.clicks++;
      analytics.trackEvent('click', { adUnitCode });
    };

    // Set up intersection observer for viewability
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            metrics.current.viewability = entry.intersectionRatio;
            analytics.trackEvent('viewability', {
              adUnitCode,
              ratio: entry.intersectionRatio
            });
          }
        });
      },
      { threshold: [0, 0.5, 1] }
    );

    const adElement = document.getElementById(adUnitCode);
    if (adElement) {
      observer.observe(adElement);
      adElement.addEventListener('click', trackClick);
      trackImpression();
    }

    return () => {
      if (adElement) {
        observer.unobserve(adElement);
        adElement.removeEventListener('click', trackClick);
      }
    };
  }, [adUnitCode]);

  return metrics.current;
};