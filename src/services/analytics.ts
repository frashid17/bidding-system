interface BidDetails {
  bidId: string;
  cpm: number;
  adUnitCode: string;
  size: [number, number];
}

interface AnalyticsEvent {
  type: string;
  data: BidDetails;
  timestamp: number;
}

export class Analytics {
  private events: AnalyticsEvent[] = [];
  
  trackEvent(type: string, data: BidDetails): void {
    this.events.push({
      type,
      data,
      timestamp: Date.now()
    });
  }
  
  processEvents(callback: (events: AnalyticsEvent[]) => void): void {
    if (this.events.length > 0) {
      callback(this.events);
      this.events = []; // Clear processed events
    }
  }

  // Optional: method to get current events
  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }
}