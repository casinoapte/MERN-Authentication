const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require("./routes")
const PORT = process.env.PORT || 5000;
require("dotenv").config();

// Setup Express //

const app = express();

// Middleware //

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Set Up Routes //

app.use(routes)

// Setting Up Mongoose //

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost/MERN-Auth",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    (err) => {
        if (err) throw (err);
        console.log("MongoDB Connection Established")
    }
);

// Listener //

app.listen(PORT, () => console.log(`App Listening on PORT: ${PORT}`));







