import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
            <ProtectedRoute >
                <Home />
            </ProtectedRoute>
        } />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
