import { FiMapPin, FiDollarSign, FiEdit2 } from "react-icons/fi";
import { useState, useRef } from "react";
// import html2pdf from "html2pdf.js";
// import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Chat = () => {
  const [query, setQuery] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [location, setLocation] = useState("India");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const printRef = useRef();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/proposal/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, currency, location, uid: 123 }), // Note: UID should be a number
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("Failed to fetch proposal:", err);
      alert("Error generating proposal.");
    }
    setLoading(false);
  };

// const handleDownloadPDF = () => {
//   setTimeout(() => {
//     const element = printRef.current;
//     if (!element) {
//       alert("Nothing to download");
//       return;
//     }

//     const opt = {
//       margin: 0.5,
//       filename: "project-proposal.pdf",
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: {
//         scale: 2,
//         useCORS: true,
//         backgroundColor: "#1f2937", // fallback background
//       },
//       jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
//     };

//     html2pdf().set(opt).from(element).save();
//   }, 100);
// };
// const handleDownloadFile = () => {
//   if (!response) {
//     alert("Nothing to download");
//     return;
//   }

//   // Convert response object to a formatted string
//   const fileContent = JSON.stringify(response, null, 2);

//   // Create a Blob from the string
//   const blob = new Blob([fileContent], { type: "application/json" });

//   // Create a link and trigger download
//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = "project-proposal.json";
//   document.body.appendChild(link);
//   link.click();

//   // Clean up
//   document.body.removeChild(link);
// };

const handleDownloadFullResponseAsPDF = () => {
  if (!response) {
    alert("No proposal data available.");
    return;
  }

  const doc = new jsPDF();
  const margin = 10;
  const pageHeight = doc.internal.pageSize.height;
  const maxLineWidth = 180; // 210 - 2 * margin (A4 width is 210mm)

  let y = margin;

  const addText = (text, x = margin) => {
    const lines = doc.splitTextToSize(text, maxLineWidth);
    for (const line of lines) {
      if (y + 10 > pageHeight) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, x, y);
      y += 7;
    }
  };

  // Title
  doc.setFontSize(16);
  addText(`Project Title: ${response.project_title}`);
  doc.setFontSize(12);

  // Objective
  addText(`\nObjective:`);
  addText(response.objective);

  // Modules
  addText(`\nModules:`);
  response.modules.forEach((mod) => addText(`• ${mod}`, margin + 4));

  // Tech Stack
  addText(`\nTechnology Stack:`);
  Object.entries(response.technology_stack).forEach(([key, tech]) =>
    addText(`${key}: ${tech.join(", ")}`, margin + 4)
  );

  // Timeline
  addText(`\nTimeline:`);
  Object.entries(response.timeline).forEach(([week, tasks]) => {
    addText(`${week.toUpperCase()}:`, margin + 2);
    tasks.forEach((task) => addText(`• ${task}`, margin + 6));
  });

  // HR
  addText(`\nHuman Resources:`);
  addText(`Total Employees Required: ${response.HR.total_employees_required}`, margin + 2);
  response.HR.roles.forEach((role) => {
    addText(`\nTitle: ${role.title}`, margin + 4);
    addText(`Experience: ${role.experience_required_in_years} years`, margin + 6);
    addText(`Count: ${role.count}`, margin + 6);
    addText(`Expected Salary: ${role.expected_salary}`, margin + 6);
    addText(`Skills: ${role.skills_required.join(", ")}`, margin + 6);
  });

  // Deliverables
  addText(`\nDeliverables:`);
  response.deliverables.forEach((d) => addText(`• ${d}`, margin + 4));

  // Steps
  addText(`\nDevelopment Steps:`);
  response.steps.forEach((step) => {
    addText(`\nType: ${step.type}`, margin + 4);
    addText(`Description: ${step.description}`, margin + 6);
    addText(`Estimated Time: ${step.estimated_time_in_days} day(s)`, margin + 6);
  });

  // Pricing
  addText(`\nEstimated Pricing:`);
  addText(response.estimated_pricing, margin + 4);

  // Conclusion
  addText(`\nConclusion:`);
  addText(response.conclusion);

  doc.save("project-proposal.pdf");
};


  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #374151, #1f2937, #111827)",
      }}
      className="p-8 text-white shadow-lg mx-auto"
    >
      <div className="flex items-center justify-center p-6">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center space-y-4">
            <h1
              className="font-bold text-5xl text-transparent"
              style={{
                backgroundImage: "linear-gradient(to bottom right, #2563eb, #7e22ce)",
                WebkitBackgroundClip: "text",
              }}
            >
              PlanForage
            </h1>
            <p
              className="font-semibold text-2xl text-transparent"
              style={{
                backgroundImage: "linear-gradient(to bottom right, #2563eb, #7e22ce)",
                WebkitBackgroundClip: "text",
              }}
            >
              Discover and Plan Your Next Project
            </p>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Get comprehensive project plans, technology recommendations, timeline estimates,
              and resource requirements tailored to your needs.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="text-center">
              <button
                onClick={handleGenerate}
                disabled={loading || !query}
                className="px-6 py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
              >
                {loading ? "Generating..." : "Generate Proposal"}
              </button>
            </div>
          </div>

          {/* Proposal Display */}
          {response && (
            <>
              <div
                ref={printRef}
                className="mt-10 p-8 bg-gray-800 text-white rounded-2xl shadow-lg max-w-5xl mx-auto space-y-6"
              >
                <h2 className="text-3xl font-bold text-blue-400">{response.project_title}</h2>
                <p className="text-lg">{response.objective}</p>

                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-blue-400">Modules</h3>
                  <ul className="list-disc list-inside">
                    {response.modules.map((mod, i) => (
                      <li key={i}>{mod}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-purple-400">Technology Stack</h3>
                  {Object.entries(response.technology_stack).map(([key, stack]) => (
                    <p key={key}>
                      <span className="font-semibold capitalize">{key}:</span> {stack.join(", ")}
                    </p>
                  ))}
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-green-400">Timeline</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(response.timeline).map(([week, tasks]) => (
                      <div key={week} className="bg-gray-700 p-4 rounded-lg">
                        <h4 className="font-bold">{week.toUpperCase()}</h4>
                        <ul className="list-disc list-inside text-sm mt-2">
                          {tasks.map((task, i) => (
                            <li key={i}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-yellow-400">Human Resources</h3>
                  <p>
                    <strong>Total Employees Required:</strong>{" "}
                    {response.HR.total_employees_required}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {response.HR.roles.map((role, i) => (
                      <div key={i} className="bg-gray-700 p-4 rounded-lg space-y-1">
                        <p>
                          <strong>Title:</strong> {role.title}
                        </p>
                        <p>
                          <strong>Experience:</strong> {role.experience_required_in_years} year(s)
                        </p>
                        <p>
                          <strong>Count:</strong> {role.count}
                        </p>
                        <p>
                          <strong>Expected Salary:</strong> {role.expected_salary}
                        </p>
                        <p>
                          <strong>Skills:</strong> {role.skills_required.join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-pink-400">Deliverables</h3>
                  <ul className="list-disc list-inside">
                    {response.deliverables.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-indigo-400">Development Steps</h3>
                  <div className="space-y-2">
                    {response.steps.map((step, i) => (
                      <div key={i} className="bg-gray-700 p-4 rounded-lg">
                        <p>
                          <strong>Type:</strong> {step.type}
                        </p>
                        <p>
                          <strong>Description:</strong> {step.description}
                        </p>
                        <p>
                          <strong>Estimated Time:</strong>{" "}
                          {step.estimated_time_in_days} day(s)
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-red-400">Estimated Pricing</h3>
                  <p className="text-lg font-bold">{response.estimated_pricing}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-teal-400">Conclusion</h3>
                  <p>{response.conclusion}</p>
                </div>
              </div>

              <div className="text-right my-4 px-6">
                <button
                  // onClick={handleDownloadPDF}
                  onClick={handleDownloadFullResponseAsPDF}
                  // onClick={handleDownloadFile}
                  className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Download PDF
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
