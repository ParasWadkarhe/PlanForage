const ProjectProposalModel = require("../models/ProjectProposal.js");

async function getSearchHistory(req, res) {
    const id = req.params.id;
    if(!id) {
        return res.status(400).json({ error: "Proposal ID is required" });
    }

    const proposal = await ProjectProposalModel.findById(id)
    res.status(200).json({ proposal });
}

module.exports = getSearchHistory