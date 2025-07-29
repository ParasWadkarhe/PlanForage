"use client"

import { Upload, Search, Calendar, TrendingUp, FileText, User, LogOut, Moon, Sun, Sparkles } from "lucide-react"
import { useContext, useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { AppContext } from "../../context/AppContext"
import { AuthContext } from "../../firebase/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase/config"

const DashboardContent = () => {
  const { user } = useContext(AuthContext)
  const { dashboardData, setDashboardData } = useContext(AppContext)
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const sectionsRef = useRef({})
  const [imageError, setImageError] = useState(false)

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

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch (err) {
      console.error("Logout error:", err.message)
    }
  }

  const handleThemeToggle = () => {
    document.documentElement.classList.toggle("dark")
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode
      localStorage.setItem("theme", newMode ? "dark" : "light")
      return newMode
    })
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
      setIsDarkMode(true)
    }
  }, [])

  // Fetch user dashboard data
  useEffect(() => {
    if (!user || !user?.uid) return
    ;(async () => {
      const idToken = await user.getIdToken()
      axios
        .get(import.meta.env.VITE_BACKEND_URL + `/user-dashboard`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setDashboardData(response.data)
        })
        .catch((error) => {
          console.error("Error fetching user dashboard data:", error)
        })
    })()
  }, [user])

  const stats = [
    {
      title: "Total Searches",
      value: dashboardData?.searchCount,
      icon: Search,
      color: "purple",
      bgColor: "bg-purple-100 dark:bg-purple-900",
      textColor: "text-purple-600 dark:text-purple-400",
      hoverShadow: "hover:shadow-purple-500/10",
    },
    {
      title: "Documents",
      value: dashboardData?.documentsUploaded,
      icon: FileText,
      color: "green",
      bgColor: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-600 dark:text-green-400",
      hoverShadow: "hover:shadow-green-500/10",
    },
    {
      title: "Plans Created",
      value: dashboardData?.plansCreated,
      icon: TrendingUp,
      color: "blue",
      bgColor: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-600 dark:text-blue-400",
      hoverShadow: "hover:shadow-blue-500/10",
    },
    {
      title: "This Month",
      value: dashboardData?.thisMonthSearchCount,
      icon: Calendar,
      color: "orange",
      bgColor: "bg-orange-100 dark:bg-orange-900",
      textColor: "text-orange-600 dark:text-orange-400",
      hoverShadow: "hover:shadow-orange-500/10",
    },
  ]

  const recentActivities = [
    {
      title: "Project Planning Search",
      time: "2 hours ago",
      icon: Search,
      bgColor: "bg-purple-100 dark:bg-purple-900",
      textColor: "text-purple-600 dark:text-purple-400",
      hoverColor: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
    },
    {
      title: "Document Upload",
      time: "5 hours ago",
      icon: Upload,
      bgColor: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-600 dark:text-green-400",
      hoverColor: "group-hover:text-green-600 dark:group-hover:text-green-400",
    },
    {
      title: "New Plan Created",
      time: "Yesterday",
      icon: FileText,
      bgColor: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-600 dark:text-blue-400",
      hoverColor: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="space-y-8 p-6">
        {/* Welcome Section with Gradient Background */}
        <div
          id="welcome"
          ref={setSectionRef("welcome")}
          className={`transition-all duration-1000 ease-out ${
            isVisible("welcome") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-700 dark:via-blue-700 dark:to-indigo-700 rounded-3xl p-8 mb-8 relative overflow-hidden shadow-2xl">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/80 via-blue-400/80 to-indigo-400/80 dark:from-purple-500/60 dark:via-blue-500/60 dark:to-indigo-500/60"></div>
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-xl -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl translate-x-16 translate-y-16"></div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 transition-all duration-300 hover:scale-110">
                  {user.photoURL && !imageError ? (
                    <img
                      src={user.photoURL || "/placeholder.svg"}
                      alt="Profile"
                      onError={() => setImageError(true)}
                      className="w-12 h-12 rounded-xl"
                    />
                  ) : (
                    <User className="w-8 h-8 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 hover:text-purple-100 transition-colors duration-300">
                    Welcome back, {user.displayName?.split(" ")[0]}!
                  </h2>
                  <p className="text-purple-100 text-lg">Ready to create amazing project proposals?</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleThemeToggle}
                  className="p-3 bg-white/20 backdrop-blur-md text-white hover:bg-white/30 rounded-xl transition-all duration-300 border border-white/30 hover:border-white/50 hover:scale-110 active:scale-95 hover:rotate-12"
                  title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-md text-white hover:bg-white/30 rounded-xl transition-all duration-300 border border-white/30 hover:border-white/50 hover:scale-105 active:scale-95 group"
                  title="Logout"
                >
                  <LogOut size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid with Enhanced Animations */}
        <div
          id="stats"
          ref={setSectionRef("stats")}
          className={`transition-all duration-1000 ease-out ${
            isVisible("stats") ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-6 hover:shadow-xl ${stat.hoverShadow} transition-all duration-300 hover:-translate-y-2 hover:scale-105 group cursor-pointer ${
                    isVisible("stats") ? `animate-[fadeInUp_0.8s_ease-out_${index * 100}ms_both]` : "opacity-0"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200 ${stat.hoverColor}`}
                      >
                        {stat.title}
                      </p>
                      <p
                        className={`text-3xl font-bold ${stat.textColor} transition-all duration-300 group-hover:scale-110`}
                      >
                        {stat.value || 0}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
                    >
                      <Icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Activity with Enhanced Design */}
        <div
          id="activity"
          ref={setSectionRef("activity")}
          className={`transition-all duration-1000 ease-out ${
            isVisible("activity") ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-purple-100 dark:border-purple-800 p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/50 dark:bg-purple-900/30 rounded-full blur-2xl translate-x-16 -translate-y-16"></div>

            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 hover:scale-110">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 cursor-default">
                  Recent Activity
                </h3>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-purple-50 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg group cursor-pointer border border-transparent hover:border-purple-200 dark:hover:border-purple-700 ${
                        isVisible("activity")
                          ? `animate-[slideInLeft_0.6s_ease-out_${index * 150}ms_both]`
                          : "opacity-0"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 ${activity.bgColor} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                      >
                        <Icon className={`w-6 h-6 ${activity.textColor}`} />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-gray-900 dark:text-white font-medium transition-colors duration-200 ${activity.hoverColor}`}
                        >
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                          {activity.time}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div
          id="actions"
          ref={setSectionRef("actions")}
          className={`transition-all duration-1000 ease-out ${
            isVisible("actions") ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
        </div>
      </div>

      <style>{`
                @keyframes fadeInUp {
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

export default DashboardContent
