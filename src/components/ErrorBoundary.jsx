import { Component } from 'react';
import { AlertCircle } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-red-50 dark:bg-black px-3 sm:px-4">
          <div className="text-center p-6 sm:p-8 bg-white dark:bg-black rounded-lg shadow-lg max-w-md border dark:border-gray-800">
            <AlertCircle className="w-12 sm:w-16 h-12 sm:h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 sm:px-6 rounded transition text-sm sm:text-base"
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
