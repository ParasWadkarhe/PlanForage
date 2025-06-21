import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'; 
import { AuthProvider } from './context/AuthContext';

const clientId = "127337251982-ghu37hqpg6n68o2r1ikov5n8au3f8ii5.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
      <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
