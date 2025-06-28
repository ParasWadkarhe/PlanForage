import { AlertCircle, Search, Lightbulb } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

export default function UnclearInput({ originalQuery = '' }) {

    const {setProjectData, projectData} = useContext(AppContext)


    return (
        <div className="min-h-[calc(100vh-64px)] py-8 bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Main Error Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-8 text-center mb-6">
                    <div className="mb-6">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-2xl flex items-center justify-center">
                                <AlertCircle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Could not generate project proposal
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto mb-4">
                            {projectData.message || "We couldn't generate a clear project plan from your input. Please provide more details about what you'd like to build, including the type of project, key features, or target audience."}
                        </p>
                        {originalQuery && (
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your query:</p>
                                <p className="text-gray-700 dark:text-gray-300 font-medium">"{originalQuery}"</p>
                            </div>
                        )}
                    </div>

                    {/* Back to search button */}
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={() => setProjectData(null)}
                            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-lg hover:shadow-xl"
                        >
                            <Search size={18} />
                            <span className="font-medium">Back to Search</span>
                        </button>
                    </div>
                </div>

                {/* Tips Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Tips for better results
                        </h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    <span className="font-medium text-gray-900 dark:text-white">Project type:</span> Web app, mobile app, desktop software, etc.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    <span className="font-medium text-gray-900 dark:text-white">Key features:</span> What should your project do?
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    <span className="font-medium text-gray-900 dark:text-white">Target audience:</span> Who will use this project?
                                </p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    <span className="font-medium text-gray-900 dark:text-white">Technology:</span> Preferred programming languages or frameworks
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    <span className="font-medium text-gray-900 dark:text-white">Timeline:</span> How long should the project take?
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    <span className="font-medium text-gray-900 dark:text-white">Budget range:</span> What's your estimated budget?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}