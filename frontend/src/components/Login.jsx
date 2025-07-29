"use client"

import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  Zap,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Shield,
  CheckCircle,
  Star,
  Rocket,
} from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "../firebase/config"
import { updateProfile } from "firebase/auth"

function Login() {
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const sectionsRef = useRef({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!")
        setIsSubmitting(false)
        return
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        await updateProfile(userCredential.user, {
          displayName: formData.name,
        })
        alert("Account created successfully")
        navigate("/home")
      } catch (err) {
        alert(err.message)
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password)
        navigate("/home")
      } catch (err) {
        alert(err.message)
      }
    }
    setIsSubmitting(false)
  }

  const onGoogleSuccess = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      navigate("/home")
    } catch (err) {
      alert("Google login failed")
      console.log(err)
    }
  }

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)
  }, [])

  const features = [
    {
      icon: Rocket,
      title: "AI-Powered Planning",
      description: "Generate comprehensive project proposals in seconds",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security",
    },
    {
      icon: Star,
      title: "Professional Results",
      description: "Create proposals that impress clients and stakeholders",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-200/30 dark:bg-purple-600/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-200/30 dark:bg-blue-600/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 bg-pink-200/30 dark:bg-pink-600/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-green-200/30 dark:bg-green-600/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Enhanced Navbar */}
      <nav
        className={`w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-purple-100/50 dark:border-purple-800/50 sticky top-0 z-50 shadow-lg transition-all duration-700 ${
          isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div
            className="flex items-center gap-4 cursor-pointer group transition-all duration-300 hover:scale-105"
            onClick={() => navigate("/")}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                PlanForage
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">AI-Powered Project Planning</p>
            </div>
          </div>

          <div className="flex gap-6 items-center">
            <p
              className={`hide-on-mobile text-gray-600 dark:text-gray-300 text-sm transition-all duration-500 delay-300 ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
            >
              {isSignup ? "Already have an account?" : "Need an account?"}
            </p>

            <button
              onClick={() => setIsSignup((prev) => !prev)}
              className={`bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 flex items-center justify-center min-h-[calc(100vh-80px)] relative z-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-begin">
          {/* Left Side - Welcome Section */}
          <div
            id="welcome-section"
            ref={setSectionRef("welcome-section")}
            className={`space-y-8 transition-all duration-1000 ease-out ${
              isVisible("welcome-section") ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-700 dark:via-blue-700 dark:to-indigo-700 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/80 via-blue-400/80 to-indigo-400/80 dark:from-purple-500/60 dark:via-blue-500/60 dark:to-indigo-500/60"></div>
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-x-12 translate-y-12"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-8 h-8 text-white animate-pulse" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Welcome to PlanForage</h2>
                </div>
                <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                  Transform your project ideas into comprehensive, professional proposals with the power of AI. Join
                  professionals who trust PlanForage for their project planning needs.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/30 flex items-center justify-center"
                      >
                        <User className="w-5 h-5 text-white" />
                      </div>
                    ))}
                  </div>
                  <div>
                    {/* <p className="text-white font-semibold">10,000+ Happy Users</p> */}
                    <p className="text-purple-100 text-sm">Trusted by professionals worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className={`group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-purple-100 dark:border-purple-800 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
                      isVisible("welcome-section")
                        ? `animate-[slideInLeft_0.6s_ease-out_${index * 200}ms_both]`
                        : "opacity-0"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <IconComponent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div
            id="login-form"
            ref={setSectionRef("login-form")}
            className={`transition-all duration-1000 ease-out ${
              isVisible("login-form") ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-purple-100 dark:border-purple-800 p-8 hover:shadow-3xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-2xl translate-x-16 -translate-y-16"></div>

              <div className="relative z-10">
                {/* Form Header */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-6">
                      {isSignup ? (
                        <User className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                      ) : (
                        <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                    {isSignup ? "Create Your Account" : "Welcome Back"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    {isSignup
                      ? "Join thousands of professionals using AI-powered project planning"
                      : "Sign in to access your AI-powered project planner"}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Email/Password Form */}
                  <form onSubmit={handleEmailSubmit} className="space-y-6">
                    {isSignup && (
                      <div
                        className={`relative transition-all duration-500 ${
                          isSignup ? "opacity-100 max-h-20 translate-y-0" : "opacity-0 max-h-0 -translate-y-4"
                        }`}
                      >
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 group-focus-within:text-purple-500">
                            <User className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-12 pr-4 py-4 border border-purple-200 dark:border-purple-700 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg hover:shadow-purple-500/10"
                          />
                        </div>
                      </div>
                    )}

                    <div className="relative group">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 group-focus-within:text-purple-500">
                          <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-4 border border-purple-200 dark:border-purple-700 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg hover:shadow-purple-500/10"
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 group-focus-within:text-purple-500">
                          <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-14 py-4 border border-purple-200 dark:border-purple-700 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg hover:shadow-purple-500/10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110 active:scale-95"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    {isSignup && (
                      <div
                        className={`relative group transition-all duration-500 ${
                          isSignup ? "opacity-100 max-h-20 translate-y-0" : "opacity-0 max-h-0 -translate-y-4"
                        }`}
                      >
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 group-focus-within:text-purple-500">
                            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500" />
                          </div>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-12 pr-14 py-4 border border-purple-200 dark:border-purple-700 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg hover:shadow-purple-500/10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110 active:scale-95"
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          {isSignup ? "Create Account" : "Sign In"}
                          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-purple-200 dark:border-purple-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Google Login */}
                  <button
                    onClick={onGoogleSuccess}
                    className="w-full flex items-center justify-center gap-4 px-6 py-4 bg-white dark:bg-gray-700 border border-purple-200 dark:border-purple-700 rounded-xl shadow-sm hover:shadow-lg dark:hover:shadow-xl text-gray-700 dark:text-gray-200 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-purple-300 dark:hover:border-purple-600 group"
                  >
                    <FcGoogle className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    <span>Continue with Google</span>
                  </button>

                  {/* Success Indicators */}
                  {isSignup && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <div>
                          <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                            Join the PlanForage Community
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-400">
                            Get instant access to AI-powered project planning tools
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* <div className="mt-8 pt-6 border-t border-purple-100 dark:border-purple-700 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    By {isSignup ? "signing up" : "signing in"}, you agree to our{" "}
                    <span className="text-purple-600 dark:text-purple-400 hover:underline cursor-pointer transition-all duration-200 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-purple-600 dark:text-purple-400 hover:underline cursor-pointer transition-all duration-200 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                      Privacy Policy
                    </span>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
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
      `}</style>
    </div>
  )
}

export default Login
