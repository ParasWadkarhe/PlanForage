import { useState, useEffect, useRef, useContext } from 'react';
import { Search, ArrowRight, MapPin, DollarSign, Loader2, X } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { use } from 'react';

export default function SearchPage({ searchHandler }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('Anywhere');
    const [budget, setBudget] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchHistory, setSearchHistory] = useState([])
    const searchHistoryId = useRef(null);
    const { userInfo } = useContext(AuthContext)

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery.trim() && !isLoading) {
            setIsLoading(true);
            try {
                const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/query', {
                    query: searchQuery,
                    location: location,
                    budget: budget,
                    uid: userInfo?.sub,
                    _id: searchHistoryId.current || null
                });
                searchHandler(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setIsLoading(false);

            }
        }
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleBudgetChange = (e) => {
        setBudget(e.target.value);
    };

    const handleDeleteHistory = async (itemId) => {
        try {
            setSearchHistory(prevHistory => prevHistory.filter(item => item._id !== itemId));

            axios.delete(import.meta.env.VITE_BACKEND_URL + '/delete-proposal/' + itemId)
                .then()
                .catch(error => {
                    console.error('Error deleting search history:', error);
                });
        } catch (error) {
            console.error('Error deleting search history:', error);
        }
    };

    useEffect(() => {
        if(!userInfo) return;

        axios.get(import.meta.env.VITE_BACKEND_URL + '/search-history/' + userInfo?.sub)
            .then(response => {
                setSearchHistory(response.data.proposals || []);
            })
            .catch(error => {
                console.error('Error fetching search history:', error);
            });

        return () => {

        }
    }, [userInfo]);


    // Loading Screen Component
    if (isLoading) {
   return (
       <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-6 lg:px-8">
           <div className="text-center">
               <div className="mb-6">
                   <Loader2 className="h-12 w-12 text-blue-600 dark:text-blue-400 animate-spin mx-auto" />
               </div>
               <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                   Analyzing Your Project
               </h2>
               <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                   Our AI is processing your request and generating a comprehensive project plan.
                   This may take a few moments...
               </p>
               <div className="mt-6">
                   <div className="flex justify-center space-x-1">
                       <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></div>
                       <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                       <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                   </div>
               </div>
           </div>
       </div>
   );
}

return (
   <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-6 lg:px-8">
       <div className="max-w-2xl mx-auto text-center">
           {/* Brand Name */}
           <div className="mb-8">
               <h1 className="text-4xl sm:text-5xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                   PlanForage
               </h1>
               <div className="w-16 h-0.5 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
           </div>

           {/* Intro Text */}
           <div className="mb-12">
               <h2 className="text-xl sm:text-2xl text-gray-900 dark:text-white font-medium mb-4">
                   Discover and Plan Your Next Project
               </h2>
               <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto">
                   Get comprehensive project plans, technology recommendations, timeline estimates,
                   and resource requirements tailored to your needs. Start your journey with intelligent
                   project planning.
               </p>
           </div>

           {/* Location and Budget Inputs */}
           <div className="mb-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                   {/* Location Input */}
                   <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                       </div>
                       <input
                           type="text"
                           value={location}
                           onChange={handleLocationChange}
                           placeholder="Location"
                           className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                       />
                   </div>

                   {/* Budget Input */}
                   <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <DollarSign className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                       </div>
                       <input
                           type="number"
                           value={budget}
                           onChange={handleBudgetChange}
                           placeholder="Budget (USD)"
                           className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                       />
                   </div>
               </div>
           </div>

           {/* Search Bar */}
           <div className="mb-8">
               <div className="relative max-w-lg mx-auto">
                   <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                           <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                       </div>
                       <input
                           type="text"
                           value={searchQuery}
                           onChange={handleInputChange}
                           onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                           placeholder="Describe your project idea..."
                           className="block w-full pl-12 pr-12 py-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                       />
                       <button
                           onClick={handleSearch}
                           className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                           disabled={!searchQuery.trim() || isLoading}
                       >
                           {isLoading ? (
                               <Loader2 className="h-5 w-5 animate-spin" />
                           ) : (
                               <ArrowRight className={`h-5 w-5 ${!searchQuery.trim() ? 'opacity-50' : ''}`} />
                           )}
                       </button>
                   </div>
               </div>
           </div>

           {/* Search History */}
           {searchHistory.length > 0 && (
               <div className="mb-8 max-w-lg mx-auto">
                   <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-4">Your Previous Searches:</h3>
                   <div className="flex flex-wrap gap-2">
                       {searchHistory.map((item) => (
                           <div key={item._id} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
                               <button
                                   onClick={() => {
                                       setSearchQuery(item.search_string)
                                       searchHistoryId.current = item._id;
                                   }}
                                   className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200"
                               >
                                   {item.search_string}
                               </button>
                               <button
                                   onClick={() => handleDeleteHistory(item._id)}
                                   className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-500 transition-colors duration-200"
                               >
                                   <X className="h-3 w-3" />
                               </button>
                           </div>
                       ))}
                   </div>
               </div>
           )}

           {/* Quick Examples */}
           {searchHistory.length <= 0 && <div className="text-center">
               <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Try searching for:</p>
               <div className="flex flex-wrap justify-center gap-2">
                   {[
                       'E-commerce website',
                       'Mobile app',
                       'AI chatbot',
                       'Analytics dashboard'
                   ].map((example, index) => (
                       <button
                           key={index}
                           onClick={() => setSearchQuery(example)}
                           className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                           disabled={isLoading}
                       >
                           {example}
                       </button>
                   ))}
               </div>
           </div>}
       </div>
   </div>
);
}