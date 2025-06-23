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
        console.log("User logged in:", userData);
    };

    const userLogOut = () => {
        console.log("User logged out: ", userInfo);
        setUserInfo(null);
        localStorage.removeItem("userInfo");
    };

    



    return (
        <AuthContext.Provider value={{ userInfo, userLogIn, userLogOut }}>
            {children}
        </AuthContext.Provider>
    );
};
