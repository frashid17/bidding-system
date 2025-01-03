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
        <div className="
          w-full h-full 
          min-h-[50px] 
          xs:min-h-[80px]
          sm:min-h-[100px] 
          md:min-h-[150px] 
          lg:min-h-[200px]
          flex items-center justify-center 
          text-gray-400 
          p-2 xs:p-3 sm:p-4 md:p-6
          rounded-lg 
          bg-gray-50 dark:bg-gray-800
          text-xs xs:text-sm sm:text-base md:text-lg
          shadow-sm
          transition-all duration-300
        ">
          <span className="animate-pulse">Something went wrong</span>
        </div>
      );
    }

    return this.props.children;
  }
}