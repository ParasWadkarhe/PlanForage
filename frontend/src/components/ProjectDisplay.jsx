import { Download, Calendar, Users, Code, Target, CheckCircle, List, DollarSign, FileText } from 'lucide-react';
import { IoArrowBack } from 'react-icons/io5';
import { useState } from 'react';
import axios from 'axios';

export default function ProjectDisplay({ data, onBackToSearch }) {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadPDF = () => {
        setIsDownloading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL + '/download-pdf',
            { data },
            { responseType: 'blob' },
        )
            .then((response) => {
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `${data.project_title}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            })
            .catch((error) => {
                console.error('PDF download failed:', error);
            })
            .finally(() => {
                setIsDownloading(false);
            });
    };

    const getTypeColor = (type) => {
        const colors = {
            'frontend': 'bg-blue-100 text-blue-700',
            'backend': 'bg-green-100 text-green-700',
            'database': 'bg-purple-100 text-purple-700',
            'ai': 'bg-orange-100 text-orange-700',
            'setup': 'bg-gray-100 text-gray-700',
            'integration': 'bg-indigo-100 text-indigo-700',
            'testing': 'bg-red-100 text-red-700',
            'deployment': 'bg-yellow-100 text-yellow-700'
        };
        return colors[type] || 'bg-gray-100 text-gray-700';
    };

    const getCurrencySymbol = (currency) => {
        const symbols = {
            inr: '₹',
            usd: '$',
            eur: '€',
            gbp: '£',
            jpy: '¥',
            cad: 'C$',
            aud: 'A$',
        };
        return symbols[currency?.toLowerCase()] || '';
    };

    const currencySymbol = getCurrencySymbol(data.currency);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900">
            {/* Header with Back Button and Download Button */}
            <div className="flex flex-col gap-6 md:flex-row justify-between items-center mb-8">

                <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{data.project_title}</h1>

                <div className="w-full md:w-auto justify-between flex md:items-center order-first md:order-none">
                    <button
                        onClick={() => onBackToSearch(null)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 mr-4"
                    >
                        <IoArrowBack className="w-5 h-5 mr-1" />
                        Back
                    </button>

                    <button
                        onClick={handleDownloadPDF}
                        disabled={isDownloading}
                        className={`inline-flex items-center px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${isDownloading
                                ? 'text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                : 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
                            }`}
                    >
                        {isDownloading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mr-2"></div>
                                Generating PDF...
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Objective */}
            {data.objective && (
                <section className="mb-8">
                    <div className="flex items-center mb-3">
                        <Target className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">Objective</h2>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.objective}</p>
                </section>
            )}

            {/* Modules */}
            {data.modules && data.modules.length > 0 && (
                <section className="mb-8">
                    <div className="flex items-center mb-3">
                        <List className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">Modules</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {data.modules.map((module, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded text-sm text-gray-700 dark:text-gray-300">
                                {module}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Technology Stack */}
            {data.technology_stack && Object.keys(data.technology_stack).length > 0 && (
                <section className="mb-8">
                    <div className="flex items-center mb-4">
                        <Code className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">Technology Stack</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.entries(data.technology_stack).map(([category, technologies]) => (
                            technologies && technologies.length > 0 && (
                                <div key={category} className="space-y-2">
                                    <h3 className="font-medium text-gray-900 dark:text-gray-100 capitalize">{category.replace('_', ' ')}</h3>
                                    <div className="space-y-1">
                                        {technologies.map((tech, index) => (
                                            <div key={index} className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                                                {tech}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </section>
            )}

            {/* Timeline */}
            {data.timeline && Object.keys(data.timeline).length > 0 && (
                <section className="mb-8">
                    <div className="flex items-center mb-4">
                        <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">Timeline</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Object.entries(data.timeline).map(([week, tasks]) => (
                            tasks && tasks.length > 0 && (
                                <div key={week} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
                                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 capitalize">{week.replace('_', ' ')}</h3>
                                    <div className="space-y-1">
                                        {tasks.map((task, index) => (
                                            <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                                                • {task}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </section>
            )}

            {/* HR Requirements */}
            {data.HR && (data.HR.total_employees_required || (data.HR.roles && data.HR.roles.length > 0)) && (
                <section className="mb-8">
                    <div className="flex items-center mb-4">
                        <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">Human Resources</h2>
                    </div>
                    {data.HR.total_employees_required && (
                        <div className="mb-4">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Total Employees Required: </span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">{data.HR.total_employees_required}</span>
                        </div>
                    )}
                    {data.HR.roles && data.HR.roles.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {data.HR.roles.map((role, index) => (
                                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium text-gray-900 dark:text-gray-100">{role.title}</h3>
                                        {role.count && (
                                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Count: {role.count}</span>
                                        )}
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        {role.experience_required_in_years && (
                                            <div>
                                                <span className="text-gray-600 dark:text-gray-400">Experience: </span>
                                                <span className="text-gray-900 dark:text-gray-100">{role.experience_required_in_years} years</span>
                                            </div>
                                        )}
                                        {role.expected_salary && (
                                            <div>
                                                <span className="text-gray-600 dark:text-gray-400">Expected Salary: </span>
                                                <span className="text-gray-900 dark:text-gray-100">{currencySymbol}{role.expected_salary}</span>
                                            </div>
                                        )}
                                        {role.skills_required && role.skills_required.length > 0 && (
                                            <div>
                                                <span className="text-gray-600 dark:text-gray-400">Skills: </span>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {role.skills_required.map((skill, skillIndex) => (
                                                        <span key={skillIndex} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* Deliverables */}
            {data.deliverables && data.deliverables.length > 0 && (
                <section className="mb-8">
                    <div className="flex items-center mb-3">
                        <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">Deliverables</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {data.deliverables.map((deliverable, index) => (
                            <div key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-3"></div>
                                {deliverable}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Implementation Steps */}
            {data.steps && data.steps.length > 0 && (
                <section className="mb-8">
                    <div className="flex items-center mb-4">
                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">Implementation Steps</h2>
                    </div>
                    <div className="space-y-4">
                        {data.steps.map((step, index) => (
                            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center">
                                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 mr-3">Step {index + 1}</span>
                                        {step.type && (
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(step.type)}`}>
                                                {step.type}
                                            </span>
                                        )}
                                    </div>
                                    {step.estimated_time_in_days && (
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{step.estimated_time_in_days} days</span>
                                    )}
                                </div>
                                {step.description && (
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">{step.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Pricing and Conclusion */}
            {(data.estimated_pricing || data.conclusion) && (
                <section className="mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {data.estimated_pricing && (
                            <div>
                                <div className="flex items-center mb-3">
                                    <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                                    <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">Estimated Pricing</h2>
                                </div>
                                <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{currencySymbol}{data.estimated_pricing}</div>
                            </div>
                        )}
                        {data.conclusion && (
                            <div>
                                <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">Conclusion</h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.conclusion}</p>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}