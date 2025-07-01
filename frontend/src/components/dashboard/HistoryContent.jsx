import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Trash2, Loader2, History, Search, Filter, X, Calendar, Pencil } from "lucide-react";

import { AuthContext } from "../../firebase/AuthContext";
import { AppContext } from "../../context/AppContext";

const HistoryContent = () => {
    const [searchHistory, setSearchHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [dateFilter, setDateFilter] = useState("");
    const [budgetFilter, setBudgetFilter] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const { user } = useContext(AuthContext)
    const { setProjectData, setActiveTab, setSearchData } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(false)
    const [deletingItemId, setDeletingItemId] = useState(null);

    useEffect(() => {
        // Trigger load animation
        setTimeout(() => setIsLoaded(true), 50);
    }, []);

    const handleViewHistory = async (searchData) => {
        setIsLoading(true)
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
            setProjectData(response.data)
            setActiveTab('search')
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteHistory = async (itemId) => {
        try {
            setDeletingItemId(itemId);
            
            const idToken = await user.getIdToken();
            const response = await axios.delete(
                import.meta.env.VITE_BACKEND_URL + '/proposal/' + itemId,
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            if(!response.data.error) {
                setSearchHistory(prevHistory => prevHistory.filter(item => item._id !== itemId));
                console.error('Failed to delete search history');
            }
        } catch (error) {
            console.error('Error deleting search history:', error);
        } finally {
            setDeletingItemId(null);
        }
    };

    // Filter and search functionality
    useEffect(() => {
        let filtered = searchHistory;

        // Apply search query filter
        if (searchQuery.trim()) {
            filtered = filtered.filter(item =>
                item.search_string?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.location?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply date filter
        if (dateFilter) {
            const filterDate = new Date(dateFilter);
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate.toDateString() === filterDate.toDateString();
            });
        }

        // Apply budget filter
        if (budgetFilter) {
            const budgetRange = budgetFilter.split('-');
            if (budgetRange.length === 2) {
                const minBudget = parseInt(budgetRange[0]);
                const maxBudget = parseInt(budgetRange[1]);
                filtered = filtered.filter(item => {
                    const itemBudget = typeof item.budget === 'number' ? item.budget : parseInt(item.budget) || 0;
                    return itemBudget >= minBudget && itemBudget <= maxBudget;
                });
            }
        }

        setFilteredHistory(filtered);
    }, [searchHistory, searchQuery, dateFilter, budgetFilter]);

    // show search history with Firebase auth token
    useEffect(() => {
        if (!user) return;

        (async () => {
            try {
                const idToken = await user.getIdToken();
                const response = await axios.get(
                    import.meta.env.VITE_BACKEND_URL + '/search-history',
                    {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                            "Content-Type": "application/json"
                        }
                    }
                );
                setSearchHistory(response.data.proposals || []);
            } catch (error) {
                console.error('Error fetching search history:', error);
            }
        })();

        return () => { };
    }, [user]);

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (error) {
            return dateString;
        }
    };

    const formatBudget = (budget) => {
        if (!budget) return 'Not specified';
        // Add currency formatting if needed
        return typeof budget === 'number' ? `$${budget.toLocaleString()}` : budget;
    };

    const clearFilters = () => {
        setSearchQuery("");
        setDateFilter("");
        setBudgetFilter("");
        setShowFilters(false);
    };

    // Loading Screen Component
    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-12 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500">
                    <div className="text-center">
                        <div className="mb-6">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mx-auto transition-all duration-300 hover:bg-purple-200 dark:hover:bg-purple-800 hover:scale-[1.01] hover:rotate-3">
                                <Loader2 className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-spin" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                            Loading Project Proposal
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-6 transition-colors duration-300">
                            We're generating your project proposal. This may take a few moments...
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
            <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                <h2 className={`text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    Search History
                </h2>

                {/* Search Bar and Filter Button */}
                <div className={`mb-6 transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex gap-3">
                        <div className={`flex-1 relative transition-all duration-200 hover:scale-[1.01] hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 group ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-all duration-200 group-hover:text-purple-500 dark:group-hover:text-purple-400" />
                            <input
                                type="text"
                                placeholder="Search history..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-purple-200 dark:border-purple-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-600"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-95 hover:-translate-y-1 hover:shadow-md group ${showFilters
                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                : 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                                } ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                        >
                            <Filter className="h-4 w-4 transition-transform duration-200 group-hover:scale-[1.01]" />
                            <span className="hidden sm:inline">Filters</span>
                        </button>
                    </div>

                    {(searchQuery || dateFilter || budgetFilter) && (
                        <div className={`mt-3 flex justify-end transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-95 group"
                            >
                                <X className="h-3 w-3 transition-transform duration-200 group-hover:rotate-90" />
                                <span>Clear All</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Filter Options */}
                {showFilters && (
                    <div className={`mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className={`transition-all duration-200 hover:scale-[1.01] hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 group ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                                    Filter by Date
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-all duration-200 group-hover:text-purple-500 dark:group-hover:text-purple-400" />
                                    <input
                                        type="date"
                                        value={dateFilter}
                                        onChange={(e) => setDateFilter(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-purple-200 dark:border-purple-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-600"
                                    />
                                </div>
                            </div>
                            <div className={`transition-all duration-200 hover:scale-[1.01] hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 group ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                                    Filter by Budget Range
                                </label>
                                <select
                                    value={budgetFilter}
                                    onChange={(e) => setBudgetFilter(e.target.value)}
                                    className="w-full px-3 py-2 border border-purple-200 dark:border-purple-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-600"
                                >
                                    <option value="">All Budgets</option>
                                    <option value="0-1000">$0 - $1,000</option>
                                    <option value="1000-5000">$1,000 - $5,000</option>
                                    <option value="5000-10000">$5,000 - $10,000</option>
                                    <option value="10000-50000">$10,000 - $50,000</option>
                                    <option value="50000-999999999">$50,000+</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {filteredHistory.length === 0 ? (
                    <div className={`text-center py-8 transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <p className="text-gray-600 dark:text-gray-400">
                            {searchHistory.length === 0 ? "No search history found." : "No results match your search criteria."}
                        </p>
                    </div>
                ) : (
                    <div className={`space-y-4 transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {filteredHistory.map((item, index) => (
                            <div
                                key={item._id || index}
                                className={`flex items-center gap-3 justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 cursor-pointer hover:scale-[1.01] hover:-translate-y-1 hover:shadow-md hover:shadow-purple-500/20 group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${deletingItemId === item._id ? 'opacity-50' : ''}`}
                                style={{ transitionDelay: `${100 + index * 100}ms` }}
                                onClick={() => handleViewHistory(item)}
                            >
                                <div className="w-10 h-10  bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                    <History className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>

                                <div className="flex-1">
                                    <p className="text-gray-900 dark:text-white font-medium mb-1 transition-colors duration-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                                        {item.search_string || 'No search query'}
                                    </p>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                                        <span>{formatDate(item.date)}</span>
                                        {item.budget && (
                                            <span>Budget: {formatBudget(item.budget)}</span>
                                        )}
                                        {item.location && (
                                            <span>Location: {item.location}</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSearchData(item)
                                                setProjectData(null)
                                                setActiveTab('search')
                                            }}
                                            className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-95 group"
                                            title="Edit"
                                        >
                                            <Pencil size={18} className="transition-transform duration-200 group-hover:rotate-12" />
                                        </button>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering handleViewHistory
                                                handleDeleteHistory(item._id);
                                            }}
                                            disabled={deletingItemId === item._id}
                                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg group disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 hover:scale-[1.01] active:scale-95"
                                            title={deletingItemId === item._id ? "Deleting..." : "Delete"}
                                        >
                                            {deletingItemId === item._id ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-red-600 dark:border-red-400 border-t-transparent rounded-full animate-spin"></div>
                                                    <span className="text-xs">Deleting...</span>
                                                </>
                                            ) : (
                                                <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryContent;