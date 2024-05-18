const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");

const app = express();

// Load environment variables
const config = require("./config"); 
const {PORT, NODE_ENV, MONGO_URI} = config;

// connect to the database
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log(err));


// Middleware
app.use(express.json());
app.use(cors({}));
app.use(helmet());


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode with mongo uri ${MONGO_URI}`);
});
