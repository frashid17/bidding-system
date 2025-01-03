import { BidResponse } from '../types/prebid';

interface AnalyticsEvent {
  type: 'bidRequested' | 'bidResponse' | 'bidTimeout' | 'bidWon' | 'error';
  data: any;
  timestamp: number;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private readonly BATCH_SIZE = 10;
  private readonly FLUSH_INTERVAL = 30000; // 30 seconds

  constructor() {
    this.setupPrebidAnalytics();
    this.setupFlushInterval();
  }

  private setupPrebidAnalytics(): void {
    window.pbjs.que.push(() => {
      window.pbjs.enableAnalytics({
        provider: 'custom',
        options: {
          handler: (event: any) => this.handlePrebidEvent(event)
        }
      });
    });
  }

  private setupFlushInterval(): void {
    setInterval(() => this.flushEvents(), this.FLUSH_INTERVAL);
  }

  private handlePrebidEvent(event: any): void {
    const analyticsEvent: AnalyticsEvent = {
      type: event.eventType,
      data: event,
      timestamp: Date.now()
    };

    this.events.push(analyticsEvent);
    
    if (this.events.length >= this.BATCH_SIZE) {
      this.flushEvents();
    }
  }

  private async flushEvents(): Promise<void> {
    if (this.events.length === 0) return;

    try {
      const eventsToSend = [...this.events];
      this.events = [];

      // In a real implementation, send to your analytics endpoint
      console.log('Sending analytics batch:', eventsToSend);
      
      // Example of sending to an analytics endpoint:
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(eventsToSend)
      // });
    } catch (error) {
      console.error('Failed to send analytics:', error);
      // Re-add failed events to be sent in next batch
      this.events.unshift(...this.events);
    }
  }

  public trackError(error: Error, context: string): void {
    this.events.push({
      type: 'error',
      data: {
        message: error.message,
        stack: error.stack,
        context
      },
      timestamp: Date.now()
    });
  }
}

export const analytics = new Analytics();