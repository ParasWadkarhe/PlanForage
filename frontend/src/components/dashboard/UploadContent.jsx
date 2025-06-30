import { Upload, FileText, Trash2, Download, Eye } from 'lucide-react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../firebase/AuthContext';
import { motion } from 'framer-motion';
import { 
    fadeIn, 
    fadeInUp, 
    fadeInDown, 
    scaleIn, 
    slideUp, 
    hoverScale, 
    iconHover, 
    listItem 
} from '../utils/motionPresets';

const UploadContent = () => {

    const [file, setFile] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [deletingDocId, setDeletingDocId] = useState(null); // Track which document is being deleted
    const {user} = useContext(AuthContext);
    const [documents, setDocuments] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const idToken = await user.getIdToken(); 

            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/document",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                        "Content-Type": "multipart/form-data"
                    },
                    onUploadProgress: (progressEvent) => {
                        console.log("Upload progress: ", Math.round((progressEvent.loaded * 100) / progressEvent.total));
                    },
                }
            );

            console.log("Server response:", res.data);
            setFile(null); // Clear selected file after successful upload
            fetchDocuments();
        } catch (err) {
            console.error("Upload failed:", err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleViewDocument = (doc) => {
        // Function to view/preview document
        console.log("Viewing document:", doc);
        // You can implement document preview functionality here
        // For example, open in a modal or new tab
    };

    const handleDeleteDocument = async (doc) => {
        setDeletingDocId(doc._id); // Set loading state for this specific document
        
        try {
            const idToken = await user.getIdToken();
            const response = await axios.delete(
                import.meta.env.VITE_BACKEND_URL + `/document/${doc._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    }
                }
            );
            
            console.log("Document deleted:", response.data);
            // Remove the deleted document from the state
            setDocuments(documents.filter(d => d._id !== doc._id));
        } catch (error) {
            console.error("Error deleting document:", error);  
        } finally {
            setDeletingDocId(null); // Clear loading state
        }
    };

    const fetchDocuments = async () => {
        if (!user) return;
        
        try {
            const idToken = await user.getIdToken();
            const response = await axios.get(
                import.meta.env.VITE_BACKEND_URL + '/documents',
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    }
                }
            );
            setDocuments(response.data);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, [user])
    

    return (
        <motion.div className="space-y-6" {...fadeIn}>
            <motion.div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-6" {...fadeInUp}>
                <motion.h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6" {...fadeInDown}>
                    Upload Documents
                </motion.h2>
                
                {/* Enhanced File Upload Area */}
                <motion.div 
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                        isDragOver 
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                            : file 
                                ? 'border-green-400 bg-green-50 dark:bg-green-900/20' 
                                : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    {...scaleIn}
                >
                    <input 
                        type="file" 
                        onChange={handleFileSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    />
                    
                    <div className="pointer-events-none">
                        <motion.div {...iconHover}>
                            <Upload className={`w-12 h-12 mx-auto mb-4 ${
                                file ? 'text-green-500' : 'text-gray-400'
                            }`} />
                        </motion.div>
                        
                        {file ? (
                            <motion.div className="space-y-2" {...slideUp}>
                                <p className="text-lg font-medium text-green-700 dark:text-green-400">
                                    File Selected: {file.name}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div className="space-y-2" {...fadeIn}>
                                <p className="text-lg font-medium text-gray-900 dark:text-white">
                                    Drop your files here, or <span className="text-purple-600 dark:text-purple-400">browse</span>
                                </p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Upload Button */}
                {file && (
                    <motion.div className="mt-4 flex justify-center" {...slideUp}>
                        <motion.button 
                            onClick={handleSubmit}
                            disabled={isUploading}
                            className="px-6 py-3 bg-gradient-to-r bg-purple-600  hover:bg-purple-70 disabled:bg-gray-400  text-white font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center gap-2"
                            {...hoverScale}
                        >
                            {isUploading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4" />
                                    Upload Document
                                </>
                            )}
                        </motion.button>
                    </motion.div>
                )}

                <motion.div className="mt-8" {...fadeInUp}>
                    <motion.h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4" {...fadeInDown}>
                        Uploaded Documents
                    </motion.h3>
                    <div className="space-y-3">
                        {documents.map((doc, index) => (
                            <motion.div 
                                key={index} 
                                className={`flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200 ${
                                    deletingDocId === doc._id ? 'opacity-50' : ''
                                }`}
                                {...listItem(index)}
                            >
                                <div className="flex items-center gap-3">
                                    <motion.div className="w-10 h-10  bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center" {...iconHover}>
                                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </motion.div>
                                    
                                    <div>
                                        <p className="text-gray-900 dark:text-white font-medium">
                                            {doc.name || 'Untitled Document'}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {doc.size && `${(doc.size / 1024 / 1024).toFixed(1)} MB`} 
                                            {doc.size && doc.updatedAt && ' • '}
                                            {doc.updatedAt && new Date(doc.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex items-center gap-2">
                                    <motion.button 
                                        onClick={() => handleViewDocument(doc)}
                                        disabled={deletingDocId === doc._id}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg group disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="View Document"
                                        {...hoverScale}
                                    >
                                        <Eye className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                                    </motion.button>
                                    
                                    <motion.button 
                                        onClick={() => handleDeleteDocument(doc)}
                                        disabled={deletingDocId === doc._id}
                                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg group disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                                        title={deletingDocId === doc._id ? "Deleting..." : "Delete Document"}
                                        {...hoverScale}
                                    >
                                        {deletingDocId === doc._id ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-red-600 dark:border-red-400 border-t-transparent rounded-full animate-spin"></div>
                                                <span className="text-xs">Deleting...</span>
                                            </>
                                        ) : (
                                            <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                                        )}
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                        {documents.length === 0 && (
                            <motion.div className="text-center py-12" {...fadeIn}>
                                <motion.div {...iconHover}>
                                    <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                </motion.div>
                                <p className="text-gray-500 dark:text-gray-400 text-lg">No documents uploaded yet</p>
                                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Upload your first document to get started</p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default UploadContent