const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    resourceType: { // (raw or auto) this is used when deleting the document from cloudinary 
        type: String,
        required: true, 
    }
}, { timestamps: true });

module.exports = mongoose.model('Document', DocumentSchema);