import React, { Component, ErrorInfo, ReactNode } from 'react';
import { analytics } from '../services/analytics';

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

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error) {
    analytics.trackError(error, 'ErrorBoundary: ' + errorInfo.componentStack);
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