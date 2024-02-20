require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConnect = require('./db/db-connect');

// Import Routes
const users = require('./routes/Users');


// Initialize Express
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Connect to MongoDB
dbConnect;

// Use Routes
app.use('/api', users);

// Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));