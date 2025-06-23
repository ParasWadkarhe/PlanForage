
import { Loader } from 'lucide-react';

export default function LoadingScreen() {
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      {/* Loading Content */}
      <div className="text-center">
        {/* Spinner */}
        <div className="mb-6">
          <Loader className="w-12 h-12 mx-auto animate-spin text-blue-600 dark:text-blue-400" />
        </div>

        {/* Main Message */}
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-900 dark:text-white">
          Loading Server
        </h1>

        {/* Sub Message */}
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
          Please wait while the server loads...
        </p>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-1 mt-6">
          <div className="w-2 h-2 rounded-full animate-bounce bg-blue-600 dark:bg-blue-400" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full animate-bounce bg-blue-600 dark:bg-blue-400" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full animate-bounce bg-blue-600 dark:bg-blue-400" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}