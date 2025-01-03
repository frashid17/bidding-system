import { GoogleAnalytics } from './ga';

class Analytics {
  private ga: GoogleAnalytics;

  constructor() {
    this.ga = new GoogleAnalytics();
  }

  trackBidRequest(bidder: string, adUnitCode: string) {
    this.ga.trackBidRequest(bidder, adUnitCode);
  }

  trackBidResponse(bidder: string, adUnitCode: string, cpm: number, timeToRespond: number) {
    this.ga.trackBidResponse(bidder, adUnitCode, cpm, timeToRespond);
  }

  trackBidTimeout(bidder: string, adUnitCode: string) {
    this.ga.trackBidTimeout(bidder, adUnitCode);
  }

  trackBidWon(bidder: string, adUnitCode: string, cpm: number) {
    this.ga.trackBidWon(bidder, adUnitCode, cpm);
  }

  trackImpressions(adUnitCode: string) {
    this.ga.trackImpressions(adUnitCode);
  }

  trackLatency(bidder: string, latency: number) {
    this.ga.trackLatency(bidder, latency);
  }
}

export const analytics = new Analytics();