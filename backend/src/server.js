// modules
require("dotenv").config();
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

// api functions
const query = require('./routes/query.js');
const getSearchHistory = require('./routes/searchHistory.js');
const proposalFromId = require('./routes/proposalFromId.js')
const downloadPdf = require('./routes/downloadPdf.js');
const deleteProposal = require('./routes/deleteProposal.js');
const userDashboard = require('./routes/userDashboard.js');
const { uploadDocument, uploadDocumentMiddleware } = require('./routes/uploadDocument.js');
const getDocuments = require('./routes/getDocuments.js');
const deleteDocument = require('./routes/deleteDocument.js');
const documentSearch = require('./routes/documentSearch.js');

// middleware
const verifyToken = require('./middleware/verifyToken.js');

// config
const app = express();
const PORT = 3000;
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",");
const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/PlanForage';

// db
mongoose.connect(databaseUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// middlewares
app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


// routes
app.get('/', (req, res) => {
    // this route is for client to check whether the backend is running
    setTimeout(() => {
        
        res.json({ isRunning: true, message: 'Backend running...' });
    }, 0);
});
app.post('/query', verifyToken, query)
app.get('/search-history', verifyToken, getSearchHistory)
app.get('/proposal/:id', verifyToken, proposalFromId)
app.delete('/proposal/:id', verifyToken, deleteProposal)
app.post('/download-pdf', verifyToken, downloadPdf)
app.get('/user-dashboard', verifyToken, userDashboard)
app.post('/document', verifyToken, uploadDocumentMiddleware, uploadDocument)
app.get('/documents', verifyToken, getDocuments)
app.delete('/document/:id', verifyToken, deleteDocument)
app.post('/document-search', verifyToken, documentSearch)

// app
app.listen(PORT, () => {
    console.log(`Server running on port...`);
});