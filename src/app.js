const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");

const noteRoutes = require("./routes/note.routes");
const app = express();

// Load environment variables
const config = require("./config"); 
const {MONGO_URI} = config;

// connect to the database
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log(err));


// Middleware
app.use(express.json());
app.use(cors({}));
app.use(helmet());

// Routes
app.use("/note", noteRoutes);

module.exports = app;