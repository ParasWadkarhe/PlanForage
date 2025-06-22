import { LogOut, Sun, Moon } from 'lucide-react';
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const { setIsLoggedIn, userInfo, setUserInfo } = useContext(AuthContext)
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
        // setIsProfileMenuOpen(false); // Close menu after action

        document.documentElement.classList.toggle('dark');

        console.log(isDarkMode ? "Switching to light mode" : "Switching to dark mode");
    };

    const handleLogout = () => {
        if (window.google?.accounts?.id) {
            window.google.accounts.id.disableAutoSelect();
        }

        setIsLoggedIn(false);
        setUserInfo(null);
        navigate("/login");
        console.log("User logged out.");
    };

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const closeProfileMenu = () => {
        setIsProfileMenuOpen(false);
    };

    return (
        <nav className="bg-white border-b  border-gray-200 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center">
                            <div className="text-blue-600 font-semibold text-xl">
                                PlanForage
                            </div>
                        </div>
                    </div>

                    {/* Profile Menu */}
                    <div className="flex items-center relative">
                        {userInfo?.picture && (
                            <img
                                src={userInfo.picture}
                                alt="Profile"
                                onClick={toggleProfileMenu}
                                className="w-8 h-8 rounded-full cursor-pointer"
                            />
                        )}
                        {isProfileMenuOpen && (
                            <>
                                {/* Backdrop for mobile */}
                                <div 
                                    className="fixed inset-0 z-10" 
                                    onClick={closeProfileMenu}
                                ></div>
                                <div className="absolute top-full right-0 mt-2 z-20 p-2 bg-white border border-gray-200 rounded-md shadow-lg min-w-max">
                                    {/* <button
                                        onClick={handleThemeToggle}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 flex items-center transition-colors duration-200"
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
                                    </button> */}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 flex items-center transition-colors duration-200"
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