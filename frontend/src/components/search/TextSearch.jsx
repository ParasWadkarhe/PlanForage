"use client"

import { useState, useEffect, useContext, useRef } from "react"
import { Search, ArrowRight, MapPin, DollarSign, Loader2, RotateCcw, Sparkles, Target, Lightbulb } from "lucide-react"
import axios from "axios"
import { AuthContext } from "../../firebase/AuthContext"
import { AppContext } from "../../context/AppContext"

export default function TextSearch() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const sectionsRef = useRef({})
  const { user } = useContext(AuthContext)
  const { setProjectData, searchData, setSearchData } = useContext(AppContext)

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

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!searchData) {
      console.error("Problem searching. Search Data is null")
      return
    }

    if (searchData.search_string.trim() && !isLoading) {
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
      } catch (error) {
        console.error("Error fetching search results:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSearchDataChange = (e) => {
    setSearchData((prev) => {
      const temp = {
        ...prev,
        [e.target.name]: e.target.value,
      }
      delete temp._id
      return temp
    })
  }

  const popularSearches = [
    {
      display_string: "Analytics Dashboard",
      search_string: "Analytics dashboard for E-commerce website",
      description: "Dashboard for website analytics and monitoring",
      icon: "📊",
      color: "purple",
    },
    {
      display_string: "Mobile App",
      search_string: "Mobile app for video conferencing",
      description: "Android & iOS app development",
      icon: "📱",
      color: "blue",
    },
    {
      display_string: "Project Management Tool",
      search_string: "Project management tool with AI task prioritization",
      description: "Tools to collaborate and organize teams",
      icon: "🎯",
      color: "green",
    },
    {
      display_string: "E-commerce Platform",
      search_string: "E-commerce platform with payment integration",
      description: "Online store with shopping cart functionality",
      icon: "🛒",
      color: "orange",
    },
    {
      display_string: "AI Chatbot",
      search_string: "AI-powered customer service chatbot",
      description: "Intelligent chatbot for customer support",
      icon: "🤖",
      color: "indigo",
    },
    {
      display_string: "Learning Platform",
      search_string: "Online learning platform with video courses",
      description: "Educational platform with interactive content",
      icon: "📚",
      color: "pink",
    },
  ]

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
                Analyzing Your Project
              </h2>
              <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8 transition-all duration-700 hover:text-white">
                Our AI is processing your request and generating a comprehensive project proposal. This may take a few
                moments...
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
    <>

      {/* Search Form */}
      <div
        id="search-form"
        ref={setSectionRef("search-form")}
        className={`bg-white mb-8 z-10 dark:bg-gray-800  rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${
          isVisible("search-form") ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-2xl translate-x-16 -translate-y-16"></div>

        <div className="relative z-10">
          <div className="flex items-center mb-8">
            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3 animate-pulse" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
              Project Details
            </h3>
          </div>

          <form onSubmit={handleSearch} className="space-y-8">
            {/* Main Search Input */}
            <div
              className={`transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                Project Description *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-gray-400 dark:text-gray-500 transition-all duration-300 group-hover:text-purple-500 dark:group-hover:text-purple-400 group-focus-within:text-purple-500" />
                </div>
                <textarea
                  name="search_string"
                  value={searchData.search_string}
                  onChange={handleSearchDataChange}
                  placeholder="Describe your project idea in detail... What are you trying to build? What features do you need? What's your target audience?"
                  rows={4}
                  className="block w-full pl-14 pr-4 py-4 border border-purple-200 dark:border-purple-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg hover:shadow-purple-500/10 resize-none"
                  required
                />
              </div>
            </div>

            {/* Location and Budget Grid */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {/* Location Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                  Target Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-all duration-300 group-hover:text-purple-500 dark:group-hover:text-purple-400 group-focus-within:text-purple-500" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={searchData.location}
                    onChange={handleSearchDataChange}
                    placeholder="e.g., New York, USA or Global"
                    className="block w-full pl-12 pr-4 py-4 border border-purple-200 dark:border-purple-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg hover:shadow-purple-500/10"
                  />
                </div>
              </div>

              {/* Budget Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                  Project Budget (USD)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-all duration-300 group-hover:text-purple-500 dark:group-hover:text-purple-400 group-focus-within:text-purple-500" />
                  </div>
                  <input
                    type="number"
                    name="budget"
                    value={searchData.budget || ""}
                    onChange={handleSearchDataChange}
                    placeholder="e.g., 50000"
                    className="block w-full pl-12 pr-4 py-4 border border-purple-200 dark:border-purple-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg hover:shadow-purple-500/10"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={`flex flex-col sm:flex-row justify-end gap-4 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <button
                type="button"
                onClick={() => {
                  setSearchData({
                    search_string: "",
                    location: "",
                    budget: "",
                    _id: "",
                  })
                }}
                className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 hover:scale-105 active:scale-95 hover:-translate-y-1 hover:shadow-lg group border border-gray-200 dark:border-gray-600"
              >
                <RotateCcw className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" />
                Reset Form
              </button>

              <button
                type="submit"
                disabled={!searchData.search_string.trim() || isLoading}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/50 group"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                )}
                <span>{isLoading ? "Generating Proposal..." : "Generate Project Proposal"}</span>
                {!isLoading && (
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Popular Searches */}
      <div
        id="popular-searches"
        ref={setSectionRef("popular-searches")}
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${
          isVisible("popular-searches") ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      >
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200/20 dark:bg-blue-600/10 rounded-full blur-2xl -translate-x-16 -translate-y-16"></div>

        <div className="relative z-10">
          <div className="flex items-center mb-8">
            <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3 animate-pulse" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
              Popular Project Ideas
            </h3>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Need inspiration? Click on any of these popular project types to get started quickly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularSearches.map((item, index) => (
              <button
                key={index}
                onClick={() => setSearchData((prev) => ({ ...prev, search_string: item.search_string }))}
                className={`group p-6 bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-gray-700 dark:to-purple-900/10 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 border border-purple-100 dark:border-purple-800 hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300 text-left hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden ${
                  isVisible("popular-searches")
                    ? `animate-[slideInUp_0.6s_ease-out_${index * 100}ms_both]`
                    : "opacity-0"
                }`}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-xl translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-sm">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                        {item.display_string}
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                    {item.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </button>
            ))}
          </div>
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
      `}</style>
    </>
  )
}
