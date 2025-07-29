const ProjectProposalModel = require("../models/ProjectProposal.js");
const UserDashboard = require('../models/UserDashboard.js')

// utility imports
const removeAllIds = require('../utils/removeAllIds.js')
const generatePrompt = require('../templates/queryPrompt.js')

const getAiOutput = require('../utils/getAiOutput.js')

async function query(req, res) {

    // update search count even if it fails
    await UserDashboard.updateOne(
        { uid: req.user.uid }, 
        { $inc: { searchCount: 1, } },
        { upsert: true }  
    )

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
        const aiOutput = await getAiOutput(prompt)
        const cleanedText = aiOutput.text.replace(/^```json\n/, '').replace(/\n```$/, '');

        try {
            const parsedJSON = JSON.parse(cleanedText);

            // Save the proposal to the database only if there is no error in the response
            if(parsedJSON && !parsedJSON.error) {
                const proposal = new ProjectProposalModel({
                    uid: req.user.uid, 
                    ...req.body,
                    ...parsedJSON,
                });
                await proposal.save();

                await UserDashboard.updateOne(
                    { uid: req.user.uid }, 
                    { $inc: { plansCreated: 1, }},
                    { upsert: true }  
                , { upsert: true }
                )
            }

            res.status(200).json(parsedJSON);
        } catch (err) {
            console.error("Error generating response. " + err);
            res.status(500).json({ error: "Error generating response. Try again" });
        }

    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error });
    }
}

module.exports = query