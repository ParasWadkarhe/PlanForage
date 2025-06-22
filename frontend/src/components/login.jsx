import { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Calendar, Users, DollarSign } from 'lucide-react';

function LoginButton() {
    const navigate = useNavigate();
    const {setIsLoggedIn, setUserInfo, userInfo} = useContext(AuthContext)

    const onSuccess = (credentialResponse) => {
        const userInfo = jwtDecode(credentialResponse.credential);
        // localStorage.setItem("user", JSON.stringify(userInfo));
        setUserInfo(userInfo);
        setIsLoggedIn(true);
        navigate("/");
    };

    const onError = () => {
        console.log("Login Failed");
        setUserInfo(null)
        setIsLoggedIn(false);
        alert("Login failed. Please try again.");
    };

    useEffect(() => {
        if(!userInfo) return

        console.log("User logged in successfully.");
        navigate("/");
    }, [userInfo])

    const features = [
        {
            icon: <MapPin className="w-6 h-6 text-blue-600" />,
            title: "Project Roadmaps",
            description: "Create detailed roadmaps with clear milestones and deliverables."
        },
        {
            icon: <Calendar className="w-6 h-6 text-blue-600" />,
            title: "Strategic Planning",
            description: "Plan implementation steps with timeline and resource allocation."
        },
        {
            icon: <Users className="w-6 h-6 text-blue-600" />,
            title: "HR Management",
            description: "Manage human resources and team assignments effectively."
        },
        {
            icon: <DollarSign className="w-6 h-6 text-blue-600" />,
            title: "Cost Estimation",
            description: "Get accurate pricing estimates for your project requirements."
        }
    ];

    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Side - Branding & Features */}
                    <div className="order-2 lg:order-1 space-y-8">
                        {/* Logo & Description */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-4">
                                PlanForage
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 mb-2">
                                Plan smarter. Deliver better.
                            </p>
                            <p className="text-gray-500 max-w-lg mx-auto lg:mx-0">
                                Everything you need to plan, track, and deliver your projects without the headaches. 
                                Simple, fast, and built for growing teams.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/80">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 text-xs leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                        <div className="bg-white rounded-md shadow-xl p-8 w-full max-w-sm border border-gray-100">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                                <p className="text-gray-600 text-sm">Sign in to access your projects</p>
                            </div>

                            <div className="space-y-6">
                                <GoogleLogin 
                                    onSuccess={onSuccess} 
                                    onError={onError}
                                    size="large"
                                    width="100%"
                                />
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    By continuing, you agree to our 
                                    <br />
                                    <span className="text-blue-600 hover:underline cursor-pointer">Terms of Service</span> and 
                                    <span className="text-blue-600 hover:underline cursor-pointer"> Privacy Policy</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA Section */}
                <div className="mt-16 lg:mt-20 text-center">
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20 shadow-sm max-w-3xl mx-auto">
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                            Ready to Transform Your Project Management?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Join PlanForage and deliver exceptional results.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>Free to get started</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>AI-powered insights</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <span>Output in seconds</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginButton;