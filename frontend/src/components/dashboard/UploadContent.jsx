import { Upload, FileText} from 'lucide-react';


const UploadContent = () => {
    
    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upload Documents</h2>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-400 dark:hover:border-purple-500 transition-colors duration-200">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-900 dark:text-white font-medium mb-2">
                        Drag and drop your files here
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        or click to browse your files
                    </p>
                    <button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                        Choose Files
                    </button>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Uploaded Documents</h3>
                    <div className="space-y-3">
                        {[
                            { name: "Project_Requirements.pdf", size: "2.4 MB", date: "Dec 25, 2024" },
                            { name: "Timeline_Template.docx", size: "1.2 MB", date: "Dec 24, 2024" },
                            { name: "Budget_Analysis.xlsx", size: "856 KB", date: "Dec 23, 2024" }
                        ].map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 dark:text-white font-medium">{file.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{file.size} • {file.date}</p>
                                    </div>
                                </div>
                                <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadContent
