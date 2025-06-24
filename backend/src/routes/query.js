require("dotenv").config();
const { GoogleGenAI } = require("@google/genai")
const ProjectProposalModel = require("../models/ProjectProposal.js");

// utility imports
const removeAllIds = require("./utils/removeAllIds.js");
const generatePrompt = require('../templates/prompt.js')

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function query(req, res) {

    // if _id is present then fetch the proposal from the database else return a new ai-generated response
    if (req.body._id) {
        const proposal = await ProjectProposalModel.findById(req.body._id);

        if (proposal && 
            proposal.search_string === req.body.search_string &&
            proposal.location === req.body.location &&
            proposal.budget === req.body.budget
        ) {
            const cleanedProposal = removeAllIds(proposal.toObject());
            return res.status(200).json(cleanedProposal);
        }
    }

    const prompt = generatePrompt(req.body.search_string, req.body.location, req.body.budget)

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
                    uid: uid, 
                    ...req.body,
                    ...parsedJSON,
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