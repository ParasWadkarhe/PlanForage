import { useState, useEffect,  useContext } from 'react';
import { Search, ArrowRight, MapPin, DollarSign, Loader2, X } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";

export default function SearchPage({ searchHandler }) {
    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState({search_string: '', location: '', budget: ''})
    const { user } = useContext(AuthContext)

    const handleSearch = async (e) => {
        e.preventDefault();

        if(!searchData) {
            console.error('Problem searching. Search Data is null')
            return
        }
        
        if (searchData.search_string.trim() && !isLoading) {
            setIsLoading(true);
            try {
                const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/query', {
                    search_string: searchData?.search_string,
                    location: searchData?.location,
                    budget: searchData?.budget,
                    uid: user?.uid,
                    _id: searchData?._id || null
                });
                searchHandler(response.data);
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
               <h1 className="text-4xl sm:text-5xl font-semibold text-blue-600 dark:text-blue-400 my-6">
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
                           name='location'
                           value={searchData.location}
                           onChange={handleSearchDataChange}
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
                           name='budget'
                           value={searchData.budget || ''}
                           onChange={handleSearchDataChange}
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
                           name='search_string'
                           value={searchData.search_string}
                           onChange={handleSearchDataChange}
                           onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                           placeholder="Describe your project idea..."
                           className="block w-full pl-12 pr-12 py-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                       />
                       <button
                           onClick={handleSearch}
                           className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                           disabled={!searchData.search_string.trim() || isLoading}
                       >
                           {isLoading ? (
                               <Loader2 className="h-5 w-5 animate-spin" />
                           ) : (
                               <ArrowRight className={`h-5 w-5 ${!searchData.search_string.trim() ? 'opacity-50' : ''}`} />
                           )}
                       </button>
                   </div>
               </div>
           </div>

           
       </div>
   </div>
);
}