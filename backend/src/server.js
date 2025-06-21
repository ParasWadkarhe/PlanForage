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

// config
const app = express();
const PORT = 3000;
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];
const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/PlanForage';

// db
mongoose.connect(databaseUrl)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// middlewares - ORDER MATTERS!
app.use(express.json()); // Fixed: was missing parentheses at the end

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`CORS rejected origin: ${origin}`); // Debug log
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// routes
app.get('/', (req, res) => {
  res.send('Backend running...');
});

// Fixed: Added /api prefix to match your frontend calls
app.post('/api/proposal/generate', query) // This should match your frontend call
app.get('/api/search-history/:uid', getSearchHistory)
app.get('/api/fetch-proposal/:id', proposalFromId)
app.post('/api/download-pdf', downloadPdf)

// app
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Removed duplicate express.json line