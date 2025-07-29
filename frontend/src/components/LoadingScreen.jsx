"use client"

import { Loader2, Zap, Sparkles, Rocket, Code, Database, Cloud } from "lucide-react"
import { useState, useEffect } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const loadingSteps = [
    { icon: Database, label: "Connecting to database", color: "text-blue-500" },
    { icon: Cloud, label: "Initializing cloud services", color: "text-green-500" },
    { icon: Code, label: "Loading AI models", color: "text-purple-500" },
    { icon: Rocket, label: "Preparing your workspace", color: "text-orange-500" },
    { icon: Sparkles, label: "Almost ready!", color: "text-pink-500" },
  ]

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100)

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 800)

    // Update loading steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 1200)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-200/30 dark:bg-purple-600/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-200/30 dark:bg-blue-600/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 bg-pink-200/30 dark:bg-pink-600/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-green-200/30 dark:bg-green-600/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Main loading content */}
      <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
        <div
          className={`text-center transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
          }`}
        >
          {/* Main loading card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-purple-100 dark:border-purple-800 p-12 relative overflow-hidden max-w-md mx-auto">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-blue-50/50 to-indigo-50/50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-xl translate-x-12 -translate-y-12"></div>

            <div className="relative z-10">
              {/* Logo/Icon Section */}
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:scale-110 hover:rotate-6 shadow-lg">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <div className="flex justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-600 dark:text-purple-400" />
                </div>
              </div>

              {/* Main Message */}
              <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                PlanForage
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">
                Preparing your AI-powered workspace
              </p>

              {/* Current Step Display */}
              <div className="mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  {(() => {
                    const CurrentIcon = loadingSteps[currentStep]?.icon || Sparkles
                    return (
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-xl flex items-center justify-center transition-all duration-500 hover:scale-110">
                        <CurrentIcon
                          className={`w-6 h-6 ${
                            loadingSteps[currentStep]?.color || "text-purple-600 dark:text-purple-400"
                          } animate-pulse`}
                        />
                      </div>
                    )
                  })()}
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-500">
                  {loadingSteps[currentStep]?.label || "Getting ready..."}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-700 ease-out shadow-lg"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.round(Math.min(progress, 100))}% Complete
                  </p>
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 rounded-full animate-bounce bg-purple-600 dark:bg-purple-400"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full animate-bounce bg-purple-600 dark:bg-purple-400"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full animate-bounce bg-purple-600 dark:bg-purple-400"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Loading Steps Indicator */}
              <div className="flex justify-center space-x-2">
                {loadingSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      index <= currentStep
                        ? "bg-purple-600 dark:bg-purple-400 scale-125"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Info Card */}
          <div
            className={`mt-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800 max-w-md mx-auto transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Did You Know?</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              PlanForage uses advanced AI to analyze your project requirements and generate comprehensive proposals with
              detailed timelines, budgets, and technical specifications.
            </p>
          </div>

          {/* Feature Highlights */}
          <div
            className={`mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            {[
              { icon: "🤖", label: "AI-Powered" },
              { icon: "⚡", label: "Fast Results" },
              { icon: "📊", label: "Detailed Plans" },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 group"
              >
                <div className="text-2xl mb-2 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {feature.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 dark:bg-purple-600/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
