const ProjectProposalModel = require("../models/ProjectProposal.js");

const deleteProposal =  async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Proposal ID is required" });
  }

  try {
    const result = await ProjectProposalModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: "Proposal not found" });
    }
    res.status(200).json({ message: "Proposal deleted successfully" });
  } catch (error) {
    console.error('Error deleting proposal:', error);
    res.status(500).json({ error: "Error deleting proposal" });
  }
}

module.exports = deleteProposal