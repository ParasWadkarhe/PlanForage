import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import
import { useState } from "react";
import { LogOut, User, Shield } from 'lucide-react';

function LoginButton() {
  const [user, setUser] = useState(false);

  const onSuccess = (credentialResponse) => {
    const userData = jwtDecode(credentialResponse.credential);
    console.log("Login Success:", userData);
    setUser(true);
  };

  const onError = () => {
    console.log("Login Failed");
    user(false);
  };

  const handleLogout = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }

    localStorage.clear();
    setUser(false);
    console.log("✅ User logged out.");
    alert("You have been logged out.");
  };

  return (
    <>
     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-6">
      <div className="relative">
        {/* Decorative background elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-2xl"></div>
        
        {/* Main container */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 min-w-[400px]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              {user ? 'Welcome Back!' : 'Get Started'}
            </h2>
            <p className="text-gray-600 text-lg">
              {user ? 'You are successfully signed in' : 'Sign in to continue to your account'}
            </p>
          </div>

          {/* Authentication content */}
          <div className="space-y-6">
            {!user ? (
              <div className="flex justify-center">
                <GoogleLogin onSuccess={onSuccess} onError={onError} />
              </div>
            ) : (
              <div className="text-center space-y-6">
                {/* User profile section */}
                <div className="flex items-center justify-center space-x-4 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200/50">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800 text-lg">Authentication Success</p>
                    <p className="text-gray-600">You&apos;re now signed in securely</p>
                  </div>
                </div>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="group flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-lg">Sign Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200/50 text-center">
            <p className="text-gray-500 text-sm">
              Secure authentication powered by modern technology
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default LoginButton;
