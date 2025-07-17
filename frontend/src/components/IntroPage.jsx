import { FileText, Zap, DollarSign, MapPin, Users, Clock, ChevronRight, Sparkles, Star, CheckCircle, ArrowRight, BarChart3, Shield, Globe } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const IntroPage = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionsRef = useRef({});
  const navigate = useNavigate()

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    Object.values(sectionsRef.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (id) => (el) => {
    sectionsRef.current[id] = el;
  };

  const isVisible = (id) => visibleSections.has(id);

  const features = [
    {
      icon: DollarSign,
      title: "Budget Breakdown",
      description: "Detailed cost analysis including one-time expenses and monthly maintenance costs, all within your specified budget constraints.",
      color: "blue",
      delay: "delay-0"
    },
    {
      icon: Clock,
      title: "Timeline Planning", 
      description: "Week-by-week project timeline with realistic milestones and deliverables based on project complexity and scope.",
      color: "green",
      delay: "delay-100"
    },
    {
      icon: Users,
      title: "Team Requirements",
      description: "Complete HR analysis including required roles, skills, experience levels, and salary expectations for your project team.",
      color: "purple",
      delay: "delay-200"
    },
    {
      icon: Zap,
      title: "Technology Stack",
      description: "Curated technology recommendations using the latest, most suitable tools and frameworks for your specific project type.",
      color: "orange",
      delay: "delay-300"
    },
    {
      icon: MapPin,
      title: "Location-Based Pricing",
      description: "Market-aligned pricing and salary estimates based on your specified location or global standards for remote projects.",
      color: "red",
      delay: "delay-400"
    },
    {
      icon: FileText,
      title: "Comprehensive Proposals",
      description: "Professional proposals with modules, deliverables, software requirements, licenses, and payment schedules all in structured format.",
      color: "teal",
      delay: "delay-500"
    }
  ];

  const benefits = [
    {
      icon: Star,
      title: "Save 80% Time",
      description: "Generate comprehensive proposals in minutes instead of hours or days"
    },
    {
      icon: CheckCircle,
      title: "Professional Quality",
      description: "Industry-standard proposals that impress clients and stakeholders"
    },
    {
      icon: BarChart3,
      title: "Data-Driven Insights",
      description: "Market research and competitive analysis built into every proposal"
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Identify potential project risks and mitigation strategies early"
    },
    {
      icon: Globe,
      title: "Global Standards",
      description: "Pricing and practices aligned with international market standards"
    },
    {
      icon: ArrowRight,
      title: "Instant Export",
      description: "Download proposals in multiple formats (PDF, Word, Excel)"
    }
  ];
const stats = [
  { number: "50+", label: "Proposals Generated" },
  { number: "92%", label: "Client Satisfaction" },
  { number: "10+", label: "Industries Served" },
  { number: "24/7", label: "AI-Powered Support" }
];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Project Manager at TechCorp",
      content: "PlanForage transformed how we create project proposals. What used to take days now takes minutes, and the quality is outstanding."
    },
    {
      name: "Marcus Johnson",
      role: "Freelance Developer",
      content: "As a freelancer, accurate pricing is crucial. PlanForage helps me create professional proposals that win more clients."
    },
    {
      name: "Elena Rodriguez",
      role: "Startup Founder",
      content: "The detailed budget breakdowns and timeline planning have been invaluable for securing investor funding."
    }
  ];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    green: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
    orange: "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300",
    red: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
    teal: "bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300"
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* Navbar */}
      <nav className="w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-purple-100/50 dark:border-purple-800/50 sticky top-0 z-50 py-2 shadow-sm transition-colors duration-500">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center transition-colors duration-300">
              <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 cursor-pointer">
              PlanForage
            </h1>
          </div>

          
          
          <button
            onClick={() => {
                navigate('/login')
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl hover:shadow-purple-500/50"
          >
            Login
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div 
          id="hero"
          ref={setSectionRef('hero')}
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible('hero') 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-700 dark:via-blue-700 dark:to-indigo-700 rounded-3xl p-12 mb-16 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/80 via-blue-400/80 to-indigo-400/80 dark:from-purple-500/60 dark:via-blue-500/60 dark:to-indigo-500/60"></div>
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-xl -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl translate-x-16 translate-y-16"></div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                    <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 hover:text-purple-100 transition-colors duration-300 cursor-default">
                Transform Ideas Into Reality
              </h1>
              
              <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8 transition-all duration-700 hover:text-white">
                Generate comprehensive, professional project proposals with detailed budgets, 
                timelines, and technical specifications in minutes using our AI-powered platform.
              </p>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    navigate('/home')
                  }}
                  className={`bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-10 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 border border-white/30 hover:border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 active:scale-95 `}
                >
                  Get Started Free
                  <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <section 
          id="stats"
          ref={setSectionRef('stats')}
          className={`mb-16 transition-all duration-1000 ease-out ${
            isVisible('stats') 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-purple-100 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-lg">
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What We Do Section */}
        <section 
          id="what-we-do"
          ref={setSectionRef('what-we-do')}
          className={`mb-16 transition-all duration-1000 ease-out ${
            isVisible('what-we-do') 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="w-7 h-7 text-purple-600 dark:text-purple-400 mr-3 animate-pulse" />
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 cursor-default">
              What We Do
            </h2>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-purple-100 dark:border-purple-800 max-w-4xl mx-auto hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl shadow-lg">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 transition-colors duration-300 hover:text-gray-800 dark:hover:text-gray-200">
              Our AI-powered system analyzes your project requirements and generates detailed, professional proposals 
              that include everything you need to turn your ideas into reality. Simply provide your project description, 
              budget, and location, and we'll handle the rest.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-100 dark:border-purple-800 transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:scale-105 hover:shadow-lg transform">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg transition-colors duration-300">Input Requirements</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="transition-all duration-200 hover:translate-x-2 hover:text-gray-800 dark:hover:text-gray-200">• Project description or requirements</li>
                  <li className="transition-all duration-200 hover:translate-x-2 hover:text-gray-800 dark:hover:text-gray-200">• Total budget allocation</li>
                  <li className="transition-all duration-200 hover:translate-x-2 hover:text-gray-800 dark:hover:text-gray-200">• Project location (optional)</li>
                  <li className="transition-all duration-200 hover:translate-x-2 hover:text-gray-800 dark:hover:text-gray-200">• Target timeline preferences</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-100 dark:border-purple-800 transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:scale-105 hover:shadow-lg transform">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg transition-colors duration-300">Generated Output</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="transition-all duration-200 hover:translate-x-2 hover:text-gray-800 dark:hover:text-gray-200">• Comprehensive project proposal</li>
                  <li className="transition-all duration-200 hover:translate-x-2 hover:text-gray-800 dark:hover:text-gray-200">• Detailed budget breakdown</li>
                  <li className="transition-all duration-200 hover:translate-x-2 hover:text-gray-800 dark:hover:text-gray-200">• Timeline and milestones</li>
                  <li className="transition-all duration-200 hover:translate-x-2 hover:text-gray-800 dark:hover:text-gray-200">• Technology stack recommendations</li>
                  <li className="transition-all duration-200 hover:translate-x-2 hover:text-gray-800 dark:hover:text-gray-200">• Risk assessment and mitigation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section 
          id="features"
          ref={setSectionRef('features')}
          className={`mb-16 transition-all duration-1000 ease-out ${
            isVisible('features') 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-16 opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 cursor-default">
            Everything You Need in One Proposal
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-xl p-6 border border-purple-100 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group hover:shadow-xl shadow-lg ${
                    isVisible('features') 
                      ? `animate-[fadeInUp_0.8s_ease-out_${index * 100}ms_both]` 
                      : 'opacity-0'
                  }`}
                >
                  <div className={`${colorClasses[feature.color]} p-3 rounded-xl w-fit mb-4 transition-all duration-200 group-hover:scale-105`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Benefits Section */}
        <section 
          id="benefits"
          ref={setSectionRef('benefits')}
          className={`mb-16 transition-all duration-1000 ease-out ${
            isVisible('benefits') 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-16 opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 cursor-default">
            Why Choose PlanForage?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-purple-100 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group hover:shadow-xl shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Testimonials Section */}
        {/* <section 
          id="testimonials"
          ref={setSectionRef('testimonials')}
          className={`mb-16 transition-all duration-1000 ease-out ${
            isVisible('testimonials') 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-16 opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 cursor-default">
            What Our Users Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-purple-100 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* Call to Action */}
        <section 
          id="cta"
          ref={setSectionRef('cta')}
          className={`text-center transition-all duration-1000 ease-out ${
            isVisible('cta') 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 border border-purple-100 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-lg">
            <h2 className="text-4xl font-bold mb-4 hover:scale-105 transition-transform duration-300 cursor-default text-gray-900 dark:text-white">
              Ready to Generate Your Project Proposal?
            </h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300">
              Join thousands of professionals who trust our AI-powered proposal generator to win more projects and save valuable time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => {
                    navigate('/home')
                }}
                className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 transform hover:scale-110 hover:shadow-2xl active:scale-95 group"
              >
                Start Creating Now
                <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
              </button>
              {/* <div className="text-sm text-gray-500 dark:text-gray-400">
                No credit card required • Free trial available
              </div> */}
            </div>
          </div>
        </section>
      </div>

      <style >{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default IntroPage;