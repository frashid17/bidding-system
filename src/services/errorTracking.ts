interface ErrorEvent {
  type: 'bidError' | 'timeout' | 'invalidBid';
  message: string;
  timestamp: number;
  details?: any;
}

class ErrorTracker {
  private errors: ErrorEvent[] = [];
  private readonly MAX_ERRORS = 100;

  trackError(type: ErrorEvent['type'], message: string, details?: any) {
    const error: ErrorEvent = {
      type,
      message,
      timestamp: Date.now(),
      details
    };

    this.errors.push(error);
    
    // Keep only the latest errors
    if (this.errors.length > this.MAX_ERRORS) {
      this.errors = this.errors.slice(-this.MAX_ERRORS);
    }

    // Log to monitoring service
    console.error(`[${type}] ${message}`, details);
  }

  getRecentErrors(): ErrorEvent[] {
    return [...this.errors].reverse();
  }
}
export const errorTracker = new ErrorTracker();
