// AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);


    useEffect(() => {
        const storedStatus = localStorage.getItem("isLoggedIn");
        if (storedStatus === "true") {
            setIsLoggedIn(true);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn);

        if (isLoggedIn) {
            const storedUser = JSON.parse(localStorage.getItem("userInfo"));
            setUserInfo(storedUser);
        } else {
            setUserInfo(null);
        }
    }, [isLoggedIn]);


    useEffect(() => {
        if (!userInfo) return;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

    }, [userInfo])


    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ ESLint prop validation
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
