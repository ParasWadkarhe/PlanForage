import { Upload, Search, Calendar, TrendingUp, FileText, User, LogOut, Moon, Sun} from 'lucide-react';
import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';
import { AppContext } from '../../context/AppContext';

const DashboardContent = () => {

    const { userLogOut, userInfo } = useContext(AuthContext)
    const { dashboardData, setDashboardData } = useContext(AppContext);
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const handleLogout = () => {
        if (window.google?.accounts?.id) {
            window.google.accounts.id.disableAutoSelect();
        }
        userLogOut()
        navigate("/login");
    };

    const handleThemeToggle = () => {
        document.documentElement.classList.toggle('dark');
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            return newMode;
        });
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        }
        
        // Trigger load animation
        setTimeout(() => setIsLoaded(true), 100);
    }, []);

    useEffect(() => {
        if(!userInfo || !userInfo?.sub) return
      axios.get(import.meta.env.VITE_BACKEND_URL + `/user-dashboard/${userInfo.sub}`)
            .then(response => {
                setDashboardData(response.data);
            })
            .catch(error => {
                console.error("Error fetching user dashboard data:", error);
            }
        );  
    
    }, [userInfo])
    

    return (
        <div className="space-y-6">
            {/* Welcome Section with Action Buttons */}
            <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center transition-all duration-300 hover:bg-purple-200 dark:hover:bg-purple-800 hover:scale-[1.01] hover:rotate-3 ${isLoaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'}`}>
                            <User className="w-8 h-8 text-purple-600 dark:text-purple-400 transition-all duration-300" />
                        </div>
                        <div className={`transition-all duration-600 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                                Welcome back, {userInfo.name.split(' ')[0]}!
                            </h2>
                        </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className={`flex items-center gap-3 transition-all duration-600 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                        <button
                            onClick={handleThemeToggle}
                            className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-95 hover:rotate-12"
                            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            <div className="transition-transform duration-300">
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </div>
                        </button>
                        
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 border border-red-200 dark:border-red-800 hover:scale-[1.01] active:scale-95 hover:shadow-md hover:shadow-red-500/20 group"
                            title="Logout"
                        >
                            <LogOut size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] group ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">Total Searches</p>
                            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 transition-all duration-300 group-hover:scale-[1.01]">
                                {dashboardData?.searchCount}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 group-hover:scale-[1.01]">
                            <Search className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                </div>

                <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-6 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] group ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200 group-hover:text-green-600 dark:group-hover:text-green-400">Documents</p>
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400 transition-all duration-300 group-hover:scale-[1.01]">
                                {dashboardData?.documentsUploaded}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-green-200 dark:group-hover:bg-green-800 group-hover:scale-[1.01]">
                            <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </div>

                <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] group ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">Plans Created</p>
                            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 transition-all duration-300 group-hover:scale-[1.01]">
                                {dashboardData?.plansCreated}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 group-hover:scale-[1.01]">
                            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                </div>

                <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-6 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] group ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200 group-hover:text-orange-600 dark:group-hover:text-orange-400">This Month</p>
                            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 transition-all duration-300 group-hover:scale-[1.01]">{dashboardData?.thisMonthSearchCount}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-orange-200 dark:group-hover:bg-orange-800 group-hover:scale-[1.01]">
                            <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    Recent Activity
                </h3>
                <div className="space-y-4">
                    <div className={`flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 hover:shadow-md group cursor-pointer ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 group-hover:scale-[1.01]">
                            <Search className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-900 dark:text-white font-medium transition-colors duration-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">Project Planning Search</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">2 hours ago</p>
                        </div>
                    </div>
                    
                    <div className={`flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 hover:shadow-md group cursor-pointer ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-green-200 dark:group-hover:bg-green-800 group-hover:scale-[1.01]">
                            <Upload className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-900 dark:text-white font-medium transition-colors duration-200 group-hover:text-green-600 dark:group-hover:text-green-400">Document Upload</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">5 hours ago</p>
                        </div>
                    </div>
                    
                    <div className={`flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 hover:shadow-md group cursor-pointer ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 group-hover:scale-[1.01]">
                            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-900 dark:text-white font-medium transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">New Plan Created</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">Yesterday</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardContent