import { errorTracker } from '../errorTracking';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export class GoogleAnalytics {
  private readonly GA_MEASUREMENT_ID = 'G-WZXR5HVWF4'; 

  constructor() {
    this.initializeGA();
  }

  private initializeGA() {
    try {
      // Load GA4 script
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', this.GA_MEASUREMENT_ID);
    } catch (error) {
      errorTracker.trackError('bidError', 'Failed to initialize GA', { error });
    }
  }

  trackBidRequest(bidder: string, adUnitCode: string) {
    window.gtag('event', 'bid_request', {
      bidder,
      ad_unit: adUnitCode,
      event_category: 'Header Bidding',
      non_interaction: true
    });
  }

  trackBidResponse(bidder: string, adUnitCode: string, cpm: number, timeToRespond: number) {
    window.gtag('event', 'bid_response', {
      bidder,
      ad_unit: adUnitCode,
      cpm,
      latency: timeToRespond,
      event_category: 'Header Bidding'
    });
  }

  trackBidTimeout(bidder: string, adUnitCode: string) {
    window.gtag('event', 'bid_timeout', {
      bidder,
      ad_unit: adUnitCode,
      event_category: 'Header Bidding'
    });
  }

  trackBidWon(bidder: string, adUnitCode: string, cpm: number) {
    window.gtag('event', 'bid_won', {
      bidder,
      ad_unit: adUnitCode,
      cpm,
      event_category: 'Header Bidding'
    });
  }

  trackImpressions(adUnitCode: string) {
    window.gtag('event', 'impression', {
      ad_unit: adUnitCode,
      event_category: 'Header Bidding'
    });
  }

  trackLatency(bidder: string, latency: number) {
    window.gtag('event', 'bidder_latency', {
      bidder,
      latency,
      event_category: 'Header Bidding',
      non_interaction: true
    });
  }
}