import { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Zap, Brain, Clock, Target } from 'lucide-react';

function LoginButton() {
    const navigate = useNavigate();
    const {userLogIn} = useContext(AuthContext)

    const onSuccess = (credentialResponse) => {
        const userInfo = jwtDecode(credentialResponse.credential);
        userLogIn(userInfo);
        navigate("/");
    };

    const onError = () => {
        console.log("Login Failed");
        alert("Login failed. Please try again.");
    };

    const features = [
        {
            icon: <Brain className="w-5 h-5" />,
            title: "AI-Powered Planning",
            description: "Smart project roadmaps generated instantly"
        },
        {
            icon: <Target className="w-5 h-5" />,
            title: "Resource Management",
            description: "Optimize team allocation and budgets"
        },
        {
            icon: <Clock className="w-5 h-5" />,
            title: "Timeline Optimization",
            description: "Realistic schedules that actually work"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-900 flex items-center justify-center p-6">
   <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
       
       {/* Left Side - Product Description */}
       <div className="space-y-8 text-center lg:text-left">
           <div className="space-y-4">
               <div className="flex items-center justify-center lg:justify-start py-4 space-x-2">
                   <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                       <Zap className="w-5 h-5 text-white" />
                   </div>
                   <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">PlanForage</h1>
               </div>
               
               <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                   AI-Powered Project Planning Made Simple
               </h2>
               
               <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0">
                   Transform your ideas into actionable project plans with intelligent resource allocation, 
                   timeline optimization, and cost estimation.
               </p>
           </div>

           {/* Key Features */}
           <div className="space-y-4">
               {features.map((feature, index) => (
                   <div key={index} className="flex items-start space-x-4 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/40 dark:border-gray-700/40">
                       <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400">
                           {feature.icon}
                       </div>
                       <div className="text-left">
                           <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                               {feature.title}
                           </h3>
                           <p className="text-sm text-gray-600 dark:text-gray-300">
                               {feature.description}
                           </p>
                       </div>
                   </div>
               ))}
           </div>

           {/* Trust Indicators */}
           <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500 dark:text-gray-400">
               <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                   <span>Instant Setup</span>
               </div>
               <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                   <span>AI-Driven</span>
               </div>
               <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                   <span>Enterprise Ready</span>
               </div>
           </div>
       </div>

       {/* Right Side - Login Card */}
       <div className="flex justify-center lg:justify-end">
           <div className="w-full max-w-md">
               <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
                   <div className="text-center mb-8">
                       <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                           Get Started
                       </h3>
                       <p className="text-gray-600 dark:text-gray-300">
                           Sign in to create your first AI-powered project plan
                       </p>
                   </div>

                   <div className="space-y-6">
                       <GoogleLogin 
                           onSuccess={onSuccess} 
                           onError={onError}
                           size="large"
                           width="100%"
                           theme={document.documentElement.classList.contains('dark') ? 'filled_blue' : 'outline'}
                       />
                       
                       <div className="relative">
                           <div className="absolute inset-0 flex items-center">
                               <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
                           </div>
                           <div className="relative flex justify-center text-sm">
                               <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Start planning in seconds</span>
                           </div>
                       </div>
                   </div>

                   <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
                       <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                           By signing in, you agree to our{' '}
                           <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Terms</span>
                           {' '}and{' '}
                           <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Privacy Policy</span>
                       </p>
                   </div>
               </div>
           </div>
       </div>
   </div>
</div>
    );
}

export default LoginButton;