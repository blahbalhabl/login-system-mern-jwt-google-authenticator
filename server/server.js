require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');
const dbConnect = require('./db/db-connect');

// Import Routes
const users = require('./routes/Users');
const auth = require('./routes/Auth');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 4000;

const origins = process.env.ORIGIN.split(',');
app.use(cors({origin: origins, credentials: true})); // Allow cross-origin requests
app.use(cookie()); // Parse cookies
app.use(express.json()); // Parse JSON body

// Connect to MongoDB
dbConnect;

// API Routes
app.use('/api', auth, users);

// Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));