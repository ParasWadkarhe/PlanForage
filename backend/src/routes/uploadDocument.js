require("dotenv").config();
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require('../config/cloudinaryConfig.js')

const Document = require('../models/Document.js'); 


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadBufferToCloudinary = (fileBuffer, mimetype) => {
  return new Promise((resolve, reject) => {
    const resourceType = mimetype === 'application/pdf' ? 'raw' : 'auto';

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};


async function uploadDocument(req, res) {

    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const response = await uploadBufferToCloudinary(file.buffer, file.mimetype)
        const document = new Document({
            uid: req.user.uid, 
            url: response.secure_url, 
            name: file.originalname,
            size: file.size,
            type: file.mimetype,
            publicId: response.public_id,
            resourceType: response.resource_type,
        });
        await document.save();
    
        res.json({ message: "File received", name: file.originalname, response });
    } 
    catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json({ error: "Failed to upload file" });
    }
}

module.exports = {
    uploadDocumentMiddleware: upload.single("file"),
    uploadDocument,
};
