import { LogOut, Sun, Moon, User } from 'lucide-react';
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const { userLogOut, userInfo } = useContext(AuthContext)
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleLogout = () => {
        if (window.google?.accounts?.id) {
            window.google.accounts.id.disableAutoSelect();
        }
        userLogOut()
        navigate("/login");
    };

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const closeProfileMenu = () => {
        setIsProfileMenuOpen(false);
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
    }, []);

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center">
                            <div className="text-blue-600 dark:text-blue-400 font-semibold text-xl">
                                PlanForage
                            </div>
                        </div>
                    </div>

                    {/* Profile Menu */}
                    <div className="flex items-center relative">
                        {userInfo?.picture && !imageError ? (
                            <img
                                src={userInfo.picture}
                                alt="Profile"
                                onClick={toggleProfileMenu}
                                onError={() => setImageError(true)}
                                className="w-8 h-8 rounded-full cursor-pointer"
                            />
                        ) : (
                            <User
                                onClick={toggleProfileMenu}
                                className="w-8 h-8 p-1 text-gray-600 dark:text-gray-300 cursor-pointer border-[1.2px] rounded-full"
                                strokeWidth={1.2}
                            />
                        )}

                        {isProfileMenuOpen && (
                            <>
                                {/* Backdrop for mobile */}
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={closeProfileMenu}
                                ></div>
                                <div className="absolute top-full right-0 mt-2 z-20 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg min-w-max">
                                    <button
                                        onClick={handleThemeToggle}
                                        className="w-full text-left rounded-sm px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center transition-colors duration-200"
                                    >
                                        {isDarkMode ? (
                                            <>
                                                <Sun className="w-4 h-4 mr-2" />
                                                Light Mode
                                            </>
                                        ) : (
                                            <>
                                                <Moon className="w-4 h-4 mr-2" />
                                                Dark Mode
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center transition-colors duration-200"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}