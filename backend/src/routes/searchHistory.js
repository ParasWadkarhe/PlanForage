const ProjectProposalModel = require("../models/ProjectProposal.js");

async function getSearchHistory(req, res) {
  try {
    const uid = req.user.uid;
    if (!uid) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const proposals = await ProjectProposalModel.find({ uid }).select([
      "search_string",
      "budget",
      "location",
      "date"
    ]);

    return res.status(200).json({ proposals });
  } catch (error) {
    console.error("Error fetching search history:", error.message);
    return res.status(500).json({ error: "Error fetching proposals" });
  }
}

module.exports = getSearchHistory;