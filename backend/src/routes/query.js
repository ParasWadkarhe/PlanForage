require("dotenv").config();
const { GoogleGenAI } = require("@google/genai")
const ProjectProposalModel = require("../models/ProjectProposal.js");

// const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const ai = new GoogleGenAI({ apiKey: "AIzaSyD1vcwLjnr8wkPT3LXDTahJytav9sG5zIo" }); // temporary so everyone can test

async function query(req, res) {
    const prompt = `
        You are a project proposal generation assistant.

        Given a short client input describing their needs (e.g., "Build an LLM bot for HR"), analyze the request and return a complete and structured project proposal in **JSON format**. For all pricing related figures, use currency: ${req.body.currency}.

        ### Input:
        "${req.body.query}"

        ### Output JSON Format:
        {
        "project_title": "",
        "objective": "",
        "modules": [],
        "technology_stack": {
            "frontend": [],
            "backend": [],
            "nlp_or_ai": [],
            "database": []
        },
        "timeline": {
            "week_1": [],
            "week_2": [],
            ... (devide the task accordingly into weeks, e.g., week_1, week_2, etc.)
        },
        "HR": {
            "total_employees_required": 0,
            "roles": [
                {
                    "title": "",
                    "skills_required": [],
                    "experience_required_in_years": 0,
                    "count": 0,
                    "expected_salary": (calculate salary according to location ${req.body.location} and the role)
                }
            ]
        },
        "deliverables": [],
        "steps": [
            **step-by-step implementation plan**. The roadmap should follow the actual development sequence: for example, first set up the project, then configure the login system, then set up the backend server, return to the frontend for UI development, configure the database, implement APIs, integrate frontend with backend, test the features, and finally deploy the project.
            format for each entry: {
                type: (ex. fontend, backend, database, etc.),
                description: "Detailed description of the step",
                estimated_time_in_days: 0
            }
        ],
        "estimated_pricing": estimated pricing based on location ${req.body.location} and the complexity of the project,
        "conclusion": ""
        }

        Respond with ONLY the JSON. Do not include any explanation or notes.
        `

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });
        const cleanedText = response.text.replace(/^```json\n/, '').replace(/\n```$/, '');

        try {
            const parsedJSON = JSON.parse(cleanedText);
            const uid = req.body.uid // this will be fetched from authentication token when set up

            // Save the proposal to the database
            const proposal = new ProjectProposalModel({
                search_string: req.body.query,
                ...parsedJSON,
                uid: uid, 
            });
            await proposal.save();


            res.status(200).json(parsedJSON);
        } catch (err) {
            console.error("Error generating response. Try again" + err);
            res.status(500).json({ error: "Error generating response. Try again" });
        }

    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error });
    }
}

module.exports = query