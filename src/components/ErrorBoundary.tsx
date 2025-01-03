import { Component, type ReactNode } from 'react';
import { Analytics } from '../services/analytics';

const analytics = new Analytics();

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(_error: Error) {
    analytics.trackEvent('error', {
      bidId: 'error',
      cpm: 0,
      adUnitCode: 'error-boundary',
      size: [0, 0]
    });
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          Something went wrong
        </div>
      );
    }

    return this.props.children;
  }
}