import { FiMapPin, FiDollarSign, FiEdit2 } from "react-icons/fi";
import { useState } from "react";

const Chat = () => {
  const [query, setQuery] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [location, setLocation] = useState("India");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/proposal/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          currency,
          location,
          uid: "user-123",
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("Failed to fetch proposal:", err);
      alert("Error generating proposal.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="font-bold text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PlanForage
          </h1>
          <p className="font-semibold text-2xl text-white">
            Discover and Plan Your Next Project
          </p>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Get comprehensive project plans, technology recommendations, timeline estimates, and resource requirements tailored to your needs.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div>
              <label className="text-white text-sm font-semibold flex items-center gap-2 mb-1">
                <FiMapPin /> Location
              </label>
              <input
                type="text"
                list="locationOptions"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-white bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search location..."
              />
              <datalist id="locationOptions">
                <option value="India" />
                <option value="USA" />
                <option value="UK" />
                <option value="Germany" />
              </datalist>
            </div>

            {/* Currency */}
            <div>
              <label className="text-white text-sm font-semibold flex items-center gap-2 mb-1">
                <FiDollarSign /> Currency
              </label>
              <input
                type="text"
                list="currencyOptions"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-white bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Search currency..."
              />
              <datalist id="currencyOptions">
                <option value="INR" />
                <option value="USD" />
                <option value="EUR" />
                <option value="GBP" />
              </datalist>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-white text-sm font-semibold flex items-center gap-2 mb-1">
              <FiEdit2 /> Project Description
            </label>
            <textarea
              rows="4"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Build an AI chatbot for customer service..."
              className="w-full px-4 py-3 rounded-lg text-white bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleGenerate}
              disabled={loading || !query}
              className="px-6 py-3 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
            >
              {loading ? "Generating..." : "Generate Proposal"}
            </button>
          </div>
        </div>

        {/* Response */}
        {response && (
          <div className="bg-gray-800 p-6 rounded-2xl text-white text-sm overflow-auto max-h-[500px] mt-4">
            <h2 className="text-lg font-semibold mb-3">📄 Proposal Output</h2>
            <pre className="whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
