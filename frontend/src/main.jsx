import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {AppProvider} from "./context/AppContext"
import { AuthProvider } from './firebase/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <AppProvider>
                <App />
            </AppProvider>
        </AuthProvider>
    </React.StrictMode>
);
