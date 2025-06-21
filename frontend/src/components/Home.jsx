import {
  CheckCircle,
  Lightbulb,
  Layers,
  Clock,
  BadgeCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const works = [
    {
      text: "A detailed project breakdown by features or modules",
      icon: Layers,
    },
    {
      text: "Realistic timelines and phase-wise implementation plans",
      icon: Clock,
    },
    {
      text: "Clear deliverables with outcomes defined at every stage",
      icon: BadgeCheck,
    },
    {
      text: "Transparent, flexible pricing suggestions based on complexity",
      icon: CheckCircle,
    },
  ];

  const why = [
    {
      title: "Clarity Without Complexity",
      description:
        "Say goodbye to long meetings and ambiguous documents. Get a clear, technical roadmap — even without being technical.",
      icon: Lightbulb,
    },
    {
      title: "Tailored to Your Domain",
      description:
        "Whether it's AI/ML, FinTech, EdTech, or Web Development — your proposals are generated with domain-specific insights and structures.",
      icon: Layers,
    },
    {
      title: "Save Time & Resources",
      description:
        "What used to take hours of planning now takes just a few seconds — freeing up your team to focus on strategy and execution.",
      icon: Clock,
    },
    {
      title: "Perfect for Teams, Freelancers & Agencies",
      description:
        "Whether you're an entrepreneur seeking investor-ready specs, or a development agency preparing a pitch — our proposals make you look sharp and professional.",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 px-4 py-10 sm:px-6 lg:px-12 text-white">
      {/* Header */}
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Welcome!</h1>
        <p className="text-lg sm:text-xl text-gray-300">
          Struggling to scope a project or pitch your idea? We&apos;ve got you
          covered.
        </p>
        <p className="mt-2 text-gray-400">
          Our intelligent project proposal generator turns vague ideas into
          structured, actionable blueprints — within seconds.
        </p>
      </div>

      {/* What You Get */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">What You Get</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {works.map(({ text, icon: Icon }, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-sm hover:shadow-lg transition"
            >
              <Icon className="w-6 h-6 text-green-400 mt-1" />
              <p className="text-base text-gray-200">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {why.map(({ title, description, icon: Icon }, i) => (
            <div
              key={i}
              className="flex items-start gap-5 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-sm hover:shadow-lg transition"
            >
              <div className="w-28 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 rounded-full shadow-md">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {title}
                </h3>
                <p className="text-gray-300 text-sm">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Link to="/chat">
          <div className="flex justify-center mt-14 cursor-pointer bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl py-3 sm:py-4 px-4 text-white font-bold text-base sm:text-xl shadow-lg">
            Continue
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
