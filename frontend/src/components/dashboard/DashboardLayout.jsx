import { useState, useEffect, useContext } from 'react';
import { Zap, Home, History, Upload, Search, Menu, X, Bell, Settings, LogOut, User} from 'lucide-react';

import DashboardContent from './DashboardContent';
import HistoryContent from './HistoryContent';
import UploadContent from './UploadContent';
import SearchContent from '../search/SearchContent'

import { AppContext } from '../../context/AppContext';

function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const {activeTab, setActiveTab} = useContext(AppContext)

    // Mock user data
    const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        searchCount: 127,
        documentsUploaded: 23,
        plansCreated: 45,
        lastLogin: 'Today at 2:30 PM'
    };

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'search', label: 'Search', icon: Search },
        { id: 'history', label: 'History', icon: History },
        { id: 'upload', label: 'Upload Documents', icon: Upload }
    ];

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        alert('Logout functionality would be implemented here');
    };

    const renderDashboardContent = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardContent userData={userData}/>
            case 'history': return <HistoryContent />
            case 'upload': return <UploadContent />
            case 'search': return <SearchContent />
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 backdrop-blur-md border-b border-purple-100 dark:border-purple-800 z-50 py-2 shadow-sm transition-colors duration-500">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center transition-colors duration-300">
                                <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                                PlanForage
                            </h1>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                            <User className="w-6 h-6" />
                        </button>
                        <button className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                            <Bell className="w-6 h-6" />
                        </button>
                        <button className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                            <Settings className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300"
                        >
                            <LogOut className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            <div className="flex pt-20">
                {/* Sidebar */}
                <div className={`fixed top-0 sm:top-20 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 border-r border-purple-100 dark:border-purple-800 transform transition-transform duration-300 z-200 sm:z-40 overflow-y-auto ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>
                    <div className="flex items-center justify-between p-4 lg:hidden border-b border-purple-100 dark:border-purple-800">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
                        <button
                            onClick={toggleSidebar}
                            className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    
                    <nav className="p-4">
                        <div className="space-y-2 pt-6">
                            {sidebarItems.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveTab(item.id);
                                            setIsSidebarOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                            activeTab === item.id
                                                ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400'
                                        }`}
                                    >
                                        <IconComponent className="w-5 h-5" />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>
                    </nav>
                </div>

                {/* Mobile overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 backdrop-blur-3xl opacity-30 z-30 lg:hidden"
                        onClick={toggleSidebar}
                    ></div>
                )}

                {/* Main content */}
                <div className="flex-1 lg:ml-64 min-h-screen">
                    <main className="container mx-auto px-4 py-8 h-full overflow-y-auto">
                        {renderDashboardContent()}
                    </main>
                </div>
            </div>
        </div>
    );

}

export default DashboardLayout;