const Document = require('../models/Document.js');
const cloudinary = require('../config/cloudinaryConfig.js');

const deleteDocument = async (req, res) => {
    const documentId = req.params.id;

    try {
        const document = await Document.findById(documentId);
        if (!document) {            
            return res.status(404).json({ error: "Document not found" });
        }
        // delete from cloudinary
        const result = await cloudinary.uploader.destroy(document.publicId, {
            resource_type: document.resourceType || 'auto',
        })
        
        if(!result || result.result !== 'ok') {
            return res.status(500).json({ error: "Failed to delete document from cloudinary" });
        }

        // delete from database
        await Document.deleteOne({ _id: documentId });
        return res.json({ message: "Document deleted successfully" });

    } catch (error) { 
        console.error("Error deleting document:", error);
        return res.status(500).json({ error: "Failed to delete document" });
    }
}

module.exports = deleteDocument;