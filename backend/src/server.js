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
    allowedHeaders: ['Content-Type'],
}));


// routes
app.get('/', (req, res) => {
    res.send('Backend running...');
});
app.post('/query', query)
app.get('/search-history/:uid', getSearchHistory)
app.get('/fetch-proposal/:id', proposalFromId)
app.post('/download-pdf', downloadPdf)
app.delete('/delete-proposal/:id', deleteProposal)


// app
app.listen(PORT, () => {
    console.log(`Server running on port...`);
});