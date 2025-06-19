require("dotenv").config();
const ProjectProposalModel = require("../models/ProjectProposal.js");


async function getSearchHistory(req, res) {
    const uid = req.params.uid;
    if(!uid) {
        return res.status(400).json({ error: "User ID is required" });
    }

    const response = await ProjectProposalModel.findByUid(uid);
    res.status(200).json({ response });
}

module.exports = getSearchHistory