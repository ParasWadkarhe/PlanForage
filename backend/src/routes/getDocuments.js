const Document = require('../models/Document.js');

const getDocuments = async (req, res) => {

    const documents = await Document.find({ uid: req.user.uid })
        try{
            if (!documents || documents.length === 0) {
                return res.status(404).json({ message: "No documents found" });
            }
            res.status(200).json(documents);
        }
        catch(err) {
            console.error('Error fetching documents:', err);
            res.status(500).json({ error: "Internal server error" });
        }

}

module.exports = getDocuments;