import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {AppProvider} from "./context/AppContext"
import { AuthProvider } from './firebase/AuthContext';
import { HeroUIProvider } from '@heroui/system';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <AppProvider>
                <HeroUIProvider >
                    <App />
                </HeroUIProvider>
            </AppProvider>
        </AuthProvider>
    </React.StrictMode>
);
