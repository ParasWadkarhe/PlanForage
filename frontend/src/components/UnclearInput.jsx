
import { AlertCircle } from 'lucide-react';

export default function UnclearInput({ data, onRetry, onBackToSearch, originalQuery = '' }) {


    return (
        <div className="min-h-[calc(100vh-100px)] py-2 bg-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">

                <div className="mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                            <AlertCircle className="h-8 w-8 text-amber-600" />
                        </div>
                    </div>
                    <h2 className="text-xl sm:text-2xl text-gray-900 font-medium mb-4">
                        Could you be more specific?
                    </h2>
                    <p className="text-gray-600 leading-relaxed max-w-xl mx-auto mb-2">
                        {data.message || "We couldn't generate a clear project plan from your input. Please provide more details about what you'd like to build, including the type of project, key features, or target audience."}
                    </p>
                    {originalQuery && (
                        <p className="text-sm text-gray-500 italic">
                            Your query: "{originalQuery}"
                        </p>
                    )}
                </div>


                {/* Back to search button */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => onBackToSearch(null)}
                        className="px-6 py-3 text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Back to Search
                    </button>

                </div>

                {/* Help Text */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500">
                        💡 Tip: Include details like technology preferences, project scope, timeline, or specific features you need
                    </p>
                </div>
            </div>
        </div>
    );
}