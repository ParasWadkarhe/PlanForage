"use client"

import { Search, FileText, Sparkles, Zap, ArrowRight, Target, BookOpen } from "lucide-react"
import { useContext, useState, useEffect, useRef } from "react"
import { AppContext } from "../../context/AppContext"
import TextSearch from "./TextSearch"
import UnclearInput from "./UnclearInput"
import ProjectDisplay from "../ProjectDisplay"
import DocumentSearch from "./DocumentSearch"

const SearchContent = () => {
  const { projectData, inputType, setInputType } = useContext(AppContext)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const sectionsRef = useRef({})

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

  const searchTypes = [
    {
      id: "text",
      label: "Text Search",
      description: "Search using keywords and descriptions",
      icon: Search,
      color: "purple",
      bgColor: "bg-purple-100 dark:bg-purple-900",
      textColor: "text-purple-600 dark:text-purple-400",
      hoverShadow: "hover:shadow-purple-500/20",
    },
    {
      id: "document",
      label: "Document Search",
      description: "Search through uploaded documents",
      icon: FileText,
      color: "blue",
      bgColor: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-600 dark:text-blue-400",
      hoverShadow: "hover:shadow-blue-500/20",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="space-y-8 p-6">
        {/* Header Section with Gradient - Only show when no project data */}
        {!projectData && (
          <div
            id="search-header"
            ref={setSectionRef("search-header")}
            className={`transition-all duration-1000 ease-out translate-y-0 opacity-100`}
          >
            <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-700 dark:via-blue-700 dark:to-indigo-700 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/80 via-blue-400/80 to-indigo-400/80 dark:from-purple-500/60 dark:via-blue-500/60 dark:to-indigo-500/60"></div>
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-x-12 translate-y-12"></div>

              <div className="relative z-10 text-center">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 transition-all duration-300 hover:scale-110">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 hover:text-purple-100 transition-colors duration-300">
                  Project Search Hub
                </h1>
                <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
                  Find the perfect project proposal using our intelligent search tools
                </p>

                {/* Enhanced Search Type Toggle */}
                <div className="flex justify-center">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
                    <div className="flex gap-2">
                      {searchTypes.map((type) => {
                        const IconComponent = type.icon
                        const isActive = inputType === type.id
                        return (
                          <button
                            key={type.id}
                            onClick={() => setInputType(type.id)}
                            className={`relative flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 group ${
                              isActive
                                ? "bg-white text-purple-600 shadow-lg"
                                : "text-white hover:bg-white/20 hover:backdrop-blur-md"
                            }`}
                          >
                            <IconComponent
                              className={`w-5 h-5 transition-all duration-300 ${
                                isActive ? "text-purple-600" : "text-white group-hover:scale-110"
                              }`}
                            />
                            <span className="font-medium">{type.label}</span>
                            {isActive && (
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-xl"></div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Components */}
        {inputType === "text" && !projectData && (
            <TextSearch />
        )}

        {inputType === "document" && !projectData && (
            <DocumentSearch />
        )}

        {/* Project Display */}
        {projectData && !projectData.error && (
            <ProjectDisplay />
        )}

        {/* Error Display */}
        {projectData && projectData.error && (
            <UnclearInput />
        )}

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
    </div>
  )
}

export default SearchContent
