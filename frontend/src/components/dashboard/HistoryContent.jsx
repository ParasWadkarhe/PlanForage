"use client"

import { useState, useEffect, useContext, useRef } from "react"
import axios from "axios"
import { Trash2, Loader2, History, Search, Filter, X, Calendar, Pencil, Sparkles, Clock, FileText } from "lucide-react"

import { AuthContext } from "../../firebase/AuthContext"
import { AppContext } from "../../context/AppContext"

const HistoryContent = () => {
  const [searchHistory, setSearchHistory] = useState([])
  const [filteredHistory, setFilteredHistory] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [dateFilter, setDateFilter] = useState("")
  const [budgetFilter, setBudgetFilter] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const sectionsRef = useRef({})
  const { user } = useContext(AuthContext)
  const { setProjectData, setActiveTab, setSearchData } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false)
  const [deletingItemId, setDeletingItemId] = useState(null)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    Object.values(sectionsRef.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const setSectionRef = (id) => (el) => {
    sectionsRef.current[id] = el
  }

  const isVisible = (id) => visibleSections.has(id)

  useEffect(() => {
    // Trigger load animation
    setTimeout(() => setIsLoaded(true), 100)
  }, [])

  const handleViewHistory = async (searchData) => {
    setIsLoading(true)
    try {
      const idToken = await user.getIdToken()
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/query",
        {
          search_string: searchData?.search_string,
          location: searchData?.location,
          budget: searchData?.budget,
          _id: searchData?._id || null,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        },
      )
      setProjectData(response.data)
      setActiveTab("search")
    } catch (error) {
      console.error("Error fetching search results:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteHistory = async (itemId) => {
    try {
      setDeletingItemId(itemId)

      const idToken = await user.getIdToken()
      const response = await axios.delete(import.meta.env.VITE_BACKEND_URL + "/proposal/" + itemId, {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      })
      if (!response.data.error) {
        setSearchHistory((prevHistory) => prevHistory.filter((item) => item._id !== itemId))
      } else {
        console.error("Failed to delete search history")
      }
    } catch (error) {
      console.error("Error deleting search history:", error)
    } finally {
      setDeletingItemId(null)
    }
  }

  // Filter and search functionality
  useEffect(() => {
    let filtered = searchHistory

    // Apply search query filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.search_string?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter)
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date)
        return itemDate.toDateString() === filterDate.toDateString()
      })
    }

    // Apply budget filter
    if (budgetFilter) {
      const budgetRange = budgetFilter.split("-")
      if (budgetRange.length === 2) {
        const minBudget = Number.parseInt(budgetRange[0])
        const maxBudget = Number.parseInt(budgetRange[1])
        filtered = filtered.filter((item) => {
          const itemBudget = typeof item.budget === "number" ? item.budget : Number.parseInt(item.budget) || 0
          return itemBudget >= minBudget && itemBudget <= maxBudget
        })
      }
    }

    setFilteredHistory(filtered)
  }, [searchHistory, searchQuery, dateFilter, budgetFilter])

  // show search history with Firebase auth token
  useEffect(() => {
    if (!user) return
    ;(async () => {
      try {
        const idToken = await user.getIdToken()
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/search-history", {
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        })
        setSearchHistory(response.data.proposals || [])
      } catch (error) {
        console.error("Error fetching search history:", error)
      }
    })()

    return () => {}
  }, [user])

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString()
    } catch (error) {
      return dateString
    }
  }

  const formatBudget = (budget) => {
    if (!budget) return "Not specified"
    return typeof budget === "number" ? `$${budget.toLocaleString()}` : budget
  }

  const clearFilters = () => {
    setSearchQuery("")
    setDateFilter("")
    setBudgetFilter("")
    setShowFilters(false)
  }

  // Enhanced Loading Screen Component
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <div className="space-y-8 p-6">
          <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-700 dark:via-blue-700 dark:to-indigo-700 rounded-3xl p-12 relative overflow-hidden shadow-2xl">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/80 via-blue-400/80 to-indigo-400/80 dark:from-purple-500/60 dark:via-blue-500/60 dark:to-indigo-500/60"></div>
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-xl -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl translate-x-16 translate-y-16"></div>

            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 animate-pulse">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 hover:text-purple-100 transition-colors duration-300">
                Loading Project Proposal
              </h2>
              <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8 transition-all duration-700 hover:text-white">
                We're generating your comprehensive project proposal. This may take a few moments...
              </p>

              <div className="flex justify-center space-x-3">
                <div className="w-4 h-4 bg-white/80 rounded-full animate-bounce"></div>
                <div
                  className="w-4 h-4 bg-white/80 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-4 h-4 bg-white/80 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="space-y-8 p-6">
        {/* Header Section with Gradient */}
        <div
          id="history-header"
          ref={setSectionRef("history-header")}
          className={`transition-all duration-1000 ease-out ${
            isVisible("history-header") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-700 dark:via-blue-700 dark:to-indigo-700 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/80 via-blue-400/80 to-indigo-400/80 dark:from-purple-500/60 dark:via-blue-500/60 dark:to-indigo-500/60"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-x-12 translate-y-12"></div>

            <div className="relative z-10 flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 transition-all duration-300 hover:scale-110">
                <History className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 hover:text-purple-100 transition-colors duration-300">
                  Search History
                </h1>
                <p className="text-purple-100 text-lg">Review and manage your previous project searches</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div
          id="search-filters"
          ref={setSectionRef("search-filters")}
          className={`transition-all duration-1000 ease-out ${
            isVisible("search-filters") ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3 animate-pulse" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Find Your Projects
              </h2>
            </div>

            {/* Search Bar and Filter Button */}
            <div className="mb-6">
              <div className="flex gap-4">
                <div className="flex-1 relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-all duration-300 group-hover:text-purple-500 dark:group-hover:text-purple-400 group-focus-within:text-purple-500" />
                  <input
                    type="text"
                    placeholder="Search your project history..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-purple-200 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg hover:shadow-purple-500/10"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 hover:-translate-y-1 hover:shadow-lg group ${
                    showFilters
                      ? "bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 text-purple-700 dark:text-purple-300 shadow-lg border border-purple-200 dark:border-purple-700"
                      : "text-purple-600 dark:text-purple-400 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 border border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600"
                  }`}
                >
                  <Filter className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="hidden sm:inline">Advanced Filters</span>
                </button>
              </div>

              {(searchQuery || dateFilter || budgetFilter) && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 group border border-red-200 dark:border-red-800"
                  >
                    <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                    <span>Clear All Filters</span>
                  </button>
                </div>
              )}
            </div>

            {/* Enhanced Filter Options */}
            {showFilters && (
              <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-100 dark:border-purple-800 transition-all duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                      Filter by Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-all duration-300 group-hover:text-purple-500 dark:group-hover:text-purple-400" />
                      <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-purple-200 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                      Filter by Budget Range
                    </label>
                    <select
                      value={budgetFilter}
                      onChange={(e) => setBudgetFilter(e.target.value)}
                      className="w-full px-4 py-3 border border-purple-200 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md"
                    >
                      <option value="">All Budget Ranges</option>
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
          </div>
        </div>

        {/* History Results Section */}
        <div
          id="history-results"
          ref={setSectionRef("history-results")}
          className={`transition-all duration-1000 ease-out ${
            isVisible("history-results") ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          {filteredHistory.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-12 text-center hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:scale-110">
                <FileText className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {searchHistory.length === 0 ? "No History Yet" : "No Results Found"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                {searchHistory.length === 0
                  ? "Start creating project proposals to see your search history here."
                  : "Try adjusting your search criteria or clearing the filters."}
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Found {filteredHistory.length} Project{filteredHistory.length !== 1 ? "s" : ""}
                </h2>
              </div>

              <div className="space-y-4">
                {filteredHistory.map((item, index) => (
                  <div
                    key={item._id || index}
                    className={`group relative overflow-hidden bg-gradient-to-r from-gray-50 to-purple-50/30 dark:from-gray-700 dark:to-purple-900/10 rounded-xl p-6 border border-purple-100 dark:border-purple-800 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20 ${
                      deletingItemId === item._id ? "opacity-50 pointer-events-none" : ""
                    } ${
                      isVisible("history-results")
                        ? `animate-[slideInUp_0.6s_ease-out_${index * 100}ms_both]`
                        : "opacity-0"
                    }`}
                    onClick={() => handleViewHistory(item)}
                  >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-xl translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-500"></div>

                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <History className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                          {item.search_string || "Untitled Project"}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(item.date)}
                          </span>
                          {item.budget && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
                              💰 {formatBudget(item.budget)}
                            </span>
                          )}
                          {item.location && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg">
                              📍 {item.location}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSearchData(item)
                            setProjectData(null)
                            setActiveTab("search")
                          }}
                          className="p-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 group/edit"
                          title="Edit Project"
                        >
                          <Pencil size={18} className="transition-transform duration-300 group-hover/edit:rotate-12" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteHistory(item._id)
                          }}
                          disabled={deletingItemId === item._id}
                          className="p-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 group/delete disabled:opacity-50 disabled:cursor-not-allowed"
                          title={deletingItemId === item._id ? "Deleting..." : "Delete Project"}
                        >
                          {deletingItemId === item._id ? (
                            <div className="w-5 h-5 border-2 border-red-600 dark:border-red-400 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Trash2 className="w-5 h-5 transition-transform duration-300 group-hover/delete:scale-110" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}

export default HistoryContent
