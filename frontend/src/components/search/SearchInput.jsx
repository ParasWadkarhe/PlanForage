import { useState, useEffect, useContext } from 'react';
import { Search, ArrowRight, MapPin, DollarSign, Loader2, Zap, TrendingUp, FileText, Clock, RotateCcw } from 'lucide-react';
import axios from 'axios'
import { AuthContext } from '../../firebase/AuthContext';
import { AppContext } from '../../context/AppContext';


export default function SearchPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const { user } = useContext(AuthContext)
    const { setProjectData, searchData, setSearchData } = useContext(AppContext)

    useEffect(() => {
        // Trigger load animation
        setTimeout(() => setIsLoaded(true), 100);
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchData) {
            console.error('Problem searching. Search Data is null')
            return
        }

        if (searchData.search_string.trim() && !isLoading) {
            setIsLoading(true);
            try {
                const idToken = await user.getIdToken();
                const response = await axios.post(
                    import.meta.env.VITE_BACKEND_URL + '/query',
                    {
                        search_string: searchData?.search_string,
                        location: searchData?.location,
                        budget: searchData?.budget,
                        _id: searchData?._id || null
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                            "Content-Type": "application/json"
                        }
                    }
                );
                setProjectData(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSearchDataChange = (e) => {
        setSearchData(prev => {
            const temp = {
                ...prev,
                [e.target.name]: e.target.value
            }
            delete temp._id
            return temp
        })
    };

    // Loading Screen Component
    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-12 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-250">
                    <div className="text-center">
                        <div className="mb-6">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mx-auto transition-all duration-150 hover:bg-purple-200 dark:hover:bg-purple-800 hover:scale-110 hover:rotate-3">
                                <Loader2 className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-spin" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-150">
                            Analyzing Your Project
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-6 transition-colors duration-150">
                            Our AI is processing your request and generating a comprehensive project plan.
                            This may take a few moments...
                        </p>
                        <div className="flex justify-center space-x-2">
                            <div className="w-3 h-3 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce"></div>
                            <div className="w-3 h-3 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce" ></div>
                            <div className="w-3 h-3 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce" ></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-250 hover:-translate-y-1 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center transition-all duration-150 hover:bg-purple-200 dark:hover:bg-purple-800 hover:scale-110 hover:rotate-3 ${isLoaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'}`}>
                        <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400 transition-all duration-75" />
                    </div>
                    <div className={`transition-all duration-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                        <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400 transition-all duration-150 hover:scale-105">
                            PlanForage
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-150">
                            Discover and Plan Your Next Project
                        </p>
                    </div>
                </div>

                <p className={`text-gray-600 dark:text-gray-300 leading-relaxed transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    Get comprehensive project plans, technology recommendations, timeline estimates,
                    and resource requirements tailored to your needs. Start your journey with intelligent
                    project planning.
                </p>
            </div>

            {/* Search Form */}
            <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-250 hover:-translate-y-1 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                <h2 className={`text-xl font-bold text-gray-900 dark:text-white mb-6 transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    Start Your Search
                </h2>

                <div className="space-y-6">
                    {/* Main Search Input */}
                    <div className={`transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-150">
                            Project Description
                        </label>
                        <div className="relative transition-all duration-150 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-all duration-100 group-hover:text-purple-500 dark:group-hover:text-purple-400" />
                            </div>
                            <input
                                type="text"
                                name='search_string'
                                value={searchData.search_string}
                                onChange={handleSearchDataChange}
                                placeholder="Describe your project idea..."
                                className="block w-full pl-12 pr-4 py-4 border border-purple-200 dark:border-purple-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-600"
                                required
                            />
                        </div>
                    </div>

                    {/* Location and Budget Grid */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {/* Location Input */}
                        <div className={`transition-all duration-150 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 group ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                                Location
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-all duration-100 group-hover:text-purple-500 dark:group-hover:text-purple-400" />
                                </div>
                                <input
                                    type="text"
                                    name='location'
                                    value={searchData.location}
                                    onChange={handleSearchDataChange}
                                    placeholder="Enter location"
                                    className="block w-full pl-12 pr-4 py-4 border border-purple-200 dark:border-purple-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-600"
                                />
                            </div>
                        </div>

                        {/* Budget Input */}
                        <div className={`transition-all duration-150 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 group ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-150">
                                Budget (USD)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <DollarSign className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-all duration-100 group-hover:text-purple-500 dark:group-hover:text-purple-400" />
                                </div>
                                <input
                                    type="number"
                                    name='budget'
                                    value={searchData.budget || ''}
                                    onChange={handleSearchDataChange}
                                    placeholder="Enter budget"
                                    className="block w-full pl-12 pr-4 py-4 border border-purple-200 dark:border-purple-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Search and Reset Buttons */}
                    <div className={`flex justify-end gap-3 transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <button
                            type="button"
                            className="flex items-center gap-2 px-6 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-100 hover:scale-105 active:scale-95 hover:-translate-y-1 hover:shadow-md group"
                            onClick={() => {
                                setSearchData({
                                    search_string: '',
                                    location: '',
                                    budget: '',
                                    _id: ''
                                })
                            }}
                        >
                            <RotateCcw className="w-5 h-5 transition-transform duration-100 group-hover:rotate-180" />
                            Reset
                        </button>
                        <button
                            type="submit"
                            disabled={!searchData.search_string.trim() || isLoading}
                            className="flex items-center gap-2 px-8 py-4 bg-purple-600 dark:bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 dark:hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-100 hover:scale-105 active:scale-95 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/50 group"
                            onClick={handleSearch}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Search className="w-5 h-5 transition-transform duration-100 group-hover:scale-110" />
                            )}
                            {isLoading ? 'Searching...' : 'Search Projects'}
                            {!isLoading && <ArrowRight className="w-5 h-5 transition-transform duration-100 group-hover:translate-x-1" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Popular Searches */}
            <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-250 hover:-translate-y-1 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    Try Searching For
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        {
                            display_string: 'Analytics Dashboard',
                            search_string: 'Analytics dashboard for E-commerce website',
                            description: 'Dashboard for website analytics and monitoring'
                        },
                        {
                            display_string: 'Mobile App',
                            search_string: 'Mobile app for video conferencing',
                            description: 'Android & iOS app developement'
                        },
                        {
                            display_string: 'Project management tool',
                            search_string: 'Project management tool with AI task prioritization',
                            description: 'Tools to collaborate and organize teams'
                        }
                    ].map((item, index) => {
                        return (
                            <button
                                key={index}
                                onClick={() => setSearchData(prev => ({ ...prev, search_string: item.search_string }))}
                                className={`p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-200 dark:hover:border-purple-700 border border-transparent transition-all duration-100 text-left hover:scale-105 hover:-translate-y-1 hover:shadow-md group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${100 + index * 100}ms` }}
                            >
                                <p className="text-gray-900 dark:text-white font-medium transition-colors duration-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">{item.display_string}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-100">{item.description}</p>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}