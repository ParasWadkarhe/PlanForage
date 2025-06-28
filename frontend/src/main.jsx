import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import {AppProvider} from "./context/AppContext"

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
            <AuthProvider>
                <AppProvider>
                    <App />
                </AppProvider>
            </AuthProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
