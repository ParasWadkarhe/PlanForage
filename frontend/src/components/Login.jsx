import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';
import { updateProfile } from 'firebase/auth';

function LoginButton() {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        if (isSignup) {
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords don't match!");
                return;
            }
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                await updateProfile(userCredential.user, {
                    displayName: formData.name,
                });
                alert('Account created successfully');
                navigate('/home');
            } catch (err) {
                alert(err.message);
            }
        } else {
            try {
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
                navigate('/home');
            } catch (err) {
                alert(err.message);
            }
        }
    };

    // Replace onGoogleSuccess function with this:
    const onGoogleSuccess = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate('/home');
        } catch (err) {
            alert('Google login failed');
            console.log(err)
        }
    };

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
            {/* Navbar */}
            <nav className={`w-full bg-white dark:bg-gray-900 backdrop-blur-md sticky top-0 z-50 py-2 transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3 cursor-pointer group transition-all duration-300 hover:scale-105" onClick={() => alert('Navigation to home would happen here')}>
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 group-hover:rotate-12">
                            <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400 transition-all duration-300 group-hover:scale-110" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                            PlanForage
                        </h1>
                    </div>

                    <div className='flex gap-8 items-center'>
                        <p className={`text-white text-sm transition-all duration-500 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                            {isSignup ? 'Already playing with PlanForage?' : "Don't have an account?"}
                        </p>

                        <button
                            onClick={() => setIsSignup(prev => !prev)}
                            className={`bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg hover:shadow-purple-500/25 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                            style={{ transitionDelay: '400ms' }}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-80px)]">
                <div className="w-full max-w-md">
                    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-purple-100 dark:border-purple-800 p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
                        style={{ transitionDelay: '200ms' }}>

                        <div className={`text-center mb-8 transition-all duration-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                            style={{ transitionDelay: '400ms' }}>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                                {isSignup ? 'Create Account' : 'Welcome Back'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                                {isSignup
                                    ? 'Sign up to start creating AI-powered project plans'
                                    : 'Sign in to access your AI-powered project planner'
                                }
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Email/Password Form */}
                            <form onSubmit={handleEmailSubmit} className="space-y-4">
                                {isSignup && (
                                    <div className={`relative transition-all duration-500 ${isSignup ? 'opacity-100 max-h-20 translate-y-0' : 'opacity-0 max-h-0 -translate-y-4'}`}>
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:scale-105 hover:shadow-md"
                                        />
                                    </div>
                                )}

                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-200 group-focus-within:text-purple-500">
                                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:scale-105 hover:shadow-md hover:border-purple-300 dark:hover:border-purple-600"
                                    />
                                </div>

                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-200 group-focus-within:text-purple-500">
                                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-10 pr-12 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:scale-105 hover:shadow-md hover:border-purple-300 dark:hover:border-purple-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 hover:scale-110 active:scale-95"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>

                                {isSignup && (
                                    <div className={`relative group transition-all duration-500 ${isSignup ? 'opacity-100 max-h-20 translate-y-0' : 'opacity-0 max-h-0 -translate-y-4'}`}>
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-200 group-focus-within:text-purple-500">
                                            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
                                        </div>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full pl-10 pr-12 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:scale-105 hover:shadow-md hover:border-purple-300 dark:hover:border-purple-600"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 hover:scale-110 active:scale-95"
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2 group"
                                >
                                    {isSignup ? 'Create Account' : 'Sign In'}
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </form>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors duration-300">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            {/* Google Login */}
                            <div className={`flex justify-center transition-all duration-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: '600ms' }}>
                                <div className="transition-all w-full duration-300 hover:scale-105 active:scale-95">
                                    <button
                                        onClick={onGoogleSuccess}
                                        className="
                                            w-full flex items-center justify-center gap-3 px-6 py-3.5 
                                            bg-white dark:bg-gray-800 
                                            border border-gray-200 dark:border-gray-600 
                                            rounded-lg shadow-sm hover:shadow-md dark:hover:shadow-lg
                                            text-gray-700 dark:text-gray-200 
                                            font-medium text-sm
                                            transition-all duration-300 ease-in-out
                                            hover:bg-gray-50 dark:hover:bg-gray-700
                                            hover:border-gray-300 dark:hover:border-gray-500
                                            focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                                            active:scale-95
                                        "
                                    >
                                        <FcGoogle className="w-5 h-5" />
                                        <span>Continue with Google</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={`mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center transition-all duration-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                            style={{ transitionDelay: '700ms' }}>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                By {isSignup ? 'signing up' : 'signing in'}, you agree to our{' '}
                                <span className="text-purple-600 dark:text-purple-400 hover:underline cursor-pointer transition-all duration-200 hover:text-purple-700 dark:hover:text-purple-300">Terms</span>
                                {' '}and{' '}
                                <span className="text-purple-600 dark:text-purple-400 hover:underline cursor-pointer transition-all duration-200 hover:text-purple-700 dark:hover:text-purple-300">Privacy Policy</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginButton;