"use client"

import { useContext, useEffect, useState, useRef } from "react"
import { FileText, Eye, FileSearch, Sparkles, BookOpen, Zap, ArrowRight } from "lucide-react"
import { AppContext } from "../../context/AppContext"
import { AuthContext } from "../../firebase/AuthContext"
import axios from "axios"

const DocumentSearch = () => {
  const { setProjectData, documents, setDocuments, setActiveTab } = useContext(AppContext)
  const { user } = useContext(AuthContext)
  const [searchingDocId, setSearchingDocId] = useState(null)
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

  const handlePdfSearch = async (doc) => {
    try {
      setSearchingDocId(doc._id)
      const idToken = await user.getIdToken()
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/document-search",
        {
          url: doc.url,
          type: doc.type,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      )
      setProjectData(response.data)
      setActiveTab("search")
    } catch (error) {
      console.error("PDF Search Failed:", error)
    } finally {
      setSearchingDocId(null)
    }
  }

  useEffect(() => {
    if (!user || documents.length) return
    ;(async () => {
      try {
        const idToken = await user.getIdToken()
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/documents", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
        setDocuments(response.data)
      } catch (error) {
        console.error("Error fetching documents:", error)
      }
    })()
  }, [user, documents])

  const getFileIcon = (fileName) => {
    const extension = fileName?.split(".").pop()?.toLowerCase()
    switch (extension) {
      case "pdf":
        return "📄"
      case "doc":
      case "docx":
        return "📝"
      case "jpg":
      case "jpeg":
      case "png":
        return "🖼️"
      case "txt":
        return "📋"
      default:
        return "📁"
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <>
      {/* Documents List */}
      <div
        id="documents-list"
        ref={setSectionRef("documents-list")}
        className={`bg-white mb-8 dark:bg-gray-800 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-800 p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${
          isVisible("documents-list") ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 dark:bg-blue-600/10 rounded-full blur-2xl translate-x-16 -translate-y-16"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 animate-pulse" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                Your Documents
              </h3>
            </div>
            <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-xl font-semibold">
              {documents.length} Document{documents.length !== 1 ? "s" : ""}
            </div>
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:scale-110">
                <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Documents Available</h4>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-lg mb-6">
                Upload documents first to analyze them and generate project proposals.
              </p>
              <button
                onClick={() => setActiveTab("upload")}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 hover:-translate-y-1 hover:shadow-lg group"
              >
                <FileText className="w-5 h-5" />
                Go to Upload
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <div
                  key={doc._id || index}
                  className={`group relative overflow-hidden bg-gradient-to-r from-gray-50 to-blue-50/30 dark:from-gray-700 dark:to-blue-900/10 rounded-xl p-6 border border-blue-100 dark:border-blue-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20 ${
                    searchingDocId === doc._id ? "opacity-75 pointer-events-none" : ""
                  } ${
                    isVisible("documents-list")
                      ? `animate-[slideInUp_0.6s_ease-out_${index * 100}ms_both]`
                      : "opacity-0"
                  }`}
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200/20 dark:bg-blue-600/10 rounded-full blur-xl translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-500"></div>

                  <div className="relative z-10 flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <span className="text-2xl">{getFileIcon(doc.name)}</span>
                    </div>

                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {doc.name || "Untitled Document"}
                      </h4>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        {doc.size && (
                          <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg">
                            📊 {formatFileSize(doc.size)}
                          </span>
                        )}
                        {doc.updatedAt && (
                          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
                            📅 {new Date(doc.updatedAt).toLocaleDateString()}
                          </span>
                        )}
                        <span className="flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg">
                          🤖 AI Ready
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 group/view"
                        title="View Document"
                      >
                        <Eye size={18} className="transition-transform duration-300 group-hover/view:scale-110" />
                      </a>

                      <button
                        onClick={() => handlePdfSearch(doc)}
                        disabled={searchingDocId === doc._id}
                        className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 hover:-translate-y-1 hover:shadow-lg group/search disabled:opacity-50 disabled:cursor-not-allowed"
                        title={searchingDocId === doc._id ? "Analyzing..." : "Analyze Document"}
                      >
                        {searchingDocId === doc._id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span className="hidden sm:inline">Analyzing...</span>
                          </>
                        ) : (
                          <>
                            <FileSearch
                              size={18}
                              className="transition-transform duration-300 group-hover/search:scale-110"
                            />
                            <span className="hidden sm:inline">Analyze</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      {documents.length > 0 && (
        <div
          id="features-section"
          ref={setSectionRef("features-section")}
          className={`bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800 transition-all duration-1000 ease-out ${
            isVisible("features-section") ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          <div className="text-center">
            <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">AI Document Analysis</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our advanced AI technology extracts key insights from your documents to generate comprehensive project
              proposals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🔍",
                title: "Content Extraction",
                description: "Automatically extract key information and requirements from your documents",
                color: "blue",
              },
              {
                icon: "🧠",
                title: "Intelligent Analysis",
                description: "AI-powered analysis to understand project scope and technical requirements",
                color: "indigo",
              },
              {
                icon: "📋",
                title: "Proposal Generation",
                description: "Generate detailed project proposals based on document insights",
                color: "purple",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 bg-white dark:bg-gray-800 rounded-xl border border-${feature.color}-100 dark:border-${feature.color}-800 hover:shadow-lg hover:shadow-${feature.color}-500/10 transition-all duration-300 hover:scale-105 hover:-translate-y-1 group ${
                  isVisible("features-section")
                    ? `animate-[slideInUp_0.6s_ease-out_${index * 200}ms_both]`
                    : "opacity-0"
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h4
                    className={`text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-${feature.color}-600 dark:group-hover:text-${feature.color}-400 transition-colors duration-300`}
                  >
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

export default DocumentSearch
