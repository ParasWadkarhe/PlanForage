import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState(() => {
        const storedUser = localStorage.getItem("userInfo");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const userLogIn = (userData) => {
        setUserInfo(userData);
        localStorage.setItem("userInfo", JSON.stringify(userData));
    };

    const userLogOut = () => {
        setUserInfo(null);
        localStorage.removeItem("userInfo");
    };

    



    return (
        <AuthContext.Provider value={{ userInfo, userLogIn, userLogOut }}>
            {children}
        </AuthContext.Provider>
    );
};
