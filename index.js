const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require ("dotenv").config();

// Setup Express //

const app = express();

// Middleware //

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("App Listening on PORT:" + PORT));

// Setting Up Mongoose //

// mongodb+srv://casino:<password>@main.sbe1a.mongodb.net/<dbname>?retryWrites=true&w=majority



