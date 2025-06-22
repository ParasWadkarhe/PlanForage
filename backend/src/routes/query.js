require("dotenv").config();
const { GoogleGenAI } = require("@google/genai")
const ProjectProposalModel = require("../models/ProjectProposal.js");

// utility imports
const removeAllIds = require("./utils/removeAllIds.js");

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

// add links to hire developers, designers, etc. in the respective roles
async function query(req, res) {

    // if _id is present then fetch the proposal from the database else return a test response
    if (req.body._id) {
        const proposal = await ProjectProposalModel.findById(req.body._id);
        
        if(proposal && proposal.search_string === req.body.query) {
            const cleanedProposal = removeAllIds(proposal.toObject());
            return res.status(200).json(cleanedProposal);
        }
    }

    // console.log(req.body._id)
    // res.json({ message: "This is a test response. The AI model is currently being set up.", error:true });
    // return

    const prompt = `
        You are a project proposal generation assistant.
        Given a short client input describing their needs, analyze the request and return a complete and structured project proposal in JSON format. 
        All the data and pricing is based on current market of ${req.body.location} and the complexity of the project. All the pricing data should be in the currency ${req.body.currency} and well formated (ex. $2,000 or ₹1,50,000).
        Time estimates should be realistic and according to the complexity and budget of the project.
        Make sure that pricing adds up to the total estimated pricing. 
        The total estimated pricing should be realistic and according to the complexity and budget of the project.
        Just answer what is asked in the input, do not assume anything. do not add any extra information, explanation or suggession.
        If location is not provided, use "Anywhere" as the default location.
        Make use of best practices and latest technologies in the project proposal.

        ### Input:
        "${req.body.query}"

        ### Output JSON Format:
        {
        "project_title": "",
        "objective": "",
        "modules": [],
        "technology_stack": {
            ex. 
            "frontend": [],
            "backend": [],
            ... (above are just examples no need to include them if not required. Include all relevant technologies based on the project requirements)
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
                    "expected_salary": (calculate salary according to location ${req.body.location}, role and budget)
                }
            ]
        },
        "deliverables": [],
        "steps": [
            step-by-step implementation plan. The roadmap should follow the actual development sequence: for example, first set up the project, then configure the login system, then set up the backend server, return to the frontend for UI development, configure the database, implement APIs, integrate frontend with backend, test the features, and finally deploy the project.
            format for each entry: {
                type: (ex. fontend, backend, database, etc.),
                description: "Detailed description of the step",
                estimated_time_in_days: 0
            }
        ],
        "estimated_pricing": estimated pricing based on location ${req.body.location} and the complexity of the project. Only include the total estimated pricing in the format of $2,000 or ₹1,50,000.
        "conclusion": ""
        }

        Respond with ONLY the JSON, Do not change the output format. Do not include any explanation or notes. If the input is not clear, return with {error: true, message: message as to why input is not clear}.
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

            // Save the proposal to the database only if there is no error in the response
            if(parsedJSON && !parsedJSON.error) {
                const proposal = new ProjectProposalModel({
                    search_string: req.body.query,
                    ...parsedJSON,
                    uid: uid, 
                });
                await proposal.save();
            }

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