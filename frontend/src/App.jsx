import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import LoadingScreen from './components/LoadingScreen'
import IntroPage from './components/IntroPage';
import axios from 'axios'

const ProtectedRoute = ({ children }) => {
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        }
    }, [userInfo, navigate]);

    return userInfo ? children : null;
}

const App = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + '/')
            .then(response => {
                setIsLoading(!response.data?.isRunning)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark')
            document.documentElement.classList.add('dark');

    }, []);

    return !isLoading ? (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IntroPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={
                    <ProtectedRoute >
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<Login />} />
            </Routes>
        </BrowserRouter>
    ) : (
        <div className="bg-white dark:bg-gray-900">
            <LoadingScreen />
        </div>
    )
};

export default App;
