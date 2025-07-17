"use client"

import { Upload, FileText, Trash2, Eye, Sparkles, Cloud, CheckCircle } from "lucide-react"
import axios from "axios"
import { useState, useEffect, useContext, useRef } from "react"
import { AuthContext } from "../../firebase/AuthContext"
import { AppContext } from "../../context/AppContext"

const UploadContent = () => {
  const [file, setFile] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [deletingDocId, setDeletingDocId] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const sectionsRef = useRef({})
  const { user } = useContext(AuthContext)
  const { documents, setDocuments } = useContext(AppContext)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const idToken = await user.getIdToken()

      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/document", formData, {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(progress)
        },
      })

      console.log("Server response:", res.data)
      setFile(null)
      setUploadProgress(0)

      setDocuments((prevDocs) => [...prevDocs, { ...res.data.document }])
    } catch (err) {
      console.error("Upload failed:", err)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleDeleteDocument = async (doc) => {
    setDeletingDocId(doc._id)

    try {
      const idToken = await user.getIdToken()
      const response = await axios.delete(import.meta.env.VITE_BACKEND_URL + `/document/${doc._id}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })

      if (!response.data.error) {
        setDocuments(documents.filter((d) => d._id !== doc._id))
      }
    } catch (error) {
      console.error("Error deleting document:", error)
    } finally {
      setDeletingDocId(null)
    }
  }

  useEffect(() => {
    if (!user) return
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
  }, [user])

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="space-y-8 p-6">
        {/* Header Section with Gradient */}
        <div
          id="upload-header"
          ref={setSectionRef("upload-header")}
          className={`transition-all duration-1000 ease-out ${
            isVisible("upload-header") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-700 dark:via-blue-700 dark:to-indigo-700 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/80 via-blue-400/80 to-indigo-400/80 dark:from-purple-500/60 dark:via-blue-500/60 dark:to-indigo-500/60"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-x-12 translate-y-12"></div>

            <div className="relative z-10 flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 transition-all duration-300 hover:scale-110">
                <Cloud className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 hover:text-purple-100 transition-colors duration-300">
                  Document Upload
                </h1>
                <p className="text-purple-100 text-lg">Securely store and manage your project documents</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div
          id="upload-section"
          ref={setSectionRef("upload-section")}
          className={`transition-all duration-1000 ease-out ${
            isVisible("upload-section") ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1">
            <div className="flex items-center mb-8">
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3 animate-pulse" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                Upload New Document
              </h2>
            </div>

            {/* Enhanced File Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-500 group ${
                isDragOver
                  ? "border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 scale-105"
                  : file
                    ? "border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30"
                    : "border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-gradient-to-br hover:from-purple-50/50 hover:to-blue-50/50 dark:hover:from-purple-900/10 dark:hover:to-blue-900/10"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-xl translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-500"></div>

              <input
                type="file"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                // accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                accept=".pdf"
              />

              <div className="pointer-events-none relative z-0">
                <div
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    file
                      ? "bg-green-100 dark:bg-green-900 scale-110"
                      : "bg-purple-100 dark:bg-purple-900 group-hover:scale-110 group-hover:rotate-6"
                  }`}
                >
                  {file ? (
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                  ) : (
                    <Upload className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                  )}
                </div>

                {file ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl border border-green-200 dark:border-green-800">
                      <span className="text-2xl">{getFileIcon(file.name)}</span>
                      <div className="text-left">
                        <p className="text-lg font-semibold text-green-700 dark:text-green-400">{file.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      Drop your files here
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      or{" "}
                      <span className="text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200">
                        browse
                      </span>{" "}
                      to choose files
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {["PDF"].map((format) => (
                        <span
                          key={format}
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Button and Progress */}
            {file && (
              <div className="mt-8 space-y-4">
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    onClick={handleSubmit}
                    disabled={isUploading}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 transform hover:scale-110 disabled:scale-100 disabled:cursor-not-allowed flex items-center gap-3 hover:shadow-2xl active:scale-95"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Uploading... {uploadProgress}%
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        Upload Document
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Documents List Section */}
        <div
          id="documents-list"
          ref={setSectionRef("documents-list")}
          className={`transition-all duration-1000 ease-out ${
            isVisible("documents-list") ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                  Your Documents
                </h2>
              </div>
              <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-xl font-semibold">
                {documents.length} Document{documents.length !== 1 ? "s" : ""}
              </div>
            </div>

            {documents.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:scale-110">
                  <FileText className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Documents Yet</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-lg">
                  Upload your first document to get started with organizing your project files.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <div
                    key={doc._id || index}
                    className={`group relative overflow-hidden bg-gradient-to-r from-gray-50 to-purple-50/30 dark:from-gray-700 dark:to-purple-900/10 rounded-xl p-6 border border-purple-100 dark:border-purple-800 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20 ${
                      deletingDocId === doc._id ? "opacity-50 pointer-events-none" : ""
                    } ${
                      isVisible("documents-list")
                        ? `animate-[slideInUp_0.6s_ease-out_${index * 100}ms_both]`
                        : "opacity-0"
                    }`}
                  >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-xl translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-500"></div>

                    <div className="relative z-10 flex items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <span className="text-2xl">{getFileIcon(doc.name)}</span>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                          {doc.name || "Untitled Document"}
                        </h3>
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
                          onClick={() => handleDeleteDocument(doc)}
                          disabled={deletingDocId === doc._id}
                          className="p-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 group/delete disabled:opacity-50 disabled:cursor-not-allowed"
                          title={deletingDocId === doc._id ? "Deleting..." : "Delete Document"}
                        >
                          {deletingDocId === doc._id ? (
                            <div className="w-5 h-5 border-2 border-red-600 dark:border-red-400 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Trash2
                              size={18}
                              className="transition-transform duration-300 group-hover/delete:scale-110"
                            />
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

export default UploadContent
