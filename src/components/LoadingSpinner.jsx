import { Loader } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-black px-3 sm:px-4">
      <div className="text-center">
        <Loader className="w-10 sm:w-12 h-10 sm:h-12 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
      </div>
    </div>
  );
};
