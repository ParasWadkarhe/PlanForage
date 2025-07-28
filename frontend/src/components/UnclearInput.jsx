
import { AlertCircle } from 'lucide-react';

export default function UnclearInput({ data, onBackToSearch, originalQuery = '' }) {


    return (
    <div className="min-h-[calc(100vh-64px)] py-2 bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-6 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">

            <div className="mb-8">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
                        <AlertCircle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                    </div>
                </div>
                <h2 className="text-xl sm:text-2xl text-gray-900 dark:text-gray-100 font-medium mb-4">
                    Could not generate project proposal
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto mb-2">
                    {data.message || "We couldn't generate a clear project plan from your input. Please provide more details about what you'd like to build, including the type of project, key features, or target audience."}
                </p>
                {originalQuery && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        Your query: {"{"}{originalQuery}{"}"}
                    </p>
                )}
            </div>


            {/* Back to search button */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                    onClick={() => onBackToSearch(null)}
                    className="px-6 py-3 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 border border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                    Back to Search
                </button>

            </div>

            {/* Help Text */}
            <div className="mt-8 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    💡 Tip: Include details like technology preferences, project scope, timeline, or specific features you need
                </p>
            </div>
        </div>
    </div>
);
}