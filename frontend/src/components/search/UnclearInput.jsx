"use client"

import { AlertCircle, Lightbulb, RefreshCw, Sparkles, ArrowRight, HelpCircle } from "lucide-react"
import { AppContext } from "../../context/AppContext"
import { useContext, useState, useEffect, useRef } from "react"

export default function UnclearInput({ originalQuery = "" }) {
  const { setProjectData, projectData } = useContext(AppContext)
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

  const tipCategories = [
    {
      title: "Project Essentials",
      tips: [
        {
          label: "Project type",
          description: "Web app, mobile app, desktop software, API, etc.",
          icon: "🎯",
        },
        {
          label: "Key features",
          description: "What should your project do? List main functionalities",
          icon: "⚡",
        },
        {
          label: "Target audience",
          description: "Who will use this project? Demographics and use cases",
          icon: "👥",
        },
      ],
    },
    {
      title: "Technical Details",
      tips: [
        {
          label: "Technology stack",
          description: "Preferred programming languages, frameworks, or platforms",
          icon: "💻",
        },
        {
          label: "Timeline",
          description: "How long should the project take? Weeks, months?",
          icon: "📅",
        },
        {
          label: "Budget range",
          description: "What's your estimated budget for this project?",
          icon: "💰",
        },
      ],
    },
  ]

  const exampleQueries = [
    {
      title: "E-commerce Platform",
      query:
        "Build a modern e-commerce website with React and Node.js, featuring user authentication, product catalog, shopping cart, payment integration with Stripe, and admin dashboard. Target audience: small to medium businesses. Budget: $15,000-25,000. Timeline: 3-4 months.",
      icon: "🛒",
    },
    {
      title: "Mobile Fitness App",
      query:
        "Create a React Native fitness tracking app with workout plans, progress tracking, social features, and integration with wearable devices. Target users: fitness enthusiasts aged 18-35. Budget: $20,000-30,000. Timeline: 4-5 months.",
      icon: "💪",
    },
    {
      title: "Project Management Tool",
      query:
        "Develop a web-based project management tool using Vue.js and Python Django, with task management, team collaboration, time tracking, and reporting features. For remote teams of 5-50 people. Budget: $30,000-40,000. Timeline: 5-6 months.",
      icon: "📊",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="space-y-8 ">
        {/* Header Section with Gradient */}
        <div
          id="error-header"
          ref={setSectionRef("error-header")}
          className={`transition-all duration-1000 ease-out ${
            isVisible("error-header") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 dark:from-amber-600 dark:via-orange-600 dark:to-red-600 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/80 via-orange-400/80 to-red-400/80 dark:from-amber-500/60 dark:via-orange-500/60 dark:to-red-500/60"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-x-12 translate-y-12"></div>

            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 transition-all duration-300 hover:scale-110">
                  <HelpCircle className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 hover:text-amber-100 transition-colors duration-300">
                Let's Clarify Your Project
              </h1>
              <p className="text-xl text-amber-100 max-w-2xl mx-auto">
                We need a bit more detail to create the perfect project proposal for you
              </p>
            </div>
          </div>
        </div>

        {/* Error Message Card */}
        <div
          id="error-message"
          ref={setSectionRef("error-message")}
          className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-amber-100 dark:border-amber-800 p-8 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${
            isVisible("error-message") ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 dark:bg-amber-600/10 rounded-full blur-2xl translate-x-16 -translate-y-16"></div>

          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-6">
                <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300">
              Could Not Generate Project Proposal
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto mb-6 text-lg">
              {projectData.message ||
                "We couldn't generate a clear project plan from your input. Please provide more details about what you'd like to build, including the type of project, key features, or target audience."}
            </p>

            {originalQuery && (
              <div className="bg-gradient-to-r from-gray-50 to-amber-50/30 dark:from-gray-700 dark:to-amber-900/10 rounded-xl p-6 mb-8 border border-amber-100 dark:border-amber-800">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Your original query:</p>
                <p className="text-gray-700 dark:text-gray-300 font-medium text-lg italic">"{originalQuery}"</p>
              </div>
            )}

            <button
              onClick={() => setProjectData(null)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/50 group"
            >
              <RefreshCw className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" />
              <span>Try Again</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Tips Section */}
        <div
          id="tips-section"
          ref={setSectionRef("tips-section")}
          className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-800 p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${
            isVisible("tips-section") ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200/20 dark:bg-blue-600/10 rounded-full blur-2xl -translate-x-16 -translate-y-16"></div>

          <div className="relative z-10">
            <div className="flex items-center mb-8">
              <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 animate-pulse" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                Tips for Better Results
              </h3>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Include these details in your project description to get more accurate and comprehensive proposals:
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {tipCategories.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className={`transition-all duration-700 ease-out ${
                    isVisible("tips-section")
                      ? `animate-[slideInUp_0.6s_ease-out_${categoryIndex * 200}ms_both]`
                      : "opacity-0"
                  }`}
                >
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    {category.title}
                  </h4>
                  <div className="space-y-4">
                    {category.tips.map((tip, tipIndex) => (
                      <div
                        key={tipIndex}
                        className="group flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 dark:from-gray-700 dark:to-blue-900/10 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg border border-blue-100 dark:border-blue-800"
                      >
                        <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-sm">
                          {tip.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {tip.label}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                            {tip.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Example Queries Section */}
        <div
          id="examples-section"
          ref={setSectionRef("examples-section")}
          className={`bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-purple-100 dark:border-purple-800 transition-all duration-1000 ease-out ${
            isVisible("examples-section") ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          <div className="text-center mb-8">
            <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Example Project Descriptions</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Here are some well-structured project descriptions that would generate excellent proposals:
            </p>
          </div>

          <div className="grid gap-6">
            {exampleQueries.map((example, index) => (
              <div
                key={index}
                className={`group p-6 bg-white dark:bg-gray-800 rounded-xl border border-purple-100 dark:border-purple-800 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative overflow-hidden ${
                  isVisible("examples-section")
                    ? `animate-[slideInUp_0.6s_ease-out_${index * 150}ms_both]`
                    : "opacity-0"
                }`}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-xl translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      {example.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                      {example.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                    "{example.query}"
                  </p>
                </div>
              </div>
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
    </div>
  )
}
