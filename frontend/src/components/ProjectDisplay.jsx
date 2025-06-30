import { useContext, useState } from 'react';
import { ArrowLeft, Download, Calendar, Users, DollarSign, Code, Target, Package, Clock, CheckCircle, Server, Database, Monitor, Globe, Smartphone, Shield, ChevronDown, ChevronUp, FileText, Briefcase, Settings } from 'lucide-react';
import axios from 'axios'
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../firebase/AuthContext';

export default function ProjectDisplay() {

    const { projectData, setProjectData } = useContext(AppContext);
    const { user } = useContext(AuthContext)

    const [expandedSections, setExpandedSections] = useState({
        modules: false,
        techStack: false,
        timeline: false,
        hr: false,
        software: false,
        licenses: false,
        steps: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const getTechIcon = (tech) => {
        const techLower = tech.toLowerCase();
        if (techLower.includes('react') || techLower.includes('frontend')) return Monitor;
        if (techLower.includes('node') || techLower.includes('backend')) return Server;
        if (techLower.includes('database') || techLower.includes('mongo') || techLower.includes('sql')) return Database;
        if (techLower.includes('mobile') || techLower.includes('android') || techLower.includes('ios')) return Smartphone;
        if (techLower.includes('security') || techLower.includes('auth')) return Shield;
        return Globe;
    };

    const formatCurrency = (amount) => {
        if (typeof amount === 'string' && amount.includes('$')) return amount;
        return `$${amount}`;
    };

    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadPDF = async () => {
        setIsDownloading(true);

        try {
            const idToken = await user.getIdToken(); // Get Firebase token

            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + '/download-pdf',
                { data: projectData },
                {
                    responseType: 'blob',
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${projectData.project_title}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('PDF download failed:', error);
        }

        setTimeout(() => {
            setIsDownloading(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen  bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
            {/* Header */}
            <div className="bg-white mb-4 rounded-xl shadow-sm border border-purple-100 dark:border-purple-800 dark:bg-gray-800 border-b sticky top-0 z-10 backdrop-blur-md animate-fade-in">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setProjectData(null)}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg group"
                            >
                                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                                Back
                            </button>
                            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {projectData.project_title || 'Project Plan'}
                            </h1>
                        </div>
                        <button
                            onClick={handleDownloadPDF}
                            className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <Download className="w-5 h-5" />
                            Download Plan
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto space-y-4">
                {/* Input Summary */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-purple-100 dark:border-purple-800 p-6 animate-slide-up delay-100">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-600" />
                        Project Overview
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Query</p>
                            <p className="font-medium text-gray-900 dark:text-white">{projectData.input_summary?.query}</p>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Budget</p>
                            <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(projectData.input_summary?.budget)}</p>
                        </div>
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                            <p className="font-medium text-gray-900 dark:text-white">{projectData.input_summary?.location}</p>
                        </div>
                    </div>
                </div>

                {/* Objective */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-purple-100 dark:border-purple-800 p-6 animate-slide-up delay-200">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-600" />
                        Objective
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{projectData.objective}</p>
                </div>

                {/* Modules */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-purple-100 dark:border-purple-800 animate-slide-up delay-300">
                    <button
                        onClick={() => toggleSection('modules')}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 rounded-t-xl"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Package className="w-5 h-5 text-purple-600" />
                            Modules ({projectData.modules?.length || 0})
                        </h2>
                        {expandedSections.modules ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    {expandedSections.modules && (
                        <div className="px-6 pb-6 animate-fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {projectData.modules?.map((module, index) => (
                                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                                                <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">{index + 1}</span>
                                            </div>
                                            <span className="text-gray-900 dark:text-white font-medium">{module}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Technology Stack */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-purple-100 dark:border-purple-800 animate-slide-up delay-400">
                    <button
                        onClick={() => toggleSection('techStack')}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 rounded-t-xl"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Code className="w-5 h-5 text-purple-600" />
                            Technology Stack
                        </h2>
                        {expandedSections.techStack ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    {expandedSections.techStack && (
                        <div className="px-6 pb-6 animate-fade-in">
                            <div className="space-y-6">
                                {Object.entries(projectData.technology_stack || {}).map(([category, technologies]) => (
                                    <div key={category}>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 capitalize">{category}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {technologies.map((tech, index) => {
                                                const IconComponent = getTechIcon(tech);
                                                return (
                                                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                                                        <IconComponent className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                                        <span className="text-gray-900 dark:text-white">{tech}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Timeline */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-purple-100 dark:border-purple-800 animate-slide-up delay-500">
                    <button
                        onClick={() => toggleSection('timeline')}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 rounded-t-xl"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-purple-600" />
                            Timeline
                        </h2>
                        {expandedSections.timeline ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    {expandedSections.timeline && (
                        <div className="px-6 pb-6 animate-fade-in">
                            <div className="space-y-4">
                                {Object.entries(projectData.timeline || {}).map(([week, tasks]) => (
                                    <div key={week} className="border-l-4 border-purple-200 dark:border-purple-700 pl-6 py-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 capitalize">{week.replace('_', ' ')}</h3>
                                        <ul className="space-y-2">
                                            {tasks.map((task, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700 dark:text-gray-300">{task}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* HR Requirements */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-purple-100 dark:border-purple-800 animate-slide-up delay-600">
                    <button
                        onClick={() => toggleSection('hr')}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 rounded-t-xl"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Users className="w-5 h-5 text-purple-600" />
                            Human Resources ({projectData.HR?.total_employees_required || 0} total)
                        </h2>
                        {expandedSections.hr ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    {expandedSections.hr && (
                        <div className="px-6 pb-6 animate-fade-in">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {projectData.HR?.roles?.map((role, index) => (
                                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{role.title}</h3>
                                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                                                {role.count}x
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Experience Required</p>
                                                <p className="text-gray-900 dark:text-white">{role.experience_required_in_years} years</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Expected Salary</p>
                                                <p className="text-gray-900 dark:text-white font-medium">{formatCurrency(role.expected_salary)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Skills Required</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {role.skills_required?.map((skill, skillIndex) => (
                                                        <span key={skillIndex} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded text-xs">
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
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-purple-100 dark:border-purple-800 p-6 animate-slide-up delay-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-purple-600" />
                        Estimated Pricing
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg flex flex-col">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">One-time Costs</h3>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="space-y-3">
                                    {projectData.estimated_pricing?.one_time_cost?.breakdown?.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <span className="text-gray-700 dark:text-gray-300">{item.item}</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(item.cost)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-600 pt-3 mt-3">
                                    <div className="flex justify-between items-center font-semibold text-lg">
                                        <span className="text-gray-900 dark:text-white">Total</span>
                                        <span className="text-green-600 dark:text-green-400">{formatCurrency(projectData.estimated_pricing?.one_time_cost?.total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex flex-col">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Monthly Maintenance</h3>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="space-y-3">
                                    {projectData.estimated_pricing?.monthly_maintenance_cost?.breakdown?.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <span className="text-gray-700 dark:text-gray-300">{item.item}</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(item.cost)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-600 pt-3 mt-3">
                                    <div className="flex justify-between items-center font-semibold text-lg">
                                        <span className="text-gray-900 dark:text-white">Total</span>
                                        <span className="text-blue-600 dark:text-blue-400">{formatCurrency(projectData.estimated_pricing?.monthly_maintenance_cost?.total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Schedule */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-purple-100 dark:border-purple-800 p-6 animate-slide-up delay-800">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-purple-600" />
                        Payment Schedule
                    </h2>
                    <div className="space-y-4">
                        {projectData.payment_schedule?.map((payment, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                                        <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">{index + 1}</span>
                                    </div>
                                    <span className="text-gray-900 dark:text-white font-medium">{payment.milestone}</span>
                                </div>
                                <span className="text-lg font-semibold text-green-600 dark:text-green-400">{formatCurrency(payment.amount)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Deliverables */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-purple-100 dark:border-purple-800 p-6 animate-slide-up delay-900">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-600" />
                        Deliverables
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projectData.deliverables?.map((deliverable, index) => (
                            <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-900 dark:text-white">{deliverable}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Conclusion */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl shadow-sm border border-purple-100 dark:border-purple-800 p-6 animate-slide-up delay-1000">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-purple-600" />
                        Conclusion
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{projectData.conclusion}</p>
                </div>
            </div>

        </div>
    );
};
