"use client"

import { useContext, useState, useEffect, useRef } from "react"
import {
    ArrowLeft,
    Download,
    Calendar,
    Users,
    DollarSign,
    Code,
    Target,
    Package,
    CheckCircle,
    Server,
    Database,
    Monitor,
    Globe,
    Smartphone,
    Shield,
    ChevronDown,
    ChevronUp,
    FileText,
    Briefcase,
    Settings,
    Sparkles,
    Clock,
    Award,
    TrendingUp,
} from "lucide-react"
import axios from "axios"
import { AppContext } from "../context/AppContext"
import { AuthContext } from "../firebase/AuthContext"

export default function ProjectDisplay() {
    const { projectData, setProjectData } = useContext(AppContext)
    const { user } = useContext(AuthContext)
    const [isDownloading, setIsDownloading] = useState(false)
    const [visibleSections, setVisibleSections] = useState(new Set())
    const sectionsRef = useRef({})

    const [expandedSections, setExpandedSections] = useState({
        modules: false,
        techStack: false,
        timeline: false,
        hr: false,
        software: false,
        licenses: false,
        steps: false,
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

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }

    const getTechIcon = (tech) => {
        const techLower = tech.toLowerCase()
        if (techLower.includes("react") || techLower.includes("frontend")) return Monitor
        if (techLower.includes("node") || techLower.includes("backend")) return Server
        if (techLower.includes("database") || techLower.includes("mongo") || techLower.includes("sql")) return Database
        if (techLower.includes("mobile") || techLower.includes("android") || techLower.includes("ios")) return Smartphone
        if (techLower.includes("security") || techLower.includes("auth")) return Shield
        return Globe
    }

    const formatCurrency = (amount) => {
        if (typeof amount === "string" && amount.includes("$")) return amount
        return `$${amount}`
    }

    const handleDownloadPDF = async () => {
        setIsDownloading(true)

        try {
            const idToken = await user.getIdToken()

            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/download-pdf",
                { data: projectData },
                {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                        "Content-Type": "application/json",
                    },
                },
            )

            const blob = new Blob([response.data], { type: "application/pdf" })
            const link = document.createElement("a")
            link.href = URL.createObjectURL(blob)
            link.download = `${projectData.project_title}.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(link.href)
        } catch (error) {
            console.error("PDF download failed:", error)
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <>
            {/* Enhanced Header */}
            <div className="rounded-3xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-purple-100 dark:border-purple-800 sticky top-0 z-50 shadow-lg transition-all duration-500">
                <div className="container mx-auto p-6">
                    {/* Desktop Layout */}
                    <div className="hide-on-mobile flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => setProjectData(null)}
                                className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl group hover:scale-105 active:scale-95"
                            >
                                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                                <span className="font-medium">Back to Search</span>
                            </button>
                            <div className="h-8 w-px bg-purple-200 dark:bg-purple-700"></div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                                        {projectData.project_title || "Project Proposal"}
                                    </h1>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">AI-Generated Project Plan</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleDownloadPDF}
                            disabled={isDownloading}
                            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isDownloading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <Download className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                            )}
                            <span>{isDownloading ? "Generating..." : "Download Plan"}</span>
                        </button>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-4">
                        {/* Top row with back button and download button */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setProjectData(null)}
                                className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl group hover:scale-105 active:scale-95"
                            >
                                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                                <span className="font-medium">Back to Search</span>
                            </button>
                            <button
                                onClick={handleDownloadPDF}
                                disabled={isDownloading}
                                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {isDownloading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <Download className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                                )}
                                <span className="hidden sm:inline">{isDownloading ? "Generating..." : "Download Plan"}</span>
                            </button>
                        </div>

                        {/* Project title section below */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                                <Award className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                                    {projectData.project_title || "Project Proposal"}
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400">AI-Generated Project Plan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto space-y-8">
                {/* Success Banner */}
                <div
                    id="success-banner"
                    ref={setSectionRef("success-banner")}
                    className={`transition-all duration-1000 ease-out ${isVisible("success-banner") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                >
                    <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 dark:from-green-600 dark:via-emerald-600 dark:to-teal-600 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                        {/* Background decoration */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/80 via-emerald-400/80 to-teal-400/80 dark:from-green-500/60 dark:via-emerald-500/60 dark:to-teal-500/60"></div>
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl -translate-x-16 -translate-y-16"></div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-x-12 translate-y-12"></div>

                        <div className="relative z-10 text-center">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 transition-all duration-300 hover:scale-110">
                                    <CheckCircle className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 hover:text-green-100 transition-colors duration-300">
                                Project Proposal Generated Successfully!
                            </h2>
                            <p className="text-xl text-green-100 max-w-2xl mx-auto">
                                Your comprehensive project plan is ready with detailed specifications, timeline, and budget breakdown.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Project Overview */}
                <div
                    id="project-overview"
                    ref={setSectionRef("project-overview")}
                    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${isVisible("project-overview") ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                        }`}
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-2xl translate-x-16 -translate-y-16"></div>

                    <div className="relative z-10">
                        <div className="flex items-center mb-8">
                            <Target className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                                Project Overview
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="group p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-700 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                        <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">Project Query</p>
                                </div>
                                <p className="font-medium text-gray-900 dark:text-white leading-relaxed">
                                    {projectData.input_summary?.query}
                                </p>
                            </div>

                            <div className="group p-6 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                        <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">Budget Range</p>
                                </div>
                                <p className="font-bold text-2xl text-gray-900 dark:text-white">
                                    {formatCurrency(projectData.input_summary?.budget)}
                                </p>
                            </div>

                            <div className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                        <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Target Location</p>
                                </div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {projectData.input_summary?.location || "Global"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Objective */}
                <div
                    id="objective"
                    ref={setSectionRef("objective")}
                    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-800 p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${isVisible("objective") ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                        }`}
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200/20 dark:bg-blue-600/10 rounded-full blur-2xl -translate-x-16 -translate-y-16"></div>

                    <div className="relative z-10">
                        <div className="flex items-center mb-6">
                            <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 animate-pulse" />
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                                Project Objective
                            </h2>
                        </div>
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{projectData.objective}</p>
                        </div>
                    </div>
                </div>

                {/* Modules */}
                <div
                    id="modules"
                    ref={setSectionRef("modules")}
                    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${isVisible("modules") ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                        }`}
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-2xl translate-x-16 -translate-y-16"></div>

                    <button
                        onClick={() => toggleSection("modules")}
                        className="w-full flex items-center justify-between p-8 text-left hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-300 rounded-t-2xl group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                                    Project Modules
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {projectData.modules?.length || 0} core modules identified
                                </p>
                            </div>
                        </div>
                        <div className="transition-transform duration-300 group-hover:scale-110">
                            {expandedSections.modules ? (
                                <ChevronUp className="w-6 h-6 text-gray-400" />
                            ) : (
                                <ChevronDown className="w-6 h-6 text-gray-400" />
                            )}
                        </div>
                    </button>

                    {expandedSections.modules && (
                        <div className="px-8 pb-8 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {projectData.modules?.map((module, index) => (
                                    <div
                                        key={index}
                                        className={`group p-4 bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-gray-700 dark:to-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-800 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg ${expandedSections.modules ? `animate-[slideInUp_0.6s_ease-out_${index * 100}ms_both]` : "opacity-0"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                                <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">{index + 1}</span>
                                            </div>
                                            <span className="text-gray-900 dark:text-white font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                                                {module}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Technology Stack */}
                <div
                    id="tech-stack"
                    ref={setSectionRef("tech-stack")}
                    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-800 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${isVisible("tech-stack") ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                        }`}
                >
                    <button
                        onClick={() => toggleSection("techStack")}
                        className="w-full flex items-center justify-between p-8 text-left hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-300 rounded-t-2xl group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                    Technology Stack
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Modern technologies and frameworks</p>
                            </div>
                        </div>
                        <div className="transition-transform duration-300 group-hover:scale-110">
                            {expandedSections.techStack ? (
                                <ChevronUp className="w-6 h-6 text-gray-400" />
                            ) : (
                                <ChevronDown className="w-6 h-6 text-gray-400" />
                            )}
                        </div>
                    </button>

                    {expandedSections.techStack && (
                        <div className="px-8 pb-8">
                            <div className="space-y-8">
                                {Object.entries(projectData.technology_stack || {}).map(([category, technologies], categoryIndex) => (
                                    <div key={category}>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            {category.replace("_", " ")}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {technologies.map((tech, index) => {
                                                const IconComponent = getTechIcon(tech)
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`group flex items-center gap-3 p-4 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-700 dark:to-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg ${expandedSections.techStack
                                                                ? `animate-[slideInUp_0.6s_ease-out_${categoryIndex * 100 + index * 50}ms_both]`
                                                                : "opacity-0"
                                                            }`}
                                                    >
                                                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                                            <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                        <span className="text-gray-900 dark:text-white font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                                            {tech}
                                                        </span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Timeline */}
                <div
                    id="timeline"
                    ref={setSectionRef("timeline")}
                    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-green-100 dark:border-green-800 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${isVisible("timeline") ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                        }`}
                >
                    <button
                        onClick={() => toggleSection("timeline")}
                        className="w-full flex items-center justify-between p-8 text-left hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all duration-300 rounded-t-2xl group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                                    Project Timeline
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Detailed development schedule</p>
                            </div>
                        </div>
                        <div className="transition-transform duration-300 group-hover:scale-110">
                            {expandedSections.timeline ? (
                                <ChevronUp className="w-6 h-6 text-gray-400" />
                            ) : (
                                <ChevronDown className="w-6 h-6 text-gray-400" />
                            )}
                        </div>
                    </button>

                    {expandedSections.timeline && (
                        <div className="px-8 pb-8">
                            <div className="space-y-6">
                                {Object.entries(projectData.timeline || {}).map(([week, tasks], index) => (
                                    <div
                                        key={week}
                                        className={`group relative ${expandedSections.timeline
                                                ? `animate-[slideInUp_0.6s_ease-out_${index * 150}ms_both]`
                                                : "opacity-0"
                                            }`}
                                    >
                                        <div className="flex items-start gap-6">
                                            <div className="flex flex-col items-center">
                                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                                    <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                                                </div>
                                                {index < Object.entries(projectData.timeline || {}).length - 1 && (
                                                    <div className="w-0.5 h-16 bg-green-200 dark:bg-green-700 mt-4"></div>
                                                )}
                                            </div>
                                            <div className="flex-1 pb-8">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                                                    {week.replace("_", " ")}
                                                </h3>
                                                <div className="space-y-3">
                                                    {tasks.map((task, taskIndex) => (
                                                        <div
                                                            key={taskIndex}
                                                            className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50/30 dark:from-green-900/20 dark:to-emerald-900/10 rounded-lg hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-green-100 dark:border-green-800"
                                                        >
                                                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{task}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* HR Requirements */}
                <div
                    id="hr-requirements"
                    ref={setSectionRef("hr-requirements")}
                    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-orange-100 dark:border-orange-800 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${isVisible("hr-requirements") ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                        }`}
                >
                    <button
                        onClick={() => toggleSection("hr")}
                        className="w-full flex items-center justify-between p-8 text-left hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-all duration-300 rounded-t-2xl group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                                    Human Resources
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {projectData.HR?.total_employees_required || 0} team members required
                                </p>
                            </div>
                        </div>
                        <div className="transition-transform duration-300 group-hover:scale-110">
                            {expandedSections.hr ? (
                                <ChevronUp className="w-6 h-6 text-gray-400" />
                            ) : (
                                <ChevronDown className="w-6 h-6 text-gray-400" />
                            )}
                        </div>
                    </button>

                    {expandedSections.hr && (
                        <div className="px-8 pb-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {projectData.HR?.roles?.map((role, index) => (
                                    <div
                                        key={index}
                                        className={`group p-6 bg-gradient-to-br from-gray-50 to-orange-50/30 dark:from-gray-700 dark:to-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-800 hover:bg-gradient-to-br hover:from-orange-50 hover:to-amber-50 dark:hover:from-orange-900/20 dark:hover:to-amber-900/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg ${expandedSections.hr ? `animate-[slideInUp_0.6s_ease-out_${index * 150}ms_both]` : "opacity-0"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                                                {role.title}
                                            </h3>
                                            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 rounded-full text-sm font-bold">
                                                {role.count}x
                                            </span>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Experience</p>
                                                    <p className="text-gray-900 dark:text-white font-semibold">
                                                        {role.experience_required_in_years} years
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Salary</p>
                                                    <p className="text-gray-900 dark:text-white font-bold text-green-600 dark:text-green-400">
                                                        {formatCurrency(role.expected_salary)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Required Skills</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {role.skills_required?.map((skill, skillIndex) => (
                                                        <span
                                                            key={skillIndex}
                                                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Pricing */}
                <div
                    id="pricing"
                    ref={setSectionRef("pricing")}
                    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-green-100 dark:border-green-800 p-8 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${isVisible("pricing") ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                        }`}
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/20 dark:bg-green-600/10 rounded-full blur-2xl translate-x-16 -translate-y-16"></div>

                    <div className="relative z-10">
                        <div className="flex items-center mb-8">
                            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" />
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300">
                                Investment Breakdown
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="group p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                        <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">One-time Investment</h3>
                                </div>
                                <div className="space-y-4 mb-6">
                                    {projectData.estimated_pricing?.one_time_cost?.breakdown?.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center py-2">
                                            <span className="text-gray-700 dark:text-gray-300">{item.item}</span>
                                            <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(item.cost)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-green-200 dark:border-green-700 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">Total</span>
                                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            {formatCurrency(projectData.estimated_pricing?.one_time_cost?.total)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="group p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                        <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Monthly Maintenance</h3>
                                </div>
                                <div className="space-y-4 mb-6">
                                    {projectData.estimated_pricing?.monthly_maintenance_cost?.breakdown?.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center py-2">
                                            <span className="text-gray-700 dark:text-gray-300">{item.item}</span>
                                            <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(item.cost)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-blue-200 dark:border-blue-700 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">Total</span>
                                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            {formatCurrency(projectData.estimated_pricing?.monthly_maintenance_cost?.total)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Schedule */}
                <div
                    id="payment-schedule"
                    ref={setSectionRef("payment-schedule")}
                    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${isVisible("payment-schedule") ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                        }`}
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-2xl -translate-x-16 -translate-y-16"></div>

                    <div className="relative z-10">
                        <div className="flex items-center mb-8">
                            <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                                Payment Milestones
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {projectData.payment_schedule?.map((payment, index) => (
                                <div
                                    key={index}
                                    className={`group flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-purple-50/30 dark:from-gray-700 dark:to-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-800 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg ${isVisible("payment-schedule")
                                            ? `animate-[slideInUp_0.6s_ease-out_${index * 100}ms_both]`
                                            : "opacity-0"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                            <span className="text-purple-600 dark:text-purple-400 font-bold">{index + 1}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                                                {payment.milestone}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Milestone {index + 1}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            {formatCurrency(payment.amount)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Deliverables */}
                <div
                    id="deliverables"
                    ref={setSectionRef("deliverables")}
                    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-800 p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${isVisible("deliverables") ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                        }`}
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 dark:bg-blue-600/10 rounded-full blur-2xl translate-x-16 -translate-y-16"></div>

                    <div className="relative z-10">
                        <div className="flex items-center mb-8">
                            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                                Project Deliverables
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projectData.deliverables?.map((deliverable, index) => (
                                <div
                                    key={index}
                                    className={`group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 dark:from-gray-700 dark:to-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg ${isVisible("deliverables") ? `animate-[slideInUp_0.6s_ease-out_${index * 100}ms_both]` : "opacity-0"
                                        }`}
                                >
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    </div>
                                    <span className="text-gray-900 dark:text-white font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                        {deliverable}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Conclusion */}
                <div
                    id="conclusion"
                    ref={setSectionRef("conclusion")}
                    className={`bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${isVisible("conclusion") ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                        }`}
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-2xl -translate-x-16 -translate-y-16"></div>

                    <div className="relative z-10">
                        <div className="flex items-center mb-6">
                            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3 animate-pulse" />
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                                Project Summary
                            </h2>
                        </div>
                        <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl border border-purple-200 dark:border-purple-700">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{projectData.conclusion}</p>
                        </div>
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
