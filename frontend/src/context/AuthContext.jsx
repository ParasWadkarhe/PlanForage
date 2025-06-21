// AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedStatus = localStorage.getItem("isLoggedIn");
    if (storedStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Save login status to localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ ESLint prop validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
