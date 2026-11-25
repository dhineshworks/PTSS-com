import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AssetImage } from '@/components/AssetImage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-sky flex items-center justify-center p-4 text-center">
          <div className="cream-card max-w-md w-full p-8 border-4 border-coral shadow-2xl space-y-4">
            <div className="w-28 h-28 mx-auto animate-bounce">
              <AssetImage assetKey="mascot-owl" className="w-full h-full object-contain" />
            </div>
            <h2 className="font-heading text-3xl text-deep-teal">Oops, a Jungle Bump!</h2>
            <p className="text-sm text-deep-teal/80 font-bold">
              Don’t worry, everything is safe! Let’s hop back to the island.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.href = '/home';
              }}
              className="w-full py-3 bg-leaf text-white font-heading text-lg rounded-2xl shadow-candy-sm"
            >
              Restart Adventure
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
