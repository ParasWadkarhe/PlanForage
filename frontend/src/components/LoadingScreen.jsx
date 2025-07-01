import { Loader, Zap } from 'lucide-react';

export default function LoadingScreen() {
  
  return (
    <div className="min-h-[100svh] flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">

      {/* Loading Content */}
      <div className="text-center">
        
        {/* Spinner */}
        <div className="mb-6">
          <Loader className="w-12 h-12 mx-auto animate-spin text-purple-600 dark:text-purple-400" />
        </div>

        {/* Main Message */}
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-900 dark:text-white">
          Loading Server
        </h1>

        {/* Sub Message */}
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Please wait while the server loads...
        </p>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-1 mt-6">
          <div className="w-2 h-2 rounded-full animate-bounce bg-purple-600 dark:bg-purple-400" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full animate-bounce bg-purple-600 dark:bg-purple-400" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full animate-bounce bg-purple-600 dark:bg-purple-400" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Optional loading progress indicator */}
        <div className="mt-8 w-64 mx-auto">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-purple-600 dark:bg-purple-400 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Initializing components...
          </p>
        </div>
      </div>
    </div>
  );
}