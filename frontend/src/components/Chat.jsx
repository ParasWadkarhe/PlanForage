import { FiMapPin, FiDollarSign, FiEdit2 } from "react-icons/fi";
const Chat = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
        <div className="flex flex-col">
      <div className="text-center flex flex-col items-center space-y-6 px-4">
        <div className="font-bold text-5xl pb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          PlanForage
        </div>
        <hr className="my-6 border-t border-gray-300 w-50" />

        <div className="font-semibold text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Discover and Plan Your Next Project
        </div>
        <div className="text-lg text-white max-w-2xl">
          Get comprehensive project plans, technology recommendations, timeline
          estimates, and resource requirements tailored to your needs. Start
          your journey with intelligent project planning.
        </div>
      </div>
      <div className="p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location Input */}
        <div className="relative">
          <label className="text-sm font-medium text-white flex items-center gap-2 mb-1">
            <FiMapPin className="text-white" /> Location
          </label>
          <input
            type="text"
            list="locationOptions"
            placeholder="Search location..."
            className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <datalist id="locationOptions">
            <option value="New York" />
            <option value="London" />
            <option value="Mumbai" />
            <option value="Berlin" />
          </datalist>
        </div>

        {/* Currency Input */}
        <div className="relative">
          <label className="text-sm font-medium text-white flex items-center gap-2 mb-1">
            <FiDollarSign className="text-white" /> Currency
          </label>
          <input
            type="text"
            list="currencyOptions"
            placeholder="Search currency..."
            className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <datalist id="currencyOptions">
            <option value="USD" />
            <option value="INR" />
            <option value="EUR" />
            <option value="JPY" />
          </datalist>
        </div>
      </div>

      {/* Description Input */}
      <div className="mt-6">
        <label className="text-sm font-medium text-white flex items-center gap-2 mb-1">
          <FiEdit2 className="text-white" /> Description
        </label>
        <textarea
          rows="4"
          placeholder="Enter project description..."
          className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
        ></textarea>
      </div>
    </div>
        </div>
    </div>
  );
};

export default Chat;
