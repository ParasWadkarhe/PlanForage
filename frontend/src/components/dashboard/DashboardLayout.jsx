"use client"

import { useState, useEffect, useContext, useRef } from "react"
import { Zap, Home, History, Upload, Search, Menu, X, Bell, Settings, User, Sparkles } from "lucide-react"

import DashboardContent from "./DashboardContent"
import HistoryContent from "./HistoryContent"
import UploadContent from "./UploadContent"
import SearchContent from "../search/SearchContent"

import { AppContext } from "../../context/AppContext"

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const sectionsRef = useRef({})
  const { activeTab, setActiveTab } = useContext(AppContext)

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

  const sidebarItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      color: "purple",
      bgColor: "bg-purple-100 dark:bg-purple-900",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      id: "search",
      label: "Search",
      icon: Search,
      color: "blue",
      bgColor: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: "history",
      label: "History",
      icon: History,
      color: "green",
      bgColor: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      id: "upload",
      label: "Documents",
      icon: Upload,
      color: "orange",
      bgColor: "bg-orange-100 dark:bg-orange-900",
      textColor: "text-orange-600 dark:text-orange-400",
    },
  ]

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const renderDashboardContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />
      case "history":
        return <HistoryContent />
      case "upload":
        return <UploadContent />
      case "search":
        return <SearchContent />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* Mobile Menu Button - Fixed Position */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg border border-purple-100/50 dark:border-purple-800/50"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex">
        {/* Enhanced Sidebar */}
        <div
          className={`fixed top-0 left-0 bottom-0 w-72 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-r border-purple-100/50 dark:border-purple-800/50 transform transition-all duration-500 z-40 shadow-2xl flex flex-col ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* PlanForage Logo Header */}
          <div className="p-4 border-b border-purple-100 dark:border-purple-800">
            <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-700 dark:via-blue-700 dark:to-indigo-700 rounded-2xl p-6 relative overflow-hidden shadow-xl">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/80 via-blue-400/80 to-indigo-400/80 dark:from-purple-500/60 dark:via-blue-500/60 dark:to-indigo-500/60"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl translate-x-10 -translate-y-10"></div>

            <div className=" relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 transition-all duration-300 hover:scale-110 hover:rotate-6">
                <Zap className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white hover:text-purple-100 transition-colors duration-300 cursor-pointer">
                PlanForage
                </h1>
            </div>

            </div>
          </div>

          {/* Mobile Close Button */}
          <div className="flex items-center justify-between px-6 py-4 lg:hidden border-b border-purple-100 dark:border-purple-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>
          </div>



          {/* Navigation Items */}
          <nav className="px-4 flex-1">
            <div className="space-y-3 py-6">
              {sidebarItems.map((item, index) => {
                const IconComponent = item.icon
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setIsSidebarOpen(false)
                    }}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group relative overflow-hidden ${
                      isActive
                        ? `bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 ${item.textColor} shadow-lg border border-purple-200 dark:border-purple-700`
                        : "text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 hover:text-purple-600 dark:hover:text-purple-400 hover:shadow-md border border-transparent hover:border-purple-100 dark:hover:border-purple-800"
                    }`}
                  >
                    {/* Background decoration for active item */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-xl"></div>
                    )}

                    <div
                      className={`w-10 h-10 ${isActive ? item.bgColor : "bg-gray-100 dark:bg-gray-700 group-hover:" + item.bgColor} rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 relative z-10`}
                    >
                      <IconComponent
                        className={`w-5 h-5 ${isActive ? item.textColor : "text-gray-500 dark:text-gray-400 group-hover:" + item.textColor}`}
                      />
                    </div>
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">
                      {item.label}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute right-3 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    )}
                  </button>
                )
              })}
            </div>
          </nav>

        </div>

        {/* Mobile Overlay with Enhanced Blur */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-md z-30 lg:hidden transition-all duration-300"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Enhanced Main Content */}
        <div className="flex-1 lg:ml-72 min-h-screen">
          <main
            id="main-content"
            ref={setSectionRef("main-content")}
            className={`transition-all duration-1000 ease-out ${
              isVisible("main-content") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
              <div className="container mx-auto h-full overflow-y-auto transition-all duration-500 ease-out">{renderDashboardContent()}</div>
          </main>
        </div>
      </div>

      <style>{`
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
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

export default DashboardLayout
